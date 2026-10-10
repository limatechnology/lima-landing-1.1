import { beforeEach, describe, expect, it, vi } from 'vitest';

const { limitMock, sendMock } = vi.hoisted(() => ({ limitMock: vi.fn(), sendMock: vi.fn() }));

vi.mock('@upstash/redis', () => ({ Redis: vi.fn() }));
vi.mock('@upstash/ratelimit', () => {
  class MockRatelimit {
    static slidingWindow() { return { type: 'sliding-window' }; }
    limit(...args) { return limitMock(...args); }
  }
  return { Ratelimit: MockRatelimit };
});
vi.mock('resend', () => {
  class MockResend {
    constructor() { this.emails = { send: sendMock }; }
  }
  return { Resend: MockResend };
});

const { POST } = await import('../app/api/contact/route.js');

function request(body = {}) {
  return new Request('https://www.limatechnology.com.ar/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://www.limatechnology.com.ar', 'x-real-ip': '203.0.113.10' },
    body: JSON.stringify({ nombre: 'Test User', email: 'test@example.com', telefono: '', servicio: '', mensaje: 'Consulta de prueba', turnstileToken: 'token-valid', ...body }),
  });
}

beforeEach(() => {
  process.env.TURNSTILE_ENABLED = 'true';
    process.env.RATE_LIMIT_ENABLED = 'true';
    process.env.VERCEL = '1';
  process.env.TURNSTILE_SECRET_KEY = 'secret-test';
  process.env.TURNSTILE_HOSTNAMES = 'www.limatechnology.com.ar';
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.test';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'token-test';
  limitMock.mockReset().mockResolvedValue({ success: true, reset: Date.now() + 600000 });
  sendMock.mockReset().mockResolvedValue({ data: { id: 'email-id' }, error: null });
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, action: 'contact', hostname: 'www.limatechnology.com.ar' }), { status: 200, headers: { 'content-type': 'application/json' } })));
});

describe('POST /api/contact protection', () => {
  it('accepts a valid Turnstile token and sends through Resend', async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledOnce();
  });

  it.each([
    ['missing token', { turnstileToken: undefined }],
    ['invalid token', { turnstileToken: 'token-invalid' }],
    ['expired or reused token', { turnstileToken: 'token-reused' }],
  ])('blocks %s before Resend', async (_, body) => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: false }), { status: 200 })));
    const response = await POST(request(body));
    expect([403, 503]).toContain(response.status);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('blocks an unexpected hostname or action', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, action: 'other', hostname: 'evil.example' }), { status: 200 })));
    const response = await POST(request());
    expect(response.status).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('returns 429 and does not call Turnstile or Resend when rate limited', async () => {
    limitMock.mockResolvedValue({ success: false, reset: Date.now() + 30000 });
    const response = await POST(request());
    expect(response.status).toBe(429);
    expect(response.headers.get('retry-after')).toBeTruthy();
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('fails closed when Upstash is unavailable', async () => {
    limitMock.mockRejectedValue(new Error('upstash unavailable'));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('fails closed when required protection configuration is missing', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('preserves existing validation before external services', async () => {
    const response = await POST(request({ email: 'not-an-email' }));
    expect(response.status).toBe(400);
    expect(limitMock).not.toHaveBeenCalled();
    expect(globalThis.fetch).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });
});

  it('supports both protections disabled without external calls', async () => {
    process.env.TURNSTILE_ENABLED = 'false'; process.env.RATE_LIMIT_ENABLED = 'false';
    const response = await POST(request({ turnstileToken: undefined }));
    expect(response.status).toBe(200); expect(limitMock).not.toHaveBeenCalled(); expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('supports Turnstile without rate limiting', async () => {
    process.env.RATE_LIMIT_ENABLED = 'false';
    const response = await POST(request());
    expect(response.status).toBe(200); expect(limitMock).not.toHaveBeenCalled(); expect(sendMock).toHaveBeenCalledOnce();
  });

  it('supports rate limiting without Turnstile', async () => {
    process.env.TURNSTILE_ENABLED = 'false';
    const response = await POST(request({ turnstileToken: undefined }));
    expect(response.status).toBe(200); expect(limitMock).toHaveBeenCalledOnce(); expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('rejects a token when backend Turnstile is disabled', async () => {
    process.env.TURNSTILE_ENABLED = 'false';
    const response = await POST(request());
    expect(response.status).toBe(503); expect(sendMock).not.toHaveBeenCalled();
  });

  it('fails closed without Upstash credentials', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;
    const response = await POST(request());
    expect(response.status).toBe(503); expect(sendMock).not.toHaveBeenCalled();
  });

  it('fails closed without a trustworthy IP', async () => {
    const req = new Request('https://www.limatechnology.com.ar/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://www.limatechnology.com.ar' }, body: JSON.stringify({ nombre: 'Test', email: 'test@example.com', mensaje: 'Hola' }) });
    const response = await POST(req);
    expect(response.status).toBe(503); expect(sendMock).not.toHaveBeenCalled();
  });

  it('does not trust CF-Ray or CF-Connecting-IP alone', async () => {
    const req = new Request('https://www.limatechnology.com.ar/api/contact', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://www.limatechnology.com.ar', 'cf-ray': 'fake', 'cf-connecting-ip': '203.0.113.10' }, body: JSON.stringify({ nombre: 'Test', email: 'test@example.com', mensaje: 'Hola' }) });
    const response = await POST(req);
    expect(response.status).toBe(503);
  });

  it.each([
    ['bad origin', { origin: 'https://evil.example' }],
    ['bad referer', { origin: undefined, referer: 'https://evil.example/form' }],
  ])('rejects %s', async (_, headers) => {
    const base = { 'content-type': 'application/json', 'x-real-ip': '203.0.113.10', ...headers };
    if (headers.origin === undefined) delete base.origin;
    const req = new Request('https://www.limatechnology.com.ar/api/contact', { method: 'POST', headers: base, body: JSON.stringify({ nombre: 'Test', email: 'test@example.com', mensaje: 'Hola', turnstileToken: 'token-valid' }) });
    expect((await POST(req)).status).toBe(403);
  });

  it('rejects invalid JSON, content type, oversized body, honeypot and unknown fields', async () => {
    const base = { origin: 'https://www.limatechnology.com.ar', 'x-real-ip': '203.0.113.10' };
    expect((await POST(new Request('https://www.limatechnology.com.ar/api/contact', { method: 'POST', headers: { ...base, 'content-type': 'text/plain' }, body: '{}' }))).status).toBe(415);
    expect((await POST(new Request('https://www.limatechnology.com.ar/api/contact', { method: 'POST', headers: { ...base, 'content-type': 'application/json' }, body: '{' }))).status).toBe(400);
    expect((await POST(new Request('https://www.limatechnology.com.ar/api/contact', { method: 'POST', headers: { ...base, 'content-type': 'application/json' }, body: JSON.stringify({ nombre: 'x'.repeat(17000) }) }))).status).toBe(413);
    expect((await POST(request({ website: 'bot' }))).status).toBe(400);
    expect((await POST(request({ extra: 'x' }))).status).toBe(400);
  });

  it('fails safely when Siteverify times out and when Resend fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')));
    expect((await POST(request())).status).toBe(503);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, action: 'contact', hostname: 'www.limatechnology.com.ar' }), { status: 200 })));
    sendMock.mockRejectedValue(new Error('resend failure'));
    expect((await POST(request())).status).toBe(500);
  });
