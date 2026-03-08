import { useState, useEffect, useRef, useCallback } from "react";

// ─── Typewriter Hook ───────────────────────────────────────────────────────
function useTypewriter(words, ts = 90, ds = 55, pt = 1800) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi]; let t;
    if (!del && ci < w.length) t = setTimeout(() => { setDisplay(w.slice(0, ci+1)); setCi(ci+1); }, ts);
    else if (!del && ci === w.length) t = setTimeout(() => setDel(true), pt);
    else if (del && ci > 0) t = setTimeout(() => { setDisplay(w.slice(0, ci-1)); setCi(ci-1); }, ds);
    else if (del && ci === 0) { setDel(false); setWi((wi+1) % words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words, ts, ds, pt]);
  return display;
}

// ─── Floating Particles ────────────────────────────────────────────────────
function FloatingParticles() {
  const r = useRef(null);
  useEffect(() => {
    const c = r.current, x = c.getContext("2d"); let a, ps = [];
    const rs = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    rs(); window.addEventListener("resize", rs);
    class P { constructor(){this.r()} r(){this.x=Math.random()*c.width;this.y=Math.random()*c.height;this.s=Math.random()*2.5+.8;this.sx=(Math.random()-.5)*.6;this.sy=(Math.random()-.5)*.6;this.o=Math.random()*.45+.1;this.p=Math.random()*Math.PI*2;const cl=[[184,245,0],[108,99,255],[0,127,255],[56,189,248]];this.c=cl[Math.floor(Math.random()*cl.length)]} u(){this.x+=this.sx;this.y+=this.sy;this.p+=.015;if(this.x<0||this.x>c.width)this.sx*=-1;if(this.y<0||this.y>c.height)this.sy*=-1} d(){const o=this.o+Math.sin(this.p)*.12;x.beginPath();x.arc(this.x,this.y,this.s,0,Math.PI*2);x.fillStyle=`rgba(${this.c[0]},${this.c[1]},${this.c[2]},${Math.max(0,o)})`;x.fill()} }
    for(let i=0;i<70;i++)ps.push(new P());
    const ln=()=>{for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const dx=ps[i].x-ps[j].x,dy=ps[i].y-ps[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<140){x.beginPath();x.moveTo(ps[i].x,ps[i].y);x.lineTo(ps[j].x,ps[j].y);x.strokeStyle=`rgba(184,245,0,${.06*(1-d/140)})`;x.lineWidth=.5;x.stroke()}}};
    const an=()=>{x.clearRect(0,0,c.width,c.height);ps.forEach(p=>{p.u();p.d()});ln();a=requestAnimationFrame(an)};an();
    return()=>{cancelAnimationFrame(a);window.removeEventListener("resize",rs)};
  },[]);
  return <canvas ref={r} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0}}/>;
}

// ─── Icons ─────────────────────────────────────────────────────────────────
const I={
  rocket:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  shield:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
  monitor:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  globe:<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  check:(c)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c||"#B8F500"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  wa:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  ig:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  mail:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  arrow:(c)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  back:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
};

// ─── Data ──────────────────────────────────────────────────────────────────
const heroWords=["emprendimiento","negocio","pyme","digitalización","crecimiento"];
const WA="https://wa.me/5493416139281?text=Hola%2C%20quiero%20asesoramiento%21";

const services=[
  {icon:I.shield,title:"Ciberseguridad",color:"#6C63FF",desc:"Auditamos y protegemos la información de tu negocio: cuentas, accesos, backups, redes y dispositivos.",items:["Auditoría de accesos y permisos","Revisión de backups y recuperación","Análisis de vulnerabilidades básicas","Configuración segura de cuentas y dispositivos"]},
  {icon:I.rocket,title:"Crecimiento Digital",color:"#F5005E",desc:"Automatizaciones, páginas web, email marketing, CRM y estrategia digital. Hacemos que la tecnología trabaje para tu negocio.",items:["Optimización de redes y Google Business","Automatización de WhatsApp e Instagram","Implementación de CRM y herramientas","Estrategia de contenido y posicionamiento"]},
  {icon:I.globe,title:"Sitios Web",color:"#38BDF8",desc:"Creamos sitios modernos, rápidos y optimizados para convertir visitantes en clientes.",items:["Diseño de sitio o landing profesional","Integración con redes y formularios","Optimización básica para buscadores (SEO)","Publicación y puesta online"]},
  {icon:I.monitor,title:"Soporte IT",color:"#0078D4",desc:"Reparaciones, configuraciones y soporte técnico para cuando algo falla o necesita ponerse a punto.",items:["Reparación y optimización de equipos","Revisión completa de red y WiFi","Diagnóstico y mantenimiento preventivo","Instalación y configuración de software"]},
];

