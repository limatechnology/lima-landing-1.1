"use client";
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
  spark:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 9.5 9.5 2.5-9.5 2.5-2.5 9.5-2.5-9.5-9.5-2.5 9.5-2.5z"/></svg>,
  check:(c)=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c||"#B8F500"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  wa:<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  ig:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  mail:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  arrow:(c)=><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c||"currentColor"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  back:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
};

// ─── Data ──────────────────────────────────────────────────────────────────
const heroWords=["crecimiento","negocio","futuro","pyme","digitalización","ciberseguridad"];
const WA="https://wa.me/5493416139281?text=Hola%2C%20quiero%20asesoramiento%21";
const waplan=(name)=>`https://wa.me/5493416139281?text=${encodeURIComponent(`Hola, quiero asesoramiento sobre el plan ${name}`)}`;

const services=[
  {icon:I.shield,title:"Ciberseguridad",color:"#6C63FF",desc:"Auditamos y protegemos la información de tu negocio: cuentas, accesos, backups, redes y dispositivos.",items:["Auditoría de accesos y permisos","Revisión de backups y recuperación","Análisis de vulnerabilidades básicas","Configuración segura de cuentas y dispositivos"]},
  {icon:I.rocket,title:"Crecimiento Digital",color:"#F5005E",desc:"Automatizaciones, páginas web, email marketing, CRM y estrategia digital. Hacemos que la tecnología trabaje para tu negocio.",items:["Optimización de redes y Google Business","Automatización de WhatsApp e Instagram","Implementación de CRM y herramientas","Estrategia de contenido y posicionamiento"]},
  {icon:I.globe,title:"Sitios Web",color:"#38BDF8",desc:"Creamos sitios modernos, rápidos y optimizados para convertir visitantes en clientes.",items:["Diseño de sitio o landing profesional","Integración con redes y formularios","Optimización básica para buscadores (SEO)","Publicación y puesta online"]},
  {icon:I.monitor,title:"Soporte IT",color:"#0078D4",desc:"Reparaciones, configuraciones y soporte técnico para cuando algo falla o necesita ponerse a punto.",items:["Reparación y optimización de equipos","Revisión completa de red y WiFi","Diagnóstico y mantenimiento preventivo","Instalación y configuración de software"]},
];

const featuredPlans=[
  {name:"Auditoría PyME",service:"Ciberseguridad",color:"#6C63FF",tag:"Servicio potencial",desc:"Protección integral para equipos de 5 a 20 personas. Detectamos todo lo que está en riesgo.",features:["Revisión de cuentas corporativas vs personales","Auditoría de backups y dispositivos","Revisión de permisos y accesos por usuario","Estructura de carpetas y directorio activo","Informe escrito con recomendaciones"]},
  {name:"Presencia Total",service:"Crecimiento Digital",color:"#F5005E",tag:"Servicio potencial",desc:"Estrategia digital completa: automatización, landing, redes y soporte post-entrega.",features:["Configuración de WhatsApp Business + ManyChat","Automatización WA + IG (setup inicial)","Landing page hasta 5 secciones + SEO","CRM: carga, segmentación y listas automáticas","Estrategia digital + 1 mes soporte post-entrega"]},
  {name:"Starter Digital",service:"Crecimiento Digital",color:"#F5005E",tag:"Más elegido",desc:"Setup inicial para digitalizar tu negocio. Todo lo que necesitás para arrancar.",features:["Configuración de WhatsApp Business + ManyChat","Automatización WA setup inicial","CRM: carga y segmentación","Informe inicial de métricas","Soporte post-entrega incluido"]},
];

