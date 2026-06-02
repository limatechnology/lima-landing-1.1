import re
import os

with open('app/page.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Eliminar if (page === "contacto") block
contacto_block_regex = r'  if \(page === "contacto"\) return \(\s*<>\s*<FloatingParticles />\s*<nav className=\{`nav \$\{scrolled \? "sc" : ""\}`\}>\s*<a href="#" className="nl" onClick=\{\(e\) => \{ e\.preventDefault\(\); goHome\(\); \}\}>\s*<img src="/LimaTechnology\.png" alt="Logo de Lima Technology - Expertos en Ciberseguridad y Crecimiento Digital" className="nl-img" />\s*</a>\s*</nav>\s*<ContactoSection onBack=\{goHome\} />\s*<footer className="ftr">\s*<p>Lima Technology 2026 ©</p>\s*<p className="ftr-made">Hecho con ♥ en Latinoamérica</p>\s*</footer>\s*</>\s*\);\n\n'
js = re.sub(contacto_block_regex, '', js)

# 2. Reemplazar la sección CTAs original por <ContactoSection />
ctas_section_regex = r'      <section className="ctas" id="contacto">\s*<button onClick=\{onBack\}.*?</button>\s*<span className="sl">Contacto</span>\s*<h2>¿Listo para <span className="hl">dar el paso</span>\?</h2>\s*<p>Trabajamos con vocación y honestidad para que la tecnología sea tu mejor aliada cotidianamente\.</p>\s*<div className="ctab">\s*<a href=\{WA\}.*?</a>\s*</div>\s*<div className="ctal">\s*<a href=.*?</a>\s*<a href=.*?</a>\s*<a href=.*?</a>\s*</div>\s*</section>'
js = re.sub(ctas_section_regex, '      <ContactoSection />', js, flags=re.DOTALL)

# 3. Quitar onBack y botón de ContactoSection
js = js.replace('function ContactoSection({ onBack }) {', 'function ContactoSection() {')
btn_volver_regex = r'<button onClick=\{onBack\}.*?Volver a la landing</button>\n\s*'
js = re.sub(btn_volver_regex, '', js)

# 4. Arreglar link en navbar
js = js.replace(
    '<li><a href="#" onClick={(e) => { e.preventDefault(); goToContacto(); setMob(false); }}>Contacto</a></li>',
    '<li><a href="#contacto" onClick={() => setMob(false)}>Contacto</a></li>'
)

# 5. Borrar goToContacto
js = js.replace('  const goToContacto = () => { setPage("contacto"); window.scrollTo(0, 0); };\n', '')

with open('app/page.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Contacto integrado a la home con éxito!")