const featuredPlans=[
  {name:"Auditoría PyME",service:"Ciberseguridad",color:"#6C63FF",tag:"★ Servicio potencial",desc:"Protección integral para equipos de 5 a 20 personas. Detectamos todo lo que está en riesgo.",features:["Revisión de cuentas corporativas vs personales","Auditoría de backups y dispositivos","Revisión de permisos y accesos por usuario","Estructura de carpetas y directorio activo","Informe escrito con recomendaciones"]},
  {name:"Presencia Total",service:"Crecimiento Digital",color:"#F5005E",tag:"★ Servicio potencial",desc:"Estrategia digital completa: automatización, landing, redes y soporte post-entrega.",features:["Configuración de WhatsApp Business + ManyChat","Automatización WA + IG (setup inicial)","Landing page hasta 5 secciones + SEO","CRM: carga, segmentación y listas automáticas","Estrategia digital + 1 mes soporte post-entrega"]},
  {name:"IT Pro",service:"Soporte IT",color:"#0078D4",tag:"Más elegido",desc:"Soporte remoto + presencial programado con prioridad alta. 6 horas mensuales incluidas.",features:["6 horas mensuales de soporte incluidas","Soporte remoto + presencial programado","Redes LAN / WiFi básicas","Prioridad alta en tiempos de respuesta","Consultas técnicas ilimitadas en horario laboral"]},
];

// All plans for the full plans page
const allPlans = [
  { section: "Ciberseguridad", color: "#6C63FF", icon: I.shield, plans: [
    { name: "Auditoría Micro", type: "Única vez", desc: "Para equipos de 1 a 5 personas.", features: ["Revisión de cuentas (corporativas vs personales)", "Backups y dispositivos", "Redes sociales y WiFi", "Dominio + informe escrito"] },
    { name: "Auditoría PyME", type: "Única vez", tag: "★ Potencial", desc: "Para equipos de 5 a 20 personas.", features: ["Todo lo de Auditoría Micro", "Revisión de permisos/accesos por usuario", "Estructura de carpetas", "Directorio activo"] },
    { name: "Capacitación", type: "Add-on", desc: "Taller grupal de concientización.", features: ["1 sesión grupal (hasta 10 personas)", "Estafas, contraseñas, buenas prácticas", "Guía escrita + 30 días de consultas (opcional)"] },
  ]},
  { section: "Crecimiento Digital", color: "#F5005E", icon: I.rocket, plans: [
    { name: "Starter Digital", type: "Única vez", desc: "Setup inicial para digitalizar tu negocio.", features: ["Config WhatsApp Business + ManyChat", "Automatización WA setup inicial", "CRM carga y segmentación", "Informe inicial de métricas"] },
    { name: "Presencia Total", type: "Única vez", tag: "★ Potencial", desc: "Estrategia digital completa + landing + automatizaciones.", features: ["Todo lo del Starter Digital", "Automatización IG setup inicial", "Landing page hasta 5 secciones + SEO", "Estrategia digital + revisión de redes", "1 mes de soporte post-entrega"] },
    { name: "Crecimiento Basic", type: "Mensual", desc: "Mantenimiento básico de tu estrategia digital.", features: ["1 difusión ManyChat o email marketing", "1 reunión de seguimiento (1hs)", "Informe mensual de métricas"] },
    { name: "Crecimiento Pro", type: "Mensual", desc: "Crecimiento activo con más difusiones y contenido.", features: ["2 difusiones (ManyChat + email mkt)", "Publicación de hasta 3 piezas en web", "Reunión mensual de seguimiento (2hs)", "Informe mensual de métricas"] },
    { name: "Lima Max", type: "Mensual", tag: "★ Combo estrella", desc: "Mantenimiento web completo + crecimiento digital full.", features: ["Mantenimiento web Pro completo", "2 difusiones + email marketing", "Publicaciones en web + reunión mensual", "Informe mensual completo", "Todo en un solo plan"] },
  ]},
  { section: "Sitios Web", color: "#38BDF8", icon: I.globe, plans: [
    { name: "Landing Page", type: "Única vez", desc: "Sitio web profesional de hasta 5 secciones.", features: ["Diseño + publicación", "SEO básico optimizado", "Integración con WhatsApp", "Revisión de visitas post-entrega"] },
    { name: "Mantenimiento Basic", type: "Mensual", desc: "Tu web siempre actualizada y funcionando.", features: ["Backups mensuales", "Actualización de plugins", "Monitoreo técnico"] },
    { name: "Mantenimiento Pro", type: "Mensual", desc: "Mantenimiento completo + modificaciones.", features: ["Todo lo de Basic", "Modificaciones de contenido", "Popups + upload de imágenes", "Cambios de texto/precios"] },
  ]},
  { section: "Soporte IT", color: "#0078D4", icon: I.monitor, plans: [
    { name: "IT Básico", type: "Mensual", desc: "Soporte remoto para equipos individuales. 3hs/mes.", features: ["3 horas mensuales de soporte", "Solo remoto, prioridad normal", "PCs, notebooks, impresoras", "Software de uso diario"] },
    { name: "IT Pro", type: "Mensual", tag: "Más elegido", desc: "Soporte remoto + presencial. 6hs/mes, prioridad alta.", features: ["6 horas mensuales de soporte", "Remoto + presencial programado", "Redes LAN / WiFi básicas", "Prioridad alta en respuesta"] },
    { name: "Servicio Puntual", type: "Por evento", desc: "Solución rápida para problemas específicos.", features: ["Diagnóstico técnico completo", "Resolución de fallas hw/sw", "Optimización de rendimiento", "Recomendaciones post-servicio"] },
  ]},
];

