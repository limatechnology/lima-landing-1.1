"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
// ─── Typewriter Hook ───────────────────────────────────────────────────────
function useTypewriter(words, ts = 90, ds = 55, pt = 1800) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi]; let t;
    if (!del && ci < w.length) t = setTimeout(() => { setDisplay(w.slice(0, ci + 1)); setCi(ci + 1); }, ts);
    else if (!del && ci === w.length) t = setTimeout(() => setDel(true), pt);
    else if (del && ci > 0) t = setTimeout(() => { setDisplay(w.slice(0, ci - 1)); setCi(ci - 1); }, ds);
    else if (del && ci === 0) { setDel(false); setWi((wi + 1) % words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, ts, ds, pt]);
  return display;
}

// ─── AI Premium Core (White Orb + Laser Network) ───────────────────────────
function FloatingParticles() {
  const r = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    const c = r.current, ctx = c.getContext("2d");
    const shell = shellRef.current;
    let a;
    const bgNodes = [];
    const orbParticles = [];
    const activePulses = [];

    const isMobile = window.innerWidth <= 768;
    const nodeCount = isMobile ? 45 : 90;
    const orbCount = isMobile ? 180 : 850;
    const maxPulses = 10; // Aumentado a 10 simultáneos
    const connDist = 200;
    const pulseChainProb = 0.4;

    const rs = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    rs(); window.addEventListener("resize", rs);

    const colors = [[184, 245, 0], [108, 99, 255], [0, 150, 255]];
    const orbColor = [118, 118, 118]; // 10% más oscuro que [131, 131, 131] (total 20% menos que original)

    for (let i = 0; i < nodeCount; i++) {
      const isLarge = Math.random() < 0.15;
      const baseS = Math.random() * 1.5 + 0.8;
      const brandC = colors[Math.floor(Math.random() * colors.length)];
      // Variations in tone/saturation
      const jitter = () => Math.floor(Math.random() * 40 - 20);
      const cVaried = [
        Math.max(0, Math.min(255, brandC[0] + jitter())),
        Math.max(0, Math.min(255, brandC[1] + jitter())),
        Math.max(0, Math.min(255, brandC[2] + jitter()))
      ];

      bgNodes.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.147,
        vy: (Math.random() - 0.5) * 0.147,
        s: isLarge ? baseS * 1.45 * 1.25 : baseS * 1.45, // +10% sobre el anterior
        c: cVaried,
        r: Math.random() * Math.PI * 2, // Para micro-rotación
        rv: Math.random() * 0.04 + 0.02
      });
    }

    class Pulse {
      constructor(startIndex) {
        this.path = [startIndex];
        let curr = startIndex;
        const targetLen = 2; // Fixed at 2 points (A->B)
        for (let k = 0; k < targetLen - 1; k++) {
          let neighbors = [];
          for (let m = 0; m < nodeCount; m++) {
            if (this.path.includes(m)) continue;
            const dx = bgNodes[curr].x - bgNodes[m].x, dy = bgNodes[curr].y - bgNodes[m].y;
            if (Math.sqrt(dx * dx + dy * dy) < connDist) neighbors.push(m);
          }
          if (neighbors.length === 0) break;
          const next = neighbors[Math.floor(Math.random() * neighbors.length)];
          this.path.push(next);
          curr = next;
        }
        this.prog = 0;
        this.tail = 0;
        this.state = 0; // 0: growing head, 1: solid/linger, 2: shrinking tail
        this.speed = 0.002083; // Velocidad ajustada para 8 segundos por fase (1/480 frames)
        this.timer = 0;
      }
      u() {
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
      d() {
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
        ctx.lineWidth = 1.0; // Aumentado un 25% de 0.8
        ctx.stroke();

        if (this.state === 0 || this.state === 1) {
          const idx = Math.min(Math.floor(this.prog), this.path.length - 2);
          const f = this.prog - idx;
          const n1 = bgNodes[this.path[idx]], n2 = bgNodes[this.path[idx + 1]];
          const hX = n1.x + (n2.x - n1.x) * f, hY = n1.y + (n2.y - n1.y) * f;
          ctx.beginPath();
          ctx.arc(hX, hY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150,150,150,0.8)`;
          ctx.fill();
        }
      }
    }

    class OrbP {
      constructor() {
        this.phi = Math.acos(-1 + (2 * Math.random()));
        this.theta = Math.random() * Math.PI * 2;
        this.px = Math.sin(this.phi) * Math.cos(this.theta);
        this.py = Math.sin(this.phi) * Math.sin(this.theta);
        this.pz = Math.cos(this.phi);
        this.s = (Math.random() * 1.3 + 0.5) * 1.1; // 10% larger
        this.p = Math.random() * Math.PI * 2;
      }
      d(rot, radius, time) {
        let x1 = this.px * Math.cos(rot) - this.pz * Math.sin(rot);
        let z1 = this.px * Math.sin(rot) + this.pz * Math.cos(rot);
        let y2 = this.py * Math.cos(rot * 0.7) - z1 * Math.sin(rot * 0.7);
        let z2 = this.py * Math.sin(rot * 0.7) + z1 * Math.cos(rot * 0.7);
        const pers = 500 / (500 + z2 * radius);
        const x = x1 * radius * pers + c.width / 2;
        const y = y2 * radius * pers + c.height / 2;
        const o = (0.26 + Math.sin(this.p + time) * 0.09) * pers; // Darkened another 10% (total 20% additional)
        ctx.beginPath();
        ctx.arc(x, y, this.s * pers, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orbColor[0]},${orbColor[1]},${orbColor[2]},${Math.max(0, o)})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < orbCount; i++) orbParticles.push(new OrbP());

    let rot = 0;
    let time = 0;

    const an = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      rot += 0.00041; // Reduced by 15% from 0.000482
      time += 0.02;

      bgNodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        n.r += n.rv; // Micro-rotación
        if (n.x < 0 || n.x > c.width) n.vx *= -1;
        if (n.y < 0 || n.y > c.height) n.vy *= -1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.s, 0, Math.PI * 2);
        const br = 0.45 + Math.sin(n.r) * 0.2; // Brillo variable
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${br})`;
        ctx.fill();
      });

      // Spawn pulses sparingly (Increased rate for 10 max pulses)
      if (activePulses.length < maxPulses && Math.random() < 0.15) {
        const i = Math.floor(Math.random() * nodeCount);
        activePulses.push(new Pulse(i));
      }

      for (let i = activePulses.length - 1; i >= 0; i--) {
        if (activePulses[i].u()) activePulses.splice(i, 1);
        else activePulses[i].d();
      }

      const orbRadius = Math.min(c.width, c.height) * 0.3; // Reducido un 30% de 0.429
      orbParticles.forEach(p => p.d(rot, orbRadius, time));

      a = requestAnimationFrame(an);
    };
    an();
    return () => { cancelAnimationFrame(a); window.removeEventListener("resize", rs); };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1 }}>
      <canvas ref={r} style={{ width: "100%", height: "100%" }} />
      <div
        ref={shellRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "72.1vmin", // Reducido un 30% de 103vmin
          height: "72.1vmin",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.009)",
          border: "none",
          transform: "translate(-50%, -50%)",
          backdropFilter: "blur(1.35px)", // -10% sobre 1.5px
          boxShadow: "inset 0 0 24.4px rgba(255, 255, 255, 0.018)",
          transition: "none"
        }}
      />
    </div>
  );
}

