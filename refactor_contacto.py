import re
import os

with open('app/page.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add showContacto state
js = js.replace(
    'const [scrolled, setScrolled] = useState(false);',
    'const [scrolled, setScrolled] = useState(false);\n  const [showContacto, setShowContacto] = useState(false);'
)

# 2. Add goToContacto function and update goHome
js = js.replace(
    'const goHome = () => {\n    setShowAllPlans(false);\n    window.scrollTo(0, 0);\n  };\n  const goToAllPlans = () => {\n    setShowAllPlans(true);\n    window.scrollTo(0, 0);\n  };',
    'const goHome = () => {\n    setShowAllPlans(false);\n    setShowContacto(false);\n    window.scrollTo(0, 0);\n  };\n  const goToAllPlans = () => {\n    setShowAllPlans(true);\n    window.scrollTo(0, 0);\n  };\n  const goToContacto = () => {\n    setShowContacto(true);\n    window.scrollTo(0, 0);\n  };'
)

# 3. Add showContacto render block
show_contacto_block = """
  if (showContacto) {
    return (
      <>
        <FloatingParticles />
        <nav className={`nav ${scrolled ? "sc" : ""}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); goHome(); }} className="nl">
            <img src="/LimaTechnology.png" alt="Logo de Lima Technology" className="nl-img" />
          </a>
          <ul className={`nm ${mob ? "o" : ""}`}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goHome(); setMob(false); }}>Inicio</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goHome(); setTimeout(() => { document.getElementById('servicios')?.scrollIntoView({behavior: 'smooth'}); }, 100); setMob(false); }}>Servicios</a></li>
            <li>
              <button className="ndbtn" onClick={() => setSc(!sc)}>Planes ▾</button>
              {sc && (
                <div className="sm">
                  <a href="#" onClick={(e) => { e.preventDefault(); goToAllPlans(); setMob(false); setSc(false); }}>Ver todos los planes</a>
                </div>
              )}
            </li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); goHome(); setTimeout(() => { document.getElementById('nosotros')?.scrollIntoView({behavior: 'smooth'}); }, 100); setMob(false); }}>Nosotros</a></li>
          </ul>
          <button className="btn-menu" onClick={() => setMob(!mob)}>{mob ? "✕" : "☰"}</button>
        </nav>
        <ContactoSection onBack={goHome} />
        <footer className="ftr">
          <p>Lima Technology 2026 © Todos los derechos reservados</p>
          <p className="ftr-made">Hecho con ♥ en Latinoamérica</p>
        </footer>
      </>
    );
  }
"""
js = js.replace('if (showAllPlans) {', show_contacto_block + '\n  if (showAllPlans) {')

# 4. Modify ContactoSection to accept onBack and include a Back button
js = js.replace('function ContactoSection() {', 'function ContactoSection({ onBack }) {')
js = js.replace(
    '<span className="sl">Contacto</span>',
    '<button onClick={onBack} className="btn-link" style={{margin: "0 auto 2rem auto", color: "var(--muted)", textDecoration: "none"}}>{I.back} Volver a la landing</button>\n        <span className="sl">Contacto</span>'
)

# 5. Remove <ContactoSection /> from normal render
# wait, there are two! One in if (showAllPlans) and one in main return!
# In the git log:
#       <AllPlansPage onBack={goHome} />
# +      <ContactoSection />
#       <footer className="ftr">
js = js.replace('<ContactoSection />\n      <footer className="ftr">', '<footer className="ftr">')

# 6. Change navbar links to Contacto
js = js.replace(
    '<li><a href="#contacto" onClick={() => setMob(false)}>Contacto</a></li>',
    '<li><a href="#" onClick={(e) => { e.preventDefault(); goToContacto(); setMob(false); }}>Contacto</a></li>'
)

# 7. Also there might be a bottom CTA link that says 'Contacto' pointing to #contacto
js = js.replace(
    '<a href="#contacto" className="btn btn-primary">Contactar ahora</a>',
    '<a href="#" onClick={(e) => { e.preventDefault(); goToContacto(); }} className="btn btn-primary">Contactar ahora</a>'
)

with open('app/page.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Conditional rendering applied for Contacto")