// ─── CSS ───────────────────────────────────────────────────────────────────
const css=`
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
:root{--lima:#B8F500;--lima-10:rgba(184,245,0,.10);--lima-15:rgba(184,245,0,.15);--bg:#101010;--card:#181818;--card-h:#1e1e1e;--t1:#F5F5F5;--t2:#CCCCCC;--t3:#777777;--brd:#2a2a2a;--brd2:#333333}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',-apple-system,sans-serif;background:var(--bg);color:var(--t1);overflow-x:hidden;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:.9rem 2rem;display:flex;align-items:center;justify-content:space-between;background:rgba(16,16,16,.8);backdrop-filter:blur(24px);border-bottom:1px solid rgba(255,255,255,.05);transition:padding .3s}.nav.sc{padding:.6rem 2rem}
.nl{display:flex;align-items:center;gap:.65rem;text-decoration:none;color:var(--t1)}.nl-m{width:30px;height:30px;border-radius:7px;background:var(--lima);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:16px;color:#101010}.nl-t{font-weight:700;font-size:1rem;letter-spacing:-.02em}.nl-t span{color:var(--lima)}
.nk{display:flex;gap:1.75rem;list-style:none}.nk a,.nk button{text-decoration:none;color:var(--t3);font-size:.8rem;font-weight:600;transition:color .2s;background:none;border:none;cursor:pointer;font-family:inherit}.nk a:hover,.nk button:hover{color:var(--lima)}
.nc{padding:.45rem 1.1rem;border-radius:8px;background:var(--lima);color:#101010;font-weight:700;font-size:.8rem;text-decoration:none;transition:all .2s}.nc:hover{background:#a6dd00;transform:translateY(-1px)}
.nm{display:none;background:none;border:none;color:var(--t1);cursor:pointer;font-size:1.4rem}
@media(max-width:768px){.nk,.ncw{display:none}.nm{display:block}.nav.mo .nk{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(16,16,16,.97);padding:1.25rem 2rem;border-bottom:1px solid var(--brd);gap:1rem}.nav.mo .ncw{display:block;position:absolute;top:calc(100% + 140px);left:0;right:0;padding:0 2rem 1.25rem;background:rgba(16,16,16,.97)}}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 5rem;position:relative}
.hp{display:inline-flex;align-items:center;gap:.5rem;padding:.35rem .9rem;border-radius:999px;background:var(--lima-10);border:1px solid rgba(184,245,0,.18);font-size:.75rem;color:var(--lima);font-weight:600;margin-bottom:2rem;animation:fu .7s ease both}
.hpd{width:5px;height:5px;border-radius:50%;background:var(--lima);animation:bl 2s ease infinite}
@keyframes bl{0%,100%{opacity:1}50%{opacity:.3}}
.hero h1{font-size:clamp(2.4rem,5.5vw,4.2rem);font-weight:800;line-height:1.08;letter-spacing:-.035em;max-width:780px;margin-bottom:1.25rem;animation:fu .7s ease .08s both}
.hl{color:var(--lima)}.tw-word{color:var(--lima);display:inline;position:relative}.tw-cursor{display:inline-block;width:3px;height:1em;background:var(--lima);margin-left:2px;vertical-align:text-bottom;animation:cb .6s ease infinite}
@keyframes cb{0%,100%{opacity:1}50%{opacity:0}}
.hs{font-size:clamp(.95rem,1.8vw,1.15rem);color:var(--t2);max-width:520px;line-height:1.6;margin-bottom:2.25rem;font-weight:500;animation:fu .7s ease .16s both}
.hb{display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center;animation:fu .7s ease .24s both}
.bl-btn{display:inline-flex;align-items:center;gap:.45rem;padding:.75rem 1.75rem;border-radius:10px;background:var(--lima);color:#101010;font-weight:700;font-size:.9rem;text-decoration:none;border:none;cursor:pointer;transition:all .25s}.bl-btn:hover{background:#a6dd00;transform:translateY(-2px);box-shadow:0 8px 32px rgba(184,245,0,.2)}
.bo{padding:.75rem 1.75rem;border-radius:10px;background:transparent;color:var(--t1);font-weight:600;font-size:.9rem;text-decoration:none;border:1px solid var(--brd2);transition:all .25s;cursor:pointer;font-family:inherit}.bo:hover{border-color:var(--lima);color:var(--lima)}
@keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.sec{padding:5.5rem 2rem;max-width:1140px;margin:0 auto;position:relative;z-index:1}
.sl{display:inline-block;font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.14em;color:var(--lima);margin-bottom:.6rem}
.stt{font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:800;letter-spacing:-.025em;margin-bottom:.75rem;line-height:1.15}
.sd{font-size:.95rem;color:var(--t2);max-width:550px;line-height:1.6;margin-bottom:2.5rem;font-weight:500}
.dv{height:1px;background:linear-gradient(to right,transparent,var(--brd),transparent);max-width:1140px;margin:0 auto}
.sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
.sc-card{background:var(--card);border:1px solid var(--brd);border-radius:14px;padding:1.5rem;transition:all .3s;position:relative;overflow:hidden;display:flex;flex-direction:column}.sc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--acc);opacity:0;transition:opacity .3s}.sc-card:hover::before{opacity:1}.sc-card:hover{border-color:rgba(255,255,255,.08);background:var(--card-h);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.3)}
.si{width:46px;height:46px;border-radius:11px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem}
.sc-card h3{font-size:1.05rem;font-weight:700;margin-bottom:.4rem}.scd{font-size:.85rem;color:var(--t2);line-height:1.5;margin-bottom:.85rem}
.sis{display:flex;flex-direction:column;gap:.5rem;flex:1}.sit{display:flex;align-items:flex-start;gap:.45rem;font-size:.82rem;color:var(--t2);line-height:1.4}
.srv-plan-btn{display:inline-flex;align-items:center;gap:.35rem;margin-top:1rem;padding:.5rem 1rem;border-radius:8px;font-size:.78rem;font-weight:700;text-decoration:none;transition:all .25s;border:1px solid;align-self:flex-start;cursor:pointer;background:none;font-family:inherit}.srv-plan-btn:hover{transform:translateY(-1px);filter:brightness(1.15)}
.pg{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.25rem}
.pc{background:var(--card);border:1px solid var(--brd);border-radius:14px;padding:1.75rem;display:flex;flex-direction:column;transition:all .3s;position:relative;overflow:hidden}.pc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--plan-c)}.pc:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.3);border-color:rgba(255,255,255,.08)}
.pc-service{font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.35rem}
.pc-tag{display:inline-flex;align-items:center;gap:.35rem;padding:.2rem .65rem;border-radius:999px;font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;margin-bottom:.85rem;width:fit-content}.pc-tag-dot{width:5px;height:5px;border-radius:50%}
.pc h3{font-size:1.25rem;font-weight:800;margin-bottom:.4rem}.pc-desc{font-size:.85rem;color:var(--t2);line-height:1.5;margin-bottom:1.25rem}
.pc-feats{display:flex;flex-direction:column;gap:.6rem;flex:1;margin-bottom:1.25rem}.pc-feat{display:flex;align-items:flex-start;gap:.5rem;font-size:.85rem;color:var(--t2);line-height:1.4}.pc-feat svg{flex-shrink:0;margin-top:2px}
.pc-btn{display:block;text-align:center;padding:.7rem;border-radius:10px;font-weight:700;font-size:.85rem;text-decoration:none;transition:all .25s;color:#101010}.pc-btn:hover{transform:translateY(-1px);filter:brightness(1.1)}
.view-all-btn{display:inline-flex;align-items:center;gap:.5rem;margin-top:2rem;padding:.65rem 1.5rem;border-radius:10px;background:none;border:1px solid var(--brd2);color:var(--t1);font-weight:700;font-size:.88rem;cursor:pointer;transition:all .25s;font-family:inherit}.view-all-btn:hover{border-color:var(--lima);color:var(--lima);transform:translateY(-1px)}
.about-wrap{display:flex;flex-direction:column;gap:3rem}
.about-story{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start}@media(max-width:768px){.about-story{grid-template-columns:1fr;gap:2rem}}
.about-col p{font-size:.95rem;color:var(--t2);line-height:1.75;margin-bottom:.85rem;font-weight:500}.about-col p strong{color:var(--t1);font-weight:700}.about-col p .lima-hl{color:var(--lima);font-weight:700}
.about-boxes{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem}@media(max-width:768px){.about-boxes{grid-template-columns:1fr}}
.about-box{padding:1.5rem;border-radius:14px;background:var(--card);border:1px solid var(--brd);transition:all .3s}.about-box:hover{border-color:rgba(184,245,0,.15);transform:translateY(-2px)}.about-box-icon{font-size:1.25rem;margin-bottom:.6rem}.about-box h4{font-size:1rem;font-weight:700;margin-bottom:.35rem}.about-box p{font-size:.85rem;color:var(--t2);line-height:1.55;margin:0;font-weight:500}
.about-values-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:.5rem}
.about-val{padding:1.25rem;border-radius:12px;border-left:3px solid var(--lima);background:rgba(184,245,0,.03)}.about-val strong{display:block;font-size:.88rem;font-weight:700;color:var(--t1);margin-bottom:.25rem}.about-val span{font-size:.82rem;color:var(--t2);line-height:1.5}
.cs{text-align:center}.cg{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;margin-top:2rem}.cc{background:var(--card);border:1px solid var(--brd);border-radius:12px;padding:1.25rem 2rem;font-weight:700;font-size:.88rem;color:var(--t3);transition:all .3s}.cc:hover{border-color:rgba(184,245,0,.2);color:var(--t2);transform:translateY(-2px)}
.ctas{text-align:center;padding:5.5rem 2rem 4rem;max-width:650px;margin:0 auto;position:relative;z-index:1}.ctas h2{font-size:clamp(1.8rem,4vw,2.75rem);font-weight:800;letter-spacing:-.025em;margin-bottom:.85rem}.ctas>p{font-size:1rem;color:var(--t2);margin-bottom:2.25rem;line-height:1.6;font-weight:500}
.ctab{display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap}.ctal{display:flex;gap:1.25rem;justify-content:center;flex-wrap:wrap;margin-top:2.5rem}.ctlk{display:flex;align-items:center;gap:.4rem;color:var(--t3);font-size:.82rem;text-decoration:none;font-weight:600;transition:color .2s}.ctlk:hover{color:var(--lima)}
.ftr{border-top:1px solid var(--brd);padding:1.75rem 2rem;text-align:center;position:relative;z-index:1}.ftr p{font-size:.75rem;color:var(--t3);font-weight:500}.ftr a{color:var(--lima);text-decoration:none;font-weight:600}
/* ALL PLANS PAGE */
.allp-back{display:inline-flex;align-items:center;gap:.4rem;background:none;border:none;color:var(--t3);font-size:.85rem;font-weight:600;cursor:pointer;transition:color .2s;margin-bottom:2rem;font-family:inherit;padding:0}.allp-back:hover{color:var(--lima)}
.allp-section{margin-bottom:3.5rem}
.allp-section-hdr{display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;padding-bottom:.75rem;border-bottom:1px solid var(--brd)}
.allp-section-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center}
.allp-section-title{font-size:1.15rem;font-weight:800;letter-spacing:-.01em}
.allp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
.allp-card{background:var(--card);border:1px solid var(--brd);border-radius:12px;padding:1.25rem;transition:all .3s;position:relative;overflow:hidden;display:flex;flex-direction:column}.allp-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--ac)}.allp-card:hover{border-color:rgba(255,255,255,.08);transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.25)}
.allp-card-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:.35rem}
.allp-card h4{font-size:1rem;font-weight:700}.allp-type{font-size:.6rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:.15rem .5rem;border-radius:999px;background:rgba(255,255,255,.06);color:var(--t3)}
.allp-card-tag{display:inline-flex;align-items:center;gap:.25rem;font-size:.6rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin-bottom:.5rem;width:fit-content;padding:.15rem .5rem;border-radius:999px}
.allp-card p{font-size:.82rem;color:var(--t2);line-height:1.5;margin-bottom:.85rem}
.allp-feats{display:flex;flex-direction:column;gap:.4rem;flex:1;margin-bottom:1rem}
.allp-feat{display:flex;align-items:flex-start;gap:.4rem;font-size:.78rem;color:var(--t2);line-height:1.35}
.allp-cta{display:block;text-align:center;padding:.55rem;border-radius:8px;font-weight:700;font-size:.78rem;text-decoration:none;transition:all .25s;border:1px solid}.allp-cta:hover{transform:translateY(-1px)}
`;

