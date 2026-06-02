import os

with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Separar más las redes sociales (ci-socials)
css = css.replace('.ci-socials{display:flex;flex-direction:column;gap:.5rem}', '.ci-socials{display:flex;flex-direction:column;gap:1.25rem}')

# 2. Arreglar el bug del dropdown del navbar (gap invisible)
# Agregamos un ::before invisible al submenu para que el hover no se corte
css_submenu_fix = """
.submenu::before {
  content: '';
  position: absolute;
  top: -25px;
  left: 0;
  width: 100%;
  height: 25px;
  background: transparent;
}
"""
if '.submenu::before' not in css:
    css = css + "\n" + css_submenu_fix

# 3. Animar el dropdown "tranqui" (cf-select)
# Le agregamos transiciones al cf-select
css = css.replace('.cf-select {\n  appearance: none;', '.cf-select {\n  transition: all 0.3s ease;\n  appearance: none;')

# Agregamos los estados focus / hover
css_select_anim = """
.cf-select:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(184, 245, 0, 0.5);
}
.cf-select:focus {
  background-color: rgba(0, 0, 0, 0.2);
  border-color: var(--lima);
  box-shadow: 0 0 15px rgba(184, 245, 0, 0.2);
  outline: none;
  transform: translateY(-2px);
}
"""
if '.cf-select:focus' not in css:
    css = css + "\n" + css_select_anim

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS Tweaks applied successfully!")