// ─── Icons ─────────────────────────────────────────────────────────────────
const I = {
  tiktok: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.62 2.15-7.01 1.4-2.58-.8-4.64-3.08-5.11-5.73-.55-3.08.76-6.41 3.42-7.98 1.88-1.12 4.24-1.31 6.29-.63l-.04 4.12c-1.3-.39-2.8-.24-3.92.51-1.25.84-1.8 2.51-1.22 3.9.52 1.25 1.96 2.05 3.32 1.95 1.52-.1 2.75-1.32 2.89-2.84.06-2.47.01-4.94.03-7.41V.02z"/></svg>,
  rocket: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  shield: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  monitor: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  globe: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>,
  spark: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 9.5 9.5 2.5-9.5 2.5-2.5 9.5-2.5-9.5-9.5-2.5 9.5-2.5z" /></svg>,
  check: (c) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c || "#B8F500"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  wa: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  ig: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  x: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>,
  threads: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" /></svg>,
  mail: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
  arrow: (c) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c || "currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
  back: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
};

// ─── Data ──────────────────────────────────────────────────────────────────
const heroWords = ["crecimiento", "negocio", "futuro", "pyme", "digitalización", "ciberseguridad"];
const WA = "https://wa.me/5493416139281?text=Hola%2C%20quiero%20asesoramiento%21";
const waplan = (name) => `https://wa.me/5493416139281?text=${encodeURIComponent(`Hola, quiero asesoramiento sobre el plan ${name}`)}`;