// ─── Components ────────────────────────────────────────────────────────────
function ServiceCard({s,onViewPlans}){
  return(
    <div className="sc-card" style={{"--acc":s.color}}>
      <div className="si" style={{background:`${s.color}18`,color:s.color}}>{s.icon}</div>
      <h3>{s.title}</h3><p className="scd">{s.desc}</p>
      <div className="sis">{s.items.map((it,i)=><div key={i} className="sit">{I.check(s.color)}<span>{it}</span></div>)}</div>
      <button className="srv-plan-btn" style={{color:s.color,borderColor:`${s.color}44`,background:`${s.color}10`}} onClick={onViewPlans}>Ver planes {I.arrow(s.color)}</button>
    </div>
  );
}

function PlanCard({p}){
  return(
    <div className="pc" style={{"--plan-c":p.color}}>
      <div className="pc-service" style={{color:p.color}}>{p.service}</div>
      <div className="pc-tag" style={{background:`${p.color}15`,border:`1px solid ${p.color}30`,color:p.color}}><span className="pc-tag-dot" style={{background:p.color}}/>{p.tag}</div>
      <h3>{p.name}</h3><p className="pc-desc">{p.desc}</p>
      <div className="pc-feats">{p.features.map((f,j)=><div key={j} className="pc-feat">{I.check(p.color)}<span>{f}</span></div>)}</div>
      <a href={WA} target="_blank" rel="noopener noreferrer" className="pc-btn" style={{background:p.color}}>Consultá por este plan</a>
    </div>
  );
}

