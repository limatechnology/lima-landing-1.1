"use client";
import { useState, useEffect } from "react";

// Icons used in ContactoSection
const I = {
  wa: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
  ig: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
  x: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>,
  threads: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" /></svg>,
  tiktok: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.62 2.15-7.01 1.4-2.58-.8-4.64-3.08-5.11-5.73-.55-3.08.76-6.41 3.42-7.98 1.88-1.12 4.24-1.31 6.29-.63l-.04 4.12c-1.3-.39-2.8-.24-3.92.51-1.25.84-1.8 2.51-1.22 3.9.52 1.25 1.96 2.05 3.32 1.95 1.52-.1 2.75-1.32 2.89-2.84.06-2.47.01-4.94.03-7.41V.02z"/></svg>,
};

// Flag SVGs (cross-platform compatible, rendered directly on Windows, macOS, Linux, iOS & Android)
const FlagAR = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="5" fill="#74ACDF"/><rect y="5" width="20" height="5" fill="#FFFFFF"/><rect y="10" width="20" height="5" fill="#74ACDF"/><circle cx="10" cy="7.5" r="1.5" fill="#F6B40E"/><circle cx="10" cy="7.5" r="0.8" fill="#85340A"/></svg>;
const FlagBO = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="5" fill="#D52B1E"/><rect y="5" width="20" height="5" fill="#FCD116"/><rect y="10" width="20" height="5" fill="#007934"/></svg>;
const FlagBR = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="15" fill="#009739"/><polygon points="10,2 18,7.5 10,13 2,7.5" fill="#FEDD00"/><circle cx="10" cy="7.5" r="2.7" fill="#012169"/></svg>;
const FlagCL = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="7.5" fill="#FFFFFF"/><rect y="7.5" width="20" height="7.5" fill="#D52B1E"/><rect width="7.5" height="7.5" fill="#0039A6"/><polygon points="3.75,2 4.2,3.3 5.5,3.3 4.5,4.1 4.9,5.3 3.75,4.5 2.6,5.3 3,4.1 2,3.3 3.3,3.3" fill="#FFFFFF"/></svg>;
const FlagCO = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="7.5" fill="#FCD116"/><rect y="7.5" width="20" height="3.75" fill="#003893"/><rect y="11.25" width="20" height="3.75" fill="#CE1126"/></svg>;
const FlagCR = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="15" fill="#002B7F"/><rect y="2.5" width="20" height="10" fill="#FFFFFF"/><rect y="5" width="20" height="5" fill="#CE1126"/></svg>;
const FlagEC = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="7.5" fill="#FFDD00"/><rect y="7.5" width="20" height="3.75" fill="#034EA2"/><rect y="11.25" width="20" height="3.75" fill="#ED1C24"/><ellipse cx="10" cy="7.5" rx="1.5" ry="1.8" fill="#B38600"/></svg>;
const FlagES = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="15" fill="#AA151B"/><rect y="3.75" width="20" height="7.5" fill="#F1BF00"/><circle cx="5" cy="7.5" r="1.3" fill="#AA151B"/></svg>;
const FlagUS = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="15" fill="#B22234"/><rect y="2.3" width="20" height="2.3" fill="#FFFFFF"/><rect y="6.9" width="20" height="2.3" fill="#FFFFFF"/><rect y="11.5" width="20" height="2.3" fill="#FFFFFF"/><rect width="8" height="8" fill="#3C3B6E"/></svg>;
const FlagMX = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="6.67" height="15" fill="#006847"/><rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/><rect x="13.34" width="6.67" height="15" fill="#CE1126"/><circle cx="10" cy="7.5" r="1.2" fill="#7D4900"/></svg>;
const FlagPA = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="10" height="7.5" fill="#FFFFFF"/><rect x="10" width="10" height="7.5" fill="#D21034"/><rect y="7.5" width="10" height="7.5" fill="#005293"/><rect x="10" y="7.5" width="10" height="7.5" fill="#FFFFFF"/><polygon points="5,2 5.5,3.3 6.8,3.3 5.7,4.1 6.1,5.3 5,4.5 3.9,5.3 4.3,4.1 3.2,3.3 4.5,3.3" fill="#005293"/><polygon points="15,9.5 15.5,10.8 16.8,10.8 15.7,11.6 16.1,12.8 15,12 13.9,12.8 14.3,11.6 13.2,10.8 14.5,10.8" fill="#D21034"/></svg>;
const FlagPY = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="5" fill="#D52B1E"/><rect y="5" width="20" height="5" fill="#FFFFFF"/><rect y="10" width="20" height="5" fill="#0038A8"/><circle cx="10" cy="7.5" r="1.2" fill="#D52B1E"/></svg>;
const FlagPE = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="6.67" height="15" fill="#D91023"/><rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/><rect x="13.34" width="6.67" height="15" fill="#D91023"/></svg>;
const FlagUY = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="15" fill="#FFFFFF"/><rect y="1.67" width="20" height="1.67" fill="#0038A8"/><rect y="5.01" width="20" height="1.67" fill="#0038A8"/><rect y="8.35" width="20" height="1.67" fill="#0038A8"/><rect y="11.69" width="20" height="1.67" fill="#0038A8"/><rect width="7.5" height="7.5" fill="#FFFFFF"/><circle cx="3.75" cy="3.75" r="1.8" fill="#FCD116"/></svg>;
const FlagVE = <svg width="20" height="15" viewBox="0 0 20 15" style={{ borderRadius: '2px', flexShrink: 0 }}><rect width="20" height="5" fill="#FCE300"/><rect y="5" width="20" height="5" fill="#00247D"/><rect y="10" width="20" height="5" fill="#CF142B"/><circle cx="8" cy="7.5" r="0.4" fill="#FFFFFF"/><circle cx="9.3" cy="6.8" r="0.4" fill="#FFFFFF"/><circle cx="10.7" cy="6.8" r="0.4" fill="#FFFFFF"/><circle cx="12" cy="7.5" r="0.4" fill="#FFFFFF"/></svg>;