const services = [
  { icon: I.shield, title: "Ciberseguridad", color: "#6C63FF", desc: "Auditamos y protegemos la información de tu negocio: cuentas, accesos, backups, redes y dispositivos.", items: ["Auditoría de accesos y permisos", "Revisión de backups y recuperación", "Análisis de vulnerabilidades básicas", "Configuración segura de cuentas y dispositivos"] },
  { icon: I.rocket, title: "Crecimiento Digital", color: "#F5005E", desc: "Automatizaciones, páginas web, email marketing, CRM y estrategia digital. Hacemos que la tecnología trabaje para tu negocio.", items: ["Optimización de redes y Google Business", "Automatización de WhatsApp e Instagram", "Implementación de CRM y herramientas", "Estrategia de contenido y posicionamiento"] },
  { icon: I.globe, title: "Sitios Web", color: "#38BDF8", desc: "Creamos sitios modernos, rápidos y optimizados para convertir visitantes en clientes.", items: ["Diseño de sitio o landing profesional", "Integración con redes y formularios", "Optimización básica para buscadores (SEO)", "Publicación y puesta online"] },
  { icon: I.monitor, title: "Soporte IT", color: "#0078D4", desc: "Reparaciones, configuraciones y soporte técnico para cuando algo falla o necesita ponerse a punto.", items: ["Reparación y optimización de equipos", "Revisión completa de red y WiFi", "Diagnóstico y mantenimiento preventivo", "Instalación y configuración de software"] },
];

const featuredPlans = [
  { name: "Auditoría PyME", service: "Ciberseguridad", color: "#6C63FF", tag: "Servicio potencial", desc: "Protección integral para equipos de 5 a 20 personas. Detectamos todo lo que está en riesgo.", features: ["Revisión de cuentas corporativas vs personales", "Auditoría de backups y dispositivos", "Revisión de permisos y accesos por usuario", "Estructura de carpetas y directorio activo", "Informe escrito con recomendaciones"] },
  { name: "Lima Max", service: "Crecimiento Digital", color: "#F5005E", tag: "★ Todo en uno", desc: "Mantenimiento web completo + crecimiento digital full.", features: ["Mantenimiento web Pro completo", "2 difusiones + email marketing", "Publicaciones en web + reunión mensual", "Informe mensual completo", "Todo en un solo plan"] },
  { name: "Starter Digital", service: "Crecimiento Digital", color: "#F5005E", tag: "Más elegido", desc: "Setup inicial para digitalizar tu negocio. Todo lo que necesitás para arrancar.", features: ["Configuración de WhatsApp Business + ManyChat", "Automatización WA setup inicial", "CRM: carga y segmentación", "Informe inicial de métricas", "Soporte post-entrega incluido"] },
];