// All plans for the full plans page
const allPlans = [
  { section: "Ciberseguridad", color: "#6C63FF", icon: I.shield, plans: [
    { name: "Auditoría Micro", type: "Única vez", desc: "Para equipos de 1 a 5 personas.", features: ["Revisión de cuentas (corporativas vs personales)", "Backups y dispositivos", "Redes sociales y WiFi", "Dominio + informe escrito"] },
    { name: "Auditoría PyME", type: "Única vez", tag: "Más elegido", desc: "Para equipos de 5 a 20 personas.", features: ["Todo lo de Auditoría Micro", "Revisión de permisos/accesos por usuario", "Estructura de carpetas", "Directorio activo"] },
    { name: "Capacitación", type: "Add-on", desc: "Taller grupal de concientización.", features: ["1 sesión grupal (hasta 10 personas)", "Estafas, contraseñas, buenas prácticas", "Guía escrita + 30 días de consultas (opcional)"] },
  ]},
  { section: "Crecimiento Digital", color: "#F5005E", icon: I.rocket, plans: [
    { name: "Starter Digital", type: "Única vez", desc: "Setup inicial para digitalizar tu negocio.", features: ["Config WhatsApp Business + ManyChat", "Automatización WA setup inicial", "CRM carga y segmentación", "Informe inicial de métricas"] },
    { name: "Presencia Total", type: "Única vez", tag: "Más elegido", desc: "Estrategia digital completa + landing + automatizaciones.", features: ["Todo lo del Starter Digital", "Automatización IG setup inicial", "Landing page hasta 5 secciones + SEO", "Estrategia digital + revisión de redes", "1 mes de soporte post-entrega"] },
    { name: "Crecimiento Basic", type: "Mensual", desc: "Mantenimiento básico de tu estrategia digital.", features: ["1 difusión ManyChat o email marketing", "1 reunión de seguimiento (1hs)", "Informe mensual de métricas"] },
    { name: "Crecimiento Pro", type: "Mensual", desc: "Crecimiento activo con más difusiones y contenido.", features: ["2 difusiones (ManyChat + email mkt)", "Publicación de hasta 3 piezas en web", "Reunión mensual de seguimiento (2hs)", "Informe mensual de métricas"] },
    { name: "Lima Max", type: "Mensual", tag: "★ Todo en uno", desc: "Mantenimiento web completo + crecimiento digital full.", features: ["Mantenimiento web Pro completo", "2 difusiones + email marketing", "Publicaciones en web + reunión mensual", "Informe mensual completo", "Todo en un solo plan"] },
  ]},
  { section: "Sitios Web", color: "#38BDF8", icon: I.globe, plans: [
    { name: "Landing Page", type: "Única vez", desc: "Sitio web profesional de hasta 5 secciones.", features: ["Diseño + publicación", "SEO básico optimizado", "Integración con WhatsApp", "Revisión de visitas post-entrega"] },
    { name: "Mantenimiento Basic", type: "Mensual", desc: "Tu web siempre actualizada y funcionando.", features: ["Backups mensuales", "Actualización de plugins", "Monitoreo técnico"] },
    { name: "Mantenimiento Pro", type: "Mensual", desc: "Mantenimiento completo + modificaciones.", features: ["Todo lo de Basic", "Modificaciones de contenido", "Popups + upload de imágenes", "Cambios de texto/precios"] },
  ]},
  { section: "Soporte IT", color: "#0078D4", icon: I.monitor, plans: [
    { name: "IT Básico", type: "Mensual", desc: "Soporte remoto para equipos individuales. 3hs/mes.", features: ["3 horas mensuales de soporte", "Solo remoto, prioridad normal", "PCs, notebooks, impresoras", "Software de uso diario"] },
    { name: "IT Pro", type: "Mensual", desc: "Soporte remoto + presencial. 6hs/mes, prioridad alta.", features: ["6 horas mensuales de soporte", "Remoto + presencial programado", "Redes LAN / WiFi básicas", "Prioridad alta en respuesta"] },
    { name: "Servicio Puntual", type: "Por evento", desc: "Solución rápida para problemas específicos.", features: ["Diagnóstico técnico completo", "Resolución de fallas hw/sw", "Optimización de rendimiento", "Recomendaciones post-servicio"] },
  ]},
];

// ─── CSS ───────────────────────────────────────────────────────────────────

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
      <a href={waplan(p.name)} target="_blank" rel="noopener noreferrer" className="pc-btn" style={{background:p.color}}>Consultá por este plan</a>
    </div>
  );
}

// ─── All Plans Page ───────────────────────────────────────────────────────
function AllPlansPage({onBack}){
  return(
    <div className="sec" style={{paddingTop:"8.5rem"}}>
      <button className="allp-back" onClick={onBack}>{I.back} Volver a la landing</button>
      <div style={{marginTop:"1.5rem"}}>
        <span className="sl">Todos los planes</span>
        <h2 className="stt">Explorá todas nuestras opciones</h2>
        <p className="sd">Cada servicio tiene planes adaptados a tu necesidad. Sin precios en la web — consultá directamente y te armamos algo a medida.</p>
      </div>
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
                <a href={waplan(p.name)} target="_blank" rel="noopener noreferrer" className="allp-cta" style={{color:sec.color,borderColor:`${sec.color}44`,background:`${sec.color}10`}}>Consultar</a>
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
      
      <FloatingParticles/>
      <nav className={`nav ${scrolled?"sc":""}`}>
        <a href="#" className="nl" onClick={(e)=>{e.preventDefault();goHome();}}><img src="/LimaTechnology.png" alt="Lima Technology" className="nl-img" /></a>
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
      
      <FloatingParticles/>
      <nav className={`nav ${scrolled?"sc":""} ${mob?"mo":""}`}>
        <a href="#" className="nl"><img src="/LimaTechnology.png" alt="Lima Technology" className="nl-img" /></a>
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
        <div className="hp"><span className="hps">{I.spark}</span> Innovación & Seguridad — Rosario, Argentina</div>
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