const countries = [
  { name: "Argentina", code: "+54", flag: FlagAR },
  { name: "Bolivia", code: "+591", flag: FlagBO },
  { name: "Brasil", code: "+55", flag: FlagBR },
  { name: "Chile", code: "+56", flag: FlagCL },
  { name: "Colombia", code: "+57", flag: FlagCO },
  { name: "Costa Rica", code: "+506", flag: FlagCR },
  { name: "Ecuador", code: "+593", flag: FlagEC },
  { name: "España", code: "+34", flag: FlagES },
  { name: "Estados Unidos", code: "+1", flag: FlagUS },
  { name: "México", code: "+52", flag: FlagMX },
  { name: "Panamá", code: "+507", flag: FlagPA },
  { name: "Paraguay", code: "+595", flag: FlagPY },
  { name: "Perú", code: "+51", flag: FlagPE },
  { name: "Uruguay", code: "+598", flag: FlagUY },
  { name: "Venezuela", code: "+58", flag: FlagVE },
];

export default function ContactoSection() {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", servicio: "", mensaje: "" });
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [telefonoInput, setTelefonoInput] = useState("");
  const [errors, setErrors] = useState({});
  const [captcha, setCaptcha] = useState({ n1: 0, n2: 0, answer: "" });
  const [servOpen, setServOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const servOptions = ["Ciberseguridad", "Crecimiento Digital", "Sitios Web", "Soporte IT", "Otro / Consulta general"];

  useEffect(() => {
    setCaptcha({ n1: Math.floor(Math.random() * 9) + 1, n2: Math.floor(Math.random() * 9) + 1, answer: "" });
    
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
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    setTelefonoInput(raw);
    if (errors.telefono) {
      setErrors({ ...errors, telefono: "" });
    }
    const cleanNum = raw.trim();
    const combined = cleanNum ? `${selectedCountry.code} ${cleanNum}` : "";
    setForm(prev => ({ ...prev, telefono: combined }));
  };

  const handleCountrySelect = (c) => {
    setSelectedCountry(c);
    setCountryOpen(false);
    const cleanNum = telefonoInput.trim();
    const combined = cleanNum ? `${c.code} ${cleanNum}` : "";
    setForm(prev => ({ ...prev, telefono: combined }));
  };

  const handleAction = async (e, action) => {
    e.preventDefault();
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
    setIsSubmitting(true);
    setSubmitSuccess(false);

    if (action === 'wa') {
      const WA = "https://wa.me/5493416139281";
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
      window.open(`${WA}?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      setForm({ nombre: "", email: "", telefono: "", servicio: "", mensaje: "" });
      setTelefonoInput("");
      setSelectedCountry(countries[0]);
      setCaptcha({ n1: Math.floor(Math.random() * 9) + 1, n2: Math.floor(Math.random() * 9) + 1, answer: "" });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: cleanNombre,
          email: cleanEmail,
          telefono: cleanTelefono,
          servicio: cleanServicio,
          mensaje: sanitizedMensaje
        })
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setForm({ nombre: "", email: "", telefono: "", servicio: "", mensaje: "" });
        setTelefonoInput("");
        setSelectedCountry(countries[0]);
        setCaptcha({ n1: Math.floor(Math.random() * 9) + 1, n2: Math.floor(Math.random() * 9) + 1, answer: "" });
      } else {
        const data = await res.json();
        setErrors({ general: data.error || "Error al enviar el mensaje. Intenta nuevamente." });
      }
    } catch (err) {
      setErrors({ general: "Error de conexión. Intenta nuevamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="sec">
      <div className="ct-hero" style={{marginBottom: "3.5rem", textAlign: "center"}}>
        <span className="sl">Contacto</span>
        <h2 className="stt">Hablemos de tu <span className="hl">proyecto</span></h2>
        <p className="sd" style={{margin: "0 auto"}}>Completá el formulario y elegí si preferís contactarnos por Email o WhatsApp.</p>
      </div>

      <div className="ct-grid">
        <form className="ct-form" method="POST" onSubmit={(e) => handleAction(e, 'email')}>
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
            <div style={{ display: "flex", gap: "0.5rem", position: "relative" }}>
              <div style={{ position: "relative", flex: "0 0 auto", minWidth: "165px" }}>
                <div 
                  className={`cf-input cf-select ${countryOpen ? "open" : ""}`}
                  onClick={() => setCountryOpen(!countryOpen)}
                  style={{
                    cursor: "pointer",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 2.4rem 0.75rem 0.85rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  {selectedCountry.flag}
                  <span style={{ fontSize: "0.9rem" }}>{selectedCountry.name} ({selectedCountry.code})</span>
                </div>

                {countryOpen && (
                  <div style={{ position: "fixed", inset: 0, zIndex: 9 }} onClick={() => setCountryOpen(false)} />
                )}

                {countryOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0,
                    width: "max-content", minWidth: "100%", maxWidth: "280px", maxHeight: "220px",
                    overflowY: "auto",
                    background: "#1a1a1a", border: "1px solid #333", borderRadius: "8px", 
                    marginTop: "4px", zIndex: 10,
                    animation: "dropdownFade 0.2s ease forwards",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                  }}>
                    {countries.map(c => (
                      <div 
                        key={c.name}
                        onClick={() => handleCountrySelect(c)}
                        style={{
                          padding: "9px 12px", cursor: "pointer", transition: "background 0.2s",
                          color: selectedCountry.name === c.name ? "#B8F500" : "#fff",
                          fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.5rem"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                        onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        {c.flag}
                        <span style={{ flex: 1 }}>{c.name}</span>
                        <span style={{ color: "var(--t3)", fontSize: "0.82rem" }}>{c.code}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input 
                className="cf-input" 
                type="tel"
                name="telefono" 
                value={telefonoInput} 
                onChange={handlePhoneChange} 
                placeholder="Ej: 341 000 0000" 
                style={{
                  flex: 1,
                  minWidth: 0,
                  ...(errors.telefono ? { borderColor: "#ff4a4a" } : {})
                }} 
              />
            </div>
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
          {errors.general && <div style={{ color: "#ff4a4a", marginBottom: "1rem", fontSize: "0.9rem" }}>{errors.general}</div>}
          {submitSuccess && (
            <div style={{ background: "rgba(184, 245, 0, 0.1)", border: "1px solid rgba(184, 245, 0, 0.3)", color: "#B8F500", padding: "1rem", borderRadius: "8px", marginBottom: "1rem", textAlign: "center" }}>
              ¡Mensaje recibido con éxito! Te responderemos a la brevedad.
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button type="submit" onClick={(e) => handleAction(e, 'email')} className="btn btn-primary" disabled={isSubmitting} style={{ flex: 1, minWidth: '200px', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? "Enviando..." : "Enviar por Email"}
            </button>
            <button type="button" onClick={(e) => handleAction(e, 'wa')} className="btn btn-secondary" style={{ flex: 1, minWidth: '200px', backgroundColor: '#25D366', color: '#000', border: 'none' }}>
              {I.wa} Enviar por WhatsApp
            </button>
          </div>
          <p className="cf-note">Tus datos están seguros. Te responderemos a la brevedad por el canal que elijas.</p>
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