// ─── All Plans Page ───────────────────────────────────────────────────────
function AllPlansPage({onBack}){
  return(
    <div className="sec" style={{paddingTop:"7rem"}}>
      <button className="allp-back" onClick={onBack}>{I.back} Volver a la landing</button>
      <span className="sl">Todos los planes</span>
      <h2 className="stt">Explorá todas nuestras opciones</h2>
      <p className="sd">Cada servicio tiene planes adaptados a tu necesidad. Sin precios en la web — consultá directamente y te armamos algo a medida.</p>
      {allPlans.map((sec,si)=>(
        <div key={si} className="allp-section">
          <div className="allp-section-hdr">
            <div className="allp-section-icon" style={{background:`${sec.color}18`,color:sec.color}}>{sec.icon}</div>
            <span className="allp-section-title" style={{color:sec.color}}>{sec.section}</span>
          </div>
          <div className="allp-grid">
            {sec.plans.map((p,pi)=>(
              <div key={pi} className="allp-card" style={{"--ac":sec.color}}>
                <div className="allp-card-top"><h4>{p.name}</h4><span className="allp-type">{p.type}</span></div>
                {p.tag && <div className="allp-card-tag" style={{background:`${sec.color}15`,color:sec.color}}>{p.tag}</div>}
                <p>{p.desc}</p>
                <div className="allp-feats">{p.features.map((f,fi)=><div key={fi} className="allp-feat">{I.check(sec.color)}<span>{f}</span></div>)}</div>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="allp-cta" style={{color:sec.color,borderColor:`${sec.color}44`,background:`${sec.color}10`}}>Consultar</a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function LimaTechnology(){
  const [mob,setMob]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [page,setPage]=useState("home"); // "home" or "plans"
  const planesRef=useRef(null);
  const typedWord=useTypewriter(heroWords);

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h);
  },[]);

  const scrollToPlanes=useCallback(()=>{
    if(planesRef.current) planesRef.current.scrollIntoView({behavior:"smooth",block:"start"});
  },[]);

  const goToAllPlans=()=>{setPage("plans");window.scrollTo(0,0);};
  const goHome=()=>{setPage("home");window.scrollTo(0,0);};

  if(page==="plans") return(
    <>
      <style>{css}</style>
      <FloatingParticles/>
      <nav className={`nav ${scrolled?"sc":""}`}>
        <a href="#" className="nl" onClick={(e)=>{e.preventDefault();goHome();}}><div className="nl-m">L</div><span className="nl-t">Lima <span>Technology</span></span></a>
        <ul className="nk"><li><button onClick={goHome}>← Volver</button></li></ul>
        <div className="ncw"><a href={WA} target="_blank" rel="noopener noreferrer" className="nc">Contactar</a></div>
        <button className="nm" onClick={goHome}>←</button>
      </nav>
      <AllPlansPage onBack={goHome}/>
      <footer className="ftr"><p>Lima Technology 2025 © — <a href="https://www.instagram.com/limatech_ar/" target="_blank" rel="noopener noreferrer">@limatech_ar</a> — Rosario, Santa Fe</p></footer>
    </>
  );

  return(
    <>
      <style>{css}</style>
      <FloatingParticles/>
      <nav className={`nav ${scrolled?"sc":""} ${mob?"mo":""}`}>
        <a href="#" className="nl"><div className="nl-m">L</div><span className="nl-t">Lima <span>Technology</span></span></a>
        <ul className="nk">
          <li><a href="#servicios" onClick={()=>setMob(false)}>Servicios</a></li>
          <li><a href="#planes" onClick={()=>setMob(false)}>Planes</a></li>
          <li><a href="#nosotros" onClick={()=>setMob(false)}>Nosotros</a></li>
          <li><a href="#clientes" onClick={()=>setMob(false)}>Clientes</a></li>
        </ul>
        <div className="ncw"><a href={WA} target="_blank" rel="noopener noreferrer" className="nc">Contactar</a></div>
        <button className="nm" onClick={()=>setMob(!mob)}>{mob?"✕":"☰"}</button>
      </nav>

      <section className="hero">
        <div className="hp"><span className="hpd"/>Innovación & Seguridad — Rosario, Argentina</div>
        <h1>Aceleramos tu{" "}<span className="tw-word">{typedWord}<span className="tw-cursor"/></span><br/>con tecnología confiable</h1>
        <p className="hs">Sin interrupciones, sin incertidumbre, sin tecnología que te frustra.</p>
        <div className="hb">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="bl-btn">{I.wa} Comencemos</a>
          <a href="#servicios" className="bo">Ver servicios</a>
        </div>
      </section>
      <div className="dv"/>

      <section className="sec" id="servicios">
        <span className="sl">Servicios</span><h2 className="stt">Soluciones integrales para tu negocio</h2>
        <p className="sd">Diseñamos y acompañamos tu transformación digital con herramientas modernas, seguras y accesibles.</p>
        <div className="sg">{services.map((s,i)=><ServiceCard key={i} s={s} onViewPlans={scrollToPlanes}/>)}</div>
      </section>
      <div className="dv"/>

      <section className="sec" id="planes" ref={planesRef}>
        <span className="sl">Planes</span><h2 className="stt">Elegí el plan que mejor se adapte</h2>
        <p className="sd">Nuestros planes destacados por servicio. Consultá por precios y personalización.</p>
        <div className="pg">{featuredPlans.map((p,i)=><PlanCard key={i} p={p}/>)}</div>
        <button className="view-all-btn" onClick={goToAllPlans}>Ver todos los planes {I.arrow()}</button>
      </section>
      <div className="dv"/>

      <section className="sec" id="nosotros">
        <span className="sl">Quiénes somos</span><h2 className="stt">La historia detrás de Lima</h2>
        <div className="about-wrap">
          <div className="about-story">
            <div className="about-col"><p><strong>Lima Technology</strong> es un emprendimiento tecnológico fundado por <span className="lima-hl">Kevin</span>, un profesional con más de 10 años de experiencia en IT, seguridad informática y marketing digital, nacido y criado en Rosario.</p><p>Lima no nació en una oficina ni con un plan de negocios de 40 páginas. Nació de una conversación, de una idea suelta, y fue mutando hasta convertirse en algo con propósito real: acompañar a PyMEs y negocios locales en su crecimiento digital, con la misma dedicación que le pondría el dueño del negocio.</p></div>
            <div className="about-col"><p>Hoy Lima está en plena construcción: consolidando operaciones, estableciendo procesos ágiles y sumando clientes reales con los que trabajamos hombro a hombro.</p><p>No somos una agencia grande que te asigna un ejecutivo de cuenta que no sabe quién sos. Somos un equipo chico que se mete en tu negocio, entiende tu contexto, y trabaja como si la empresa fuera nuestra. Cada decisión que tomamos la tomamos pensando en si realmente te conviene — no en si nos conviene a nosotros.</p></div>
          </div>
          <div className="about-boxes">
            <div className="about-box"><div className="about-box-icon">🎯</div><h4>Misión</h4><p>Ayudar a PyMEs y negocios locales a crecer, digitalizarse y protegerse — con soluciones tecnológicas reales, sin venderles humo. Nos metemos en el negocio del cliente para entender qué necesitan de verdad, no para cerrar una venta.</p></div>
            <div className="about-box"><div className="about-box-icon">🔭</div><h4>Visión</h4><p>Ser el aliado tecnológico de referencia para negocios locales en Argentina — la empresa a la que llaman cuando quieren crecer con tecnología y saben que van a hablar con alguien que entiende su negocio, no solo su problema técnico.</p></div>
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
      <div className="dv"/>

      <section className="sec cs" id="clientes">
        <span className="sl">Clientes</span><h2 className="stt">Confían en nosotros</h2>
        <p className="sd" style={{margin:"0 auto 1.5rem",textAlign:"center"}}>Empresas y profesionales de Rosario que eligieron crecer con Lima Technology.</p>
        <div className="cg"><div className="cc">Beauty La Peluquería</div><div className="cc">La Culpa</div><div className="cc">GEMA</div><div className="cc">Comercios Locales</div><div className="cc">Pymes & Startups</div></div>
      </section>
      <div className="dv"/>

      <section className="ctas" id="contacto">
        <span className="sl">Contacto</span><h2>¿Listo para <span className="hl">crecer</span>?</h2>
        <p>Simplificamos lo complejo. Hacemos que la tecnología sea tu aliada cotidiana.</p>
        <div className="ctab">
          <a href={WA} target="_blank" rel="noopener noreferrer" className="bl-btn">{I.wa} Escribinos por WhatsApp</a>
          <a href="mailto:limatech.ar@gmail.com" className="bo">Enviar email</a>
        </div>
        <div className="ctal">
          <a href="https://www.instagram.com/limatech_ar/" target="_blank" rel="noopener noreferrer" className="ctlk">{I.ig} @limatech_ar</a>
          <a href="mailto:limatech.ar@gmail.com" className="ctlk">{I.mail} limatech.ar@gmail.com</a>
        </div>
      </section>
      <footer className="ftr"><p>Lima Technology 2025 © Todos los derechos reservados — <a href="https://www.instagram.com/limatech_ar/" target="_blank" rel="noopener noreferrer">@limatech_ar</a> — Rosario, Santa Fe</p></footer>
    </>
  );
}
