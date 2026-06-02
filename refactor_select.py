import os
import re

# 1. Eliminar el lift de globals.css y agregar la animación del dropdown
with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Eliminar el transform de cf-select:focus
css = css.replace('  transform: translateY(-2px);\n', '')

# Agregar la animación dropdownFade
if '@keyframes dropdownFade' not in css:
    css += """
@keyframes dropdownFade {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.cf-select.open {
  border-color: var(--lima);
  box-shadow: 0 0 15px rgba(184, 245, 0, 0.2);
}
"""

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)


# 2. Reemplazar <select> nativo por custom select animado en page.js
with open('app/page.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Agregar el estado servOpen
state_search = r'(const \[captcha, setCaptcha\] = useState\(\{ n1: 0, n2: 0, answer: "" \}\);)'
state_replace = r'\1\n  const [servOpen, setServOpen] = useState(false);\n  const servOptions = ["Ciberseguridad", "Crecimiento Digital", "Sitios Web", "Soporte IT", "Otro / Consulta general"];'

js = re.sub(state_search, state_replace, js)

# Reemplazar el bloque de select
select_block_search = r'<select className="cf-input cf-select" name="servicio" value=\{form\.servicio\} onChange=\{handleChange\}>\s*<option value="">Seleccionar\.\.\.</option>\s*<option>Ciberseguridad</option>\s*<option>Crecimiento Digital</option>\s*<option>Sitios Web</option>\s*<option>Soporte IT</option>\s*<option>Otro / Consulta general</option>\s*</select>'

custom_select = """<div style={{ position: "relative" }}>
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
            </div>"""

js = re.sub(select_block_search, custom_select, js)

with open('app/page.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Custom select successfully implemented!")