// All plans for the full plans page
const allPlans = [
  {
    section: "Ciberseguridad", color: "#6C63FF", icon: I.shield, plans: [
      { name: "Auditoría Micro", type: "Única vez", desc: "Para equipos de 1 a 5 personas.", features: ["Revisión de cuentas (corporativas vs personales)", "Backups y dispositivos", "Redes sociales y WiFi", "Dominio + informe escrito"] },
      { name: "Auditoría PyME", type: "Única vez", tag: "Más elegido", desc: "Para equipos de 5 a 20 personas.", features: ["Todo lo de Auditoría Micro", "Revisión de permisos/accesos por usuario", "Estructura de carpetas", "Directorio activo"] },
      { name: "Capacitación", type: "Add-on", desc: "Taller grupal de concientización.", features: ["1 sesión grupal (hasta 10 personas)", "Estafas, contraseñas, buenas prácticas", "Guía escrita + 30 días de consultas (opcional)"] },
    ]
  },
  {
    section: "Crecimiento Digital", color: "#F5005E", icon: I.rocket, plans: [
      { name: "Starter Digital", type: "Única vez", desc: "Setup inicial para digitalizar tu negocio.", features: ["Config WhatsApp Business + ManyChat", "Automatización WA setup inicial", "CRM carga y segmentación", "Informe inicial de métricas"] },
      { name: "Presencia Total", type: "Única vez", tag: "Más elegido", desc: "Estrategia digital completa + landing + automatizaciones.", features: ["Todo lo del Starter Digital", "Automatización IG setup inicial", "Landing page hasta 5 secciones + SEO", "Estrategia digital + revisión de redes", "1 mes de soporte post-entrega"] },
      { name: "Crecimiento Basic", type: "Mensual", desc: "Mantenimiento básico de tu estrategia digital.", features: ["1 difusión ManyChat o email marketing", "1 reunión de seguimiento (1hs)", "Informe mensual de métricas"] },
      { name: "Crecimiento Pro", type: "Mensual", desc: "Crecimiento activo con más difusiones y contenido.", features: ["2 difusiones (ManyChat + email mkt)", "Publicación de hasta 3 piezas en web", "Reunión mensual de seguimiento (2hs)", "Informe mensual de métricas"] },
      { name: "Lima Max", type: "Mensual", tag: "★ Todo en uno", desc: "Mantenimiento web completo + crecimiento digital full.", features: ["Mantenimiento web Pro completo", "2 difusiones + email marketing", "Publicaciones en web + reunión mensual", "Informe mensual completo", "Todo en un solo plan"] },
    ]
  },
  {
    section: "Sitios Web", color: "#38BDF8", icon: I.globe, plans: [
      { name: "Landing Page", type: "Única vez", desc: "Sitio web profesional de hasta 5 secciones.", features: ["Diseño + publicación", "SEO básico optimizado", "Integración con WhatsApp", "Revisión de visitas post-entrega"] },
      { name: "Mantenimiento Basic", type: "Mensual", desc: "Tu web siempre actualizada y funcionando.", features: ["Backups mensuales", "Actualización de plugins", "Monitoreo técnico"] },
      { name: "Mantenimiento Pro", type: "Mensual", desc: "Mantenimiento completo + modificaciones.", features: ["Todo lo de Basic", "Modificaciones de contenido", "Popups + upload de imágenes", "Cambios de texto/precios"] },
    ]
  },
  {
    section: "Soporte IT", color: "#0078D4", icon: I.monitor, plans: [
      { name: "IT Básico", type: "Mensual", desc: "Soporte remoto para equipos individuales. 3hs/mes.", features: ["3 horas mensuales de soporte", "Solo remoto, prioridad normal", "PCs, notebooks, impresoras", "Software de uso diario"] },
      { name: "IT Pro", type: "Mensual", desc: "Soporte remoto + presencial. 6hs/mes, prioridad alta.", features: ["6 horas mensuales de soporte", "Remoto + presencial programado", "Redes LAN / WiFi básicas", "Prioridad alta en respuesta"] },
      { name: "Servicio Puntual", type: "Por evento", desc: "Solución rápida para problemas específicos.", features: ["Diagnóstico técnico completo", "Resolución de fallas hw/sw", "Optimización de rendimiento", "Recomendaciones post-servicio"] },
    ]
  },
];

// ─── CSS ───────────────────────────────────────────────────────────────────

