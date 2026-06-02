"use client";
import { useState, useEffect, useRef } from "react";

// ─── Signal Network Animation (Comunicaciones) ─────────────────────────────
// Misma red de nodos que la home, sin orb.
// En lugar del orb: "broadcast rings" — anillos que irradian desde nodos
// como señales WiFi/radio, evocando comunicación y contacto.
function SignalNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let animId;
    const bgNodes = [];
    const activePulses = [];
    const activeBroadcasts = [];

    const nodeCount = 90;
    const maxPulses = 10;
    const maxBroadcasts = 5;
    const connDist = 200;
    const colors = [[184, 245, 0], [108, 99, 255], [0, 150, 255]];

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const jitter = () => Math.floor(Math.random() * 40 - 20);
    for (let i = 0; i < nodeCount; i++) {
      const isLarge = Math.random() < 0.15;
      const baseS = Math.random() * 1.5 + 0.8;
      const brandC = colors[Math.floor(Math.random() * colors.length)];
      const cVaried = [
        Math.max(0, Math.min(255, brandC[0] + jitter())),
        Math.max(0, Math.min(255, brandC[1] + jitter())),
        Math.max(0, Math.min(255, brandC[2] + jitter())),
      ];
      bgNodes.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.147,
        vy: (Math.random() - 0.5) * 0.147,
        s: isLarge ? baseS * 1.45 * 1.25 : baseS * 1.45,
        c: cVaried,
        r: Math.random() * Math.PI * 2,
        rv: Math.random() * 0.04 + 0.02,
      });
    }

    // Pulso laser entre nodos (igual que la home)
    class Pulse {
      constructor(startIndex) {
        this.path = [startIndex];
        let curr = startIndex;
        for (let k = 0; k < 1; k++) {
          const neighbors = [];
          for (let m = 0; m < nodeCount; m++) {
            if (this.path.includes(m)) continue;
            const dx = bgNodes[curr].x - bgNodes[m].x;
            const dy = bgNodes[curr].y - bgNodes[m].y;
            if (Math.sqrt(dx * dx + dy * dy) < connDist) neighbors.push(m);
          }
          if (!neighbors.length) break;
          const next = neighbors[Math.floor(Math.random() * neighbors.length)];
          this.path.push(next);
          curr = next;
        }
        this.prog = 0; this.tail = 0; this.state = 0;
        this.speed = 0.002083; this.timer = 0;
      }
      update() {
        const segs = this.path.length - 1;
        if (this.state === 0) {
          this.prog += this.speed;
          if (this.prog >= segs) { this.prog = segs; this.state = 1; }
        } else if (this.state === 1) {
          this.timer++;
          if (this.timer > 40) this.state = 2;
        } else {
          this.tail += this.speed;
          if (this.tail >= segs) return true;
        }
        return false;
      }
      draw() {
        if (this.path.length < 2) return;
        ctx.beginPath();
        for (let k = 0; k < this.path.length - 1; k++) {
          const s = Math.max(k, this.tail), e = Math.min(k + 1, this.prog);
          if (s >= e) continue;
          const n1 = bgNodes[this.path[k]], n2 = bgNodes[this.path[k + 1]];
          const fS = s - k, fE = e - k;
          ctx.moveTo(n1.x + (n2.x - n1.x) * fS, n1.y + (n2.y - n1.y) * fS);
          ctx.lineTo(n1.x + (n2.x - n1.x) * fE, n1.y + (n2.y - n1.y) * fE);
        }
        ctx.strokeStyle = `rgba(100,100,100,0.4)`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        if (this.state === 0 || this.state === 1) {
          const idx = Math.min(Math.floor(this.prog), this.path.length - 2);
          const f = this.prog - idx;
          const n1 = bgNodes[this.path[idx]], n2 = bgNodes[this.path[idx + 1]];
          ctx.beginPath();
          ctx.arc(n1.x + (n2.x - n1.x) * f, n1.y + (n2.y - n1.y) * f, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,150,150,0.8)`;
          ctx.fill();
        }
      }
    }

    // Broadcast ring: anillos concéntricos que irradian desde un nodo
    // como señal WiFi / radio — tema de comunicaciones
    class Broadcast {
      constructor(nodeIndex) {
        this.nodeIndex = nodeIndex;
        this.c = bgNodes[nodeIndex].c;
        this.rings = [{ r: 0, alpha: 0.6 }];
        this.maxR = 110;
        this.speed = 1.1;
        this.ringInterval = 28;
        this.frame = 0;
        this.maxRings = 3;
      }
      update() {
        this.frame++;
        if (this.frame % this.ringInterval === 0 && this.rings.length < this.maxRings) {
          this.rings.push({ r: 0, alpha: 0.6 });
        }
        this.rings.forEach(ring => {
          ring.r += this.speed;
          ring.alpha = 0.6 * (1 - ring.r / this.maxR);
        });
        this.rings = this.rings.filter(ring => ring.r < this.maxR);
        return this.rings.length === 0 && this.frame > this.ringInterval * this.maxRings;
      }
      draw() {
        const n = bgNodes[this.nodeIndex];
        this.rings.forEach(ring => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${this.c[0]},${this.c[1]},${this.c[2]},${ring.alpha * 0.45})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        });
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      bgNodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.r += n.rv;
        if (n.x < 0 || n.x > c.width) n.vx *= -1;
        if (n.y < 0 || n.y > c.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${0.45 + Math.sin(n.r) * 0.2})`;
        ctx.fill();
      });

      if (activePulses.length < maxPulses && Math.random() < 0.15)
        activePulses.push(new Pulse(Math.floor(Math.random() * nodeCount)));
      for (let i = activePulses.length - 1; i >= 0; i--) {
        if (activePulses[i].update()) activePulses.splice(i, 1);
        else activePulses[i].draw();
      }

      if (activeBroadcasts.length < maxBroadcasts && Math.random() < 0.008)
        activeBroadcasts.push(new Broadcast(Math.floor(Math.random() * nodeCount)));
      for (let i = activeBroadcasts.length - 1; i >= 0; i--) {
        if (activeBroadcasts[i].update()) activeBroadcasts.splice(i, 1);
        else activeBroadcasts[i].draw();
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1 }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────
const I = {
  wa: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  ig: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  x: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>,
  threads: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" /></svg>,
  check: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8F500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
};

const WA = "https://wa.me/5493416139281";

// ─── Contacto Page ──────────────────────────────────────────────────────────
export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", servicio: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, answer: "" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    setCaptcha({ n1: Math.floor(Math.random() * 9) + 1, n2: Math.floor(Math.random() * 9) + 1, answer: "" });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleAction = (action) => {
    const newErrors = {};

    // Standardize and sanitize inputs
    const cleanNombre = form.nombre.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 100);
    const cleanEmail = form.email.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 150);
    const cleanTelefono = form.telefono.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 30);
    const cleanServicio = form.servicio.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 50);
    const cleanMensaje = form.mensaje.substring(0, 2000);
    const sanitizedMensaje = cleanMensaje.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "").trim();

    // Validation checks
    if (!cleanNombre) {
      newErrors.nombre = "El nombre es obligatorio.";
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      newErrors.email = "Por favor, ingresa un correo electrónico válido.";
    }

    if (cleanTelefono && !/^\+?[0-9\s\-()]{7,25}$/.test(cleanTelefono)) {
      newErrors.telefono = "Por favor, ingresa un número de teléfono válido (ej: +54 9 341 000-0000).";
    }

    if (!sanitizedMensaje) {
      newErrors.mensaje = "El mensaje no puede estar vacío o contener caracteres inválidos.";
    }

    if (parseInt(captcha.answer) !== captcha.n1 + captcha.n2) {
      newErrors.captcha = "La suma de seguridad es incorrecta.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (action === "whatsapp") {
      const lines = [
        `Hola Lima Technology! Me contacto desde el formulario web.`,
        ``,
        `Nombre: ${cleanNombre}`,
        `Email: ${cleanEmail}`,
        cleanTelefono ? `Teléfono: ${cleanTelefono}` : null,
        cleanServicio ? `Servicio de interés: ${cleanServicio}` : null,
        ``,
        `Mensaje: ${sanitizedMensaje}`,
      ].filter(l => l !== null).join("\n");
      window.open(`${WA}?text=${encodeURIComponent(lines)}`, "_blank");
    } else {
      const lines = [
        `Nombre: ${cleanNombre}`,
        `Email: ${cleanEmail}`,
        cleanTelefono ? `Teléfono: ${cleanTelefono}` : null,
        cleanServicio ? `Servicio de interés: ${cleanServicio}` : null,
        ``,
        `Mensaje: ${sanitizedMensaje}`,
      ].filter(l => l !== null).join("\n");
      window.open(`mailto:limatech.ar@gmail.com?subject=Contacto desde sitio web&body=${encodeURIComponent(lines)}`, "_blank");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAction("whatsapp");
  };

  return (
    <>
      <SignalNetwork />

      <nav className={`nav ${scrolled ? "sc" : ""}`}>
        <a href="/" className="nl">
          <img src="/LimaTechnology.png" alt="Logo de Lima Technology - Expertos en Ciberseguridad y Crecimiento Digital" className="nl-img" />
        </a>
        <div className="ncw">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="nc">Contactar por WhatsApp</a>
        </div>
      </nav>

      <main className="ct-main">

        <div className="ct-hero">
          <span className="sl">Contacto</span>
          <h1 className="ct-title">Hablemos de tu <span className="hl">proyecto</span></h1>
          <p className="ct-sub">Completá el formulario y te respondemos por WhatsApp en menos de 24 horas.</p>
        </div>

        <div className="ct-grid">

          {/* Formulario */}
          <form className="ct-form" method="POST" onSubmit={handleSubmit}>
            <div className="cf-group">
              <label className="cf-label">Nombre *</label>
              <input className="cf-input" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" required style={errors.nombre ? { borderColor: "#ff4a4a" } : {}} />
              {errors.nombre && <span className="cf-error-text" style={{ color: "#ff4a4a", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{errors.nombre}</span>}
            </div>
            <div className="cf-group">
              <label className="cf-label">Email *</label>
              <input className="cf-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" required style={errors.email ? { borderColor: "#ff4a4a" } : {}} />
              {errors.email && <span className="cf-error-text" style={{ color: "#ff4a4a", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{errors.email}</span>}
            </div>
            <div className="cf-group">
              <label className="cf-label">WhatsApp <span className="cf-opt">(opcional)</span></label>
              <input className="cf-input" name="telefono" value={form.telefono} onChange={handleChange} placeholder="+54 9 341 000 0000" style={errors.telefono ? { borderColor: "#ff4a4a" } : {}} />
              {errors.telefono && <span className="cf-error-text" style={{ color: "#ff4a4a", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{errors.telefono}</span>}
            </div>
            <div className="cf-group">
              <label className="cf-label">Servicio de interés</label>
              <select className="cf-input cf-select" name="servicio" value={form.servicio} onChange={handleChange}>
                <option value="">Seleccionar...</option>
                <option>Ciberseguridad</option>
                <option>Crecimiento Digital</option>
                <option>Sitios Web</option>
                <option>Soporte IT</option>
                <option>Otro / Consulta general</option>
              </select>
            </div>
            <div className="cf-group">
              <label className="cf-label">Mensaje *</label>
              <textarea className="cf-input cf-textarea" name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Contanos en qué podemos ayudarte..." required rows={4} style={errors.mensaje ? { borderColor: "#ff4a4a" } : {}} />
              {errors.mensaje && <span className="cf-error-text" style={{ color: "#ff4a4a", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{errors.mensaje}</span>}
            </div>
            {captcha.n1 > 0 && (
              <div className="cf-group">
                <label className="cf-label">Seguridad: ¿Cuánto es {captcha.n1} + {captcha.n2}? *</label>
                <input className="cf-input" name="captcha" value={captcha.answer} onChange={(e) => { setCaptcha({ ...captcha, answer: e.target.value }); if (errors.captcha) setErrors({ ...errors, captcha: "" }); }} placeholder="Respuesta" required style={errors.captcha ? { borderColor: "#ff4a4a" } : {}} />
                {errors.captcha && <span className="cf-error-text" style={{ color: "#ff4a4a", fontSize: "0.8rem", marginTop: "0.25rem", display: "block" }}>{errors.captcha}</span>}
              </div>
            )}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button type="button" className="cf-submit" onClick={() => handleAction("whatsapp")} style={{ flex: 1, minWidth: '200px' }}>
                {I.wa} Enviar WhatsApp
              </button>
              <button type="button" className="cf-submit" onClick={() => handleAction("email")} style={{ flex: 1, minWidth: '200px', background: 'transparent', border: '1px solid #444', color: '#fff' }}>
                {I.mail} Enviar por email
              </button>
            </div>
            <p className="cf-note">Se abrirá WhatsApp o tu cliente de correo con el mensaje.</p>
          </form>

          {/* Info sidebar */}
          <aside className="ct-info">
            <div className="ci-block">
              <h3>Seguinos</h3>
              <div className="ci-socials">
                <a href="https://www.instagram.com/limatech.ar/" target="_blank" rel="noopener noreferrer" className="ctlk">{I.ig} Instagram</a>
                <a href="https://threads.net/@limatech.ar" target="_blank" rel="noopener noreferrer" className="ctlk">{I.threads} Threads</a>
                <a href="https://x.com/limatech_ar" target="_blank" rel="noopener noreferrer" className="ctlk">{I.x} X / Twitter</a>
              </div>
            </div>

            <div className="ci-block">
              <h3>Horario de atención</h3>
              <p className="ci-days">Lunes a Viernes</p>
              <p className="ci-hours-time">9:00 — 18:00</p>
            </div>
          </aside>

        </div>
      </main>

      <footer className="ftr">
        <p>Lima Technology 2026 ©</p>
        <p className="ftr-made">Hecho con ♥ en Latinoamérica</p>
      </footer>
    </>
  );
}
