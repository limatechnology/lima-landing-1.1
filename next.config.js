/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const cspValue = isDev
  ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.googletagmanager.com https://*.whatsapp.com; connect-src 'self' ws: wss: https://www.googletagmanager.com https://challenges.cloudflare.com; frame-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com; font-src 'self' data: https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
  : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.googletagmanager.com https://*.whatsapp.com; connect-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com; frame-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com; font-src 'self' data: https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspValue
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      // 1. Cabeceras de seguridad para todas las rutas
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // 2. Cache-Control optimizado para scripts estáticos públicos (como gtm.js)
      {
        source: '/js/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate'
          }
        ]
      },
      // 3. CORS y Cache-Control de seguridad para endpoints dinámicos
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.limatechnology.com.ar'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type'
          },
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
          }
        ]
      }
    ];
  },
};

module.exports = nextConfig;