// ─── Components ────────────────────────────────────────────────────────────
function ServiceCard({ s, onViewPlans }) {
  return (
    <div className="info-card" style={{ "--acc": s.color }}>
      <div className="si" style={{ background: `${s.color}18`, color: s.color }}>{s.icon}</div>
      <h3>{s.title}</h3><p className="scd">{s.desc}</p>
      <div className="sis">{s.items.map((it, i) => <div key={i} className="sit">{I.check(s.color)}<span>{it}</span></div>)}</div>
      <button className="btn btn-outline" style={{ color: s.color, borderColor: `${s.color}44`, background: `${s.color}10`, marginTop: "1.5rem" }} onClick={onViewPlans}>Ver planes {I.arrow(s.color)}</button>
    </div>
  );
}

function PlanCard({ p }) {
  return (
    <div className="service-card" style={{ "--plan-c": p.color }}>
      <div className="pc-service" style={{ color: p.color }}>{p.service}</div>
      <div className="pc-tag" style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}><span className="pc-tag-dot" style={{ background: p.color }} />{p.tag}</div>
      <h3>{p.name}</h3><p className="pc-desc">{p.desc}</p>
      <div className="pc-feats">{p.features.map((f, j) => <div key={j} className="pc-feat">{I.check(p.color)}<span>{f}</span></div>)}</div>
      <a href={waplan(p.name)} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", marginTop: "2.5rem", background: p.color }}>Consultá por este plan</a>
    </div>
  );
}

// ─── All Plans Page ───────────────────────────────────────────────────────
function AllPlansPage({ onBack }) {
  return (
    <div className="sec" style={{ paddingTop: "8.5rem" }}>
      <button className="btn-extra" onClick={onBack}>{I.back} Volver a la landing</button>
      <div style={{ marginTop: "1.5rem" }}>
        <span className="sl">Todos los planes</span>
        <h2 className="stt">Explorá todas nuestras opciones</h2>
        <p className="sd">Pensamos planes y paquetes adaptados a cada necesidad. Sin precios fijos en la web — consultanos y buscamos la mejor opción para vos.</p>
      </div>
      {allPlans.map((sec, si) => (
        <div key={si} className="allp-section">
          <div className="allp-section-hdr">
            <div className="allp-section-icon" style={{ background: `${sec.color}18`, color: sec.color }}>{sec.icon}</div>
            <span className="allp-section-title" style={{ color: sec.color }}>{sec.section}</span>
          </div>
          <div className="allp-grid">
            {sec.plans.map((p, pi) => (
              <div key={pi} className="allp-card" style={{ "--ac": sec.color }}>
                <div className="allp-card-top"><h4>{p.name}</h4><span className="allp-type">{p.type}</span></div>
                {p.tag && <div className="allp-card-tag" style={{ background: `${sec.color}15`, color: sec.color }}>{p.tag}</div>}
                <p>{p.desc}</p>
                <div className="allp-feats">{p.features.map((f, fi) => <div key={fi} className="allp-feat">{I.check(sec.color)}<span>{f}</span></div>)}</div>
                <a href={waplan(p.name)} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: "100%", marginTop: "2.5rem", color: sec.color, borderColor: `${sec.color}44`, background: `${sec.color}10` }}>Consultar</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────

// ─── Contacto Section ──────────────────────────────────────────────────────
function ContactoSection() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", servicio: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, answer: "" });
  const [servOpen, setServOpen] = useState(false);
  const servOptions = ["Ciberseguridad", "Crecimiento Digital", "Sitios Web", "Soporte IT", "Otro / Consulta general"];

  useEffect(() => {
    setCaptcha({ n1: Math.floor(Math.random() * 9) + 1, n2: Math.floor(Math.random() * 9) + 1, answer: "" });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleAction = (action) => {
    const newErrors = {};

    const cleanNombre = form.nombre.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 100);
    const cleanEmail = form.email.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 150);
    const cleanTelefono = form.telefono.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 30);
    const cleanServicio = form.servicio.replace(/[\r\n\x00-\x1F\x7F]/g, "").trim().substring(0, 50);
    const cleanMensaje = form.mensaje.substring(0, 2000);
    const sanitizedMensaje = cleanMensaje.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "").trim();

    if (!cleanNombre) newErrors.nombre = "El nombre es obligatorio.";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) newErrors.email = "Por favor, ingresa un correo electrónico válido.";

    if (cleanTelefono && !/^\+?[0-9\s\-()]{7,25}$/.test(cleanTelefono)) {
      newErrors.telefono = "Por favor, ingresa un número de teléfono válido (ej: +54 9 341 000-0000).";
    }

    if (!sanitizedMensaje) newErrors.mensaje = "El mensaje no puede estar vacío o contener caracteres inválidos.";

    if (parseInt(captcha.answer) !== captcha.n1 + captcha.n2) {
      newErrors.captcha = "La suma de seguridad es incorrecta.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const WA = "https://wa.me/5493416139281";
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
    <section id="contacto" className="sec">
      <div className="ct-hero" style={{marginBottom: "3.5rem", textAlign: "center"}}>
        <span className="sl">Contacto</span>
        <h2 className="stt">Hablemos de tu <span className="hl">proyecto</span></h2>
        <p className="sd" style={{margin: "0 auto"}}>Completá el formulario y te respondemos por WhatsApp en menos de 24 horas.</p>
      </div>

      <div className="ct-grid">
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
            <div style={{ position: "relative" }}>
              <div 
                className={`cf-input cf-select ${servOpen ? "open" : ""}`} 
                onClick={() => setServOpen(!servOpen)}
                style={{ cursor: "pointer", userSelect: "none", display: "flex", alignItems: "center" }}
              >
                {form.servicio || "Seleccionar..."}
              </div>
              {servOpen && <div style={{position: "fixed", inset: 0, zIndex: 9}} onClick={() => setServOpen(false)} />}
              {servOpen && (
                <div style={{
                  position: "absolute", top: "100%", left: 0, right: 0, 
                  background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", 
                  marginTop: "4px", zIndex: 10, overflow: "hidden",
                  animation: "dropdownFade 0.2s ease forwards",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}>
                  {servOptions.map(opt => (
                    <div 
                      key={opt}
                      onClick={() => { setForm({ ...form, servicio: opt }); setServOpen(false); }}
                      style={{
                        padding: "10px 15px", cursor: "pointer", transition: "background 0.2s",
                        color: form.servicio === opt ? "#B8F500" : "#fff",
                        fontSize: "0.95rem"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                      onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}
            </div>
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
            <button type="button" className="btn btn-primary" onClick={() => handleAction("whatsapp")} style={{ flex: 1, minWidth: '200px' }}>
              {I.wa} Enviar WhatsApp
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleAction("email")} style={{ flex: 1, minWidth: '200px', background: 'transparent', border: '1px solid #444', color: '#fff' }}>
              {I.mail} Enviar por email
            </button>
          </div>
          <p className="cf-note">Se abrirá WhatsApp o tu cliente de correo con el mensaje.</p>
        </form>

        <aside className="ct-info">
          <div className="ci-block">
            <h3>Seguinos en redes</h3>
            <div className="ci-socials">
              <a href="https://www.instagram.com/limatech.ar/" target="_blank" rel="noopener noreferrer" className="btn-link">{I.ig} Instagram</a>
              <a href="https://threads.net/@limatech.ar" target="_blank" rel="noopener noreferrer" className="btn-link">{I.threads} Threads</a>
                            <a href="https://www.tiktok.com/@limatech.ar" target="_blank" rel="noopener noreferrer" className="btn-link">{I.tiktok} TikTok</a>
              <a href="https://x.com/limatech_ar" target="_blank" rel="noopener noreferrer" className="btn-link">{I.x} X / Twitter</a>
            </div>
          </div>
          <div className="ci-block">
            <h3>Horario de atención</h3>
            <p className="ci-days">Lunes a Viernes</p>
            <p className="ci-hours-time">9:00 — 18:00</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function LimaTechnology() {
  const [mob, setMob] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState("home"); // "home", "plans" or "contacto"
  const planesRef = useRef(null);
  const typedWord = useTypewriter(heroWords);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    
    const handleGlobalMouseMove = (e) => {
      const btn = e.target.closest('.btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
        btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
      }
    };
    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      window.removeEventListener("scroll", h);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const scrollToPlanes = useCallback(() => {
    if (planesRef.current) planesRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToAllPlans = () => { setPage("plans"); window.scrollTo(0, 0); };
  const goHome = () => { setPage("home"); window.scrollTo(0, 0); };

  if (page === "plans") return (
    <>
      <FloatingParticles />
      <nav className={`nav ${scrolled ? "sc" : ""}`}>
        <a href="#" className="nl" onClick={(e) => { e.preventDefault(); goHome(); }}>
          <Image src="/LimaTechnology.png" alt="Lima Technology" className="nl-img" width={130} height={66} priority />
        </a>

        
      </nav>
      <AllPlansPage onBack={goHome} />
      <footer className="ftr">
        <p>Lima Technology 2026 ©</p>
        <p className="ftr-made">Hecho con ♥ en Latinoamérica</p>
      </footer>
    </>
  );

  return (
    <>
      <FloatingParticles />
      <nav className={`nav ${scrolled ? "sc" : ""} ${mob ? "mo" : ""}`}>

        <a href="#" className="nl">
          <Image src="/LimaTechnology.png" alt="Lima Technology" className="nl-img" width={130} height={66} priority />
        </a>
        <ul className="nk">
          <li><a href="#servicios" onClick={() => setMob(false)}>Servicios Digitales</a></li>
          <li className="nk-item-has-submenu">
            <a href="#planes" onClick={() => setMob(false)}>Planes</a>
            <ul className="submenu">
              <li><a href="#" onClick={(e) => { e.preventDefault(); goToAllPlans(); setMob(false); }}>Ver todos los planes</a></li>
            </ul>
          </li>
          <li><a href="#nosotros" onClick={() => setMob(false)}>Nosotros</a></li>
          <li><a href="#clientes" onClick={() => setMob(false)}>Clientes</a></li>
          <li><a href="#contacto" onClick={() => setMob(false)}>Contacto</a></li>
        </ul>
        
        <button className="btn-menu" onClick={() => setMob(!mob)} aria-label={mob ? "Cerrar menú" : "Abrir menú"}>{mob ? "✕" : "☰"}</button>
      </nav>

      <section className="hero">
        <div className="hp"><span className="hps">{I.spark}</span> Transformación Digital & Seguridad para tu crecimiento</div>
        <h1>
          Aceleramos tu <br className="mo-br" />
          <span className="tw-word">
            <span className="sr-only">transformación digital, ciberseguridad y crecimiento de tu negocio</span>
            {typedWord}<span className="tw-cursor" />
          </span><br />
          con tecnología en Rosario<br className="mo-br" /> confiable
        </h1>

        <p className="hs">Acompañamos el crecimiento de tu negocio y su transformación digital con soluciones de ciberseguridad y tecnología confiable adaptadas a PyMEs, emprendedores y freelancers.</p>
        <div className="hb">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label="Contactar por WhatsApp">{I.wa} Comencemos ahora</a>
          <a href="#servicios" className="btn btn-secondary">Ver servicios</a>
        </div>
      </section>
      <div className="dv" />

      <section className="sec" id="servicios">
        <span className="sl">Servicios</span>
        <h2 className="stt">Soluciones reales para tu negocio</h2>
        <p className="sd">Acompañamos tu transformación digital con herramientas que entendés y te sirven. Sin vueltas, con honestidad y vocación de ayudar.</p>
        <div className="sg">{services.map((s, i) => <ServiceCard key={i} s={s} onViewPlans={scrollToPlanes} />)}</div>
      </section>
      <div className="dv" />

      <section className="sec" id="planes" ref={planesRef}>
        <span className="sl">Planes</span>
        <h2 className="stt">Elegí lo que necesitás</h2>
        <p className="sd">Planes pensados para acompañar el crecimiento de tu empresa. Consultá por personalización según tu necesidad real.</p>
        <div className="pg">{featuredPlans.map((p, i) => <PlanCard key={i} p={p} />)}</div>
        <button className="btn btn-secondary" style={{ marginTop: "2.5rem" }} onClick={goToAllPlans} aria-label="Ver todos los planes disponibles">Ver todos los planes {I.arrow()}</button>
      </section>
      <div className="dv" />

      <section className="sec" id="nosotros">
        <span className="sl">Sobre nosotros</span>
        <h2 className="stt">La historia detrás de Lima</h2>
        <div className="about-wrap">
          <div className="about-story">
            <div className="about-col"><p><strong>Lima Technology</strong> es un emprendimiento tecnológico fundado por <span className="lima-hl">Kevin</span>, un profesional con más de 10 años de experiencia en IT, seguridad informática y marketing digital.</p><p>Lima no nació en una oficina ni con un plan de negocios de 40 páginas. Nació de una conversación, de una idea suelta, y fue mutando hasta convertirse en algo con propósito real: acompañar a PyMEs y negocios locales en su crecimiento digital, con la misma dedicación que le pondría el dueño del negocio.</p></div>
            <div className="about-col"><p>Hoy Lima está en plena construcción: consolidando operaciones, estableciendo procesos ágiles y sumando clientes reales con los que trabajamos hombro a hombro.</p><p>No somos una agencia grande que te asigna un ejecutivo de cuenta que no sabe quién sos. Somos un equipo chico que se mete en tu negocio, entiende tu contexto, y trabaja como si la empresa fuera nuestra. Cada decisión que tomamos la tomamos pensando en si realmente te conviene — no en si nos conviene a nosotros.</p></div>
          </div>
          <div className="about-boxes">
            <div className="about-box"><div className="about-box-icon">🎯</div><h3>Misión</h3><p>Ayudar a PyMEs y negocios locales a crecer, digitalizarse y protegerse — con soluciones tecnológicas reales, sin venderles humo. Nos metemos en el negocio del cliente para entender qué necesitan de verdad, no para cerrar una venta.</p></div>
            <div className="about-box"><div className="about-box-icon">🔭</div><h3>Visión</h3><p>Ser el aliado tecnológico de referencia para negocios locales en Argentina — la empresa a la que llaman cuando quieren crecer con tecnología y saben que van a hablar con alguien que entiende su negocio, no solo su problema técnico.</p></div>
          </div>
          <div><span className="sl">Valores</span>
            <div className="about-values-grid">
              <div className="about-val"><strong>Honestidad ante todo</strong><span>Si algo no lo necesitás, te lo decimos.</span></div>
              <div className="about-val"><strong>Compromiso real</strong><span>Nos metemos en tu negocio como si fuera nuestro.</span></div>
              <div className="about-val"><strong>Simplicidad</strong><span>Tecnología que se entiende y se usa, no que impresiona y confunde.</span></div>
              <div className="about-val"><strong>Crecimiento genuino</strong><span>No buscamos clientes, buscamos relaciones a largo plazo.</span></div>
              <div className="about-val"><strong>Responsabilidad</strong><span>Si lo hacemos, lo hacemos bien.</span></div>
            </div>
          </div>
        </div>
      </section>
      <div className="dv" />

      <section className="sec cs" id="clientes">
        <span className="sl">Clientes</span>
        <h2 className="stt" style={{ textAlign: "center", marginBottom: "1rem" }}>Confían en nosotros</h2>
        <p className="sd" style={{ margin: "0 auto 1.5rem", textAlign: "center" }}>Empresas que eligieron dar el paso digital junto a Lima.</p>
        <div className="cg"><div className="cc">Beauty La Peluquería</div><div className="cc">La Culpa</div><div className="cc">GEMA</div><div className="cc">Comercios Locales</div><div className="cc">Pymes & Startups</div></div>
      </section>
      <div className="dv" />

      <ContactoSection />
      <footer className="ftr">
        <p>Lima Technology 2026 © Todos los derechos reservados</p>
        <p className="ftr-made">Hecho con ♥ en Latinoamérica</p>
      </footer>
    </>
  );
}
