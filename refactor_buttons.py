import os

with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Modificar .btn:hover para quitar el filter brightness genérico
# que estaba afectando a todos los botones. Lo pasaremos específico.
css = css.replace('.btn:hover {\n  filter: brightness(1.15);\n  box-shadow: 0 6px 20px rgba(0,0,0,0.5);\n}', '.btn:hover {\n  box-shadow: 0 6px 20px rgba(0,0,0,0.5);\n}')

# 2. .btn-primary:hover -> que se aclare (más brillante)
primary_hover_search = '.btn-primary:hover {\n  background: #a6dd00;\n  \n}'
primary_hover_replace = '.btn-primary:hover {\n  background: #cfff33; /* Más claro */\n  box-shadow: 0 6px 20px rgba(207, 255, 51, 0.3);\n}'
if primary_hover_search in css:
    css = css.replace(primary_hover_search, primary_hover_replace)
else:
    # Just in case it was formatted differently
    css = css.replace('background: #a6dd00;', 'background: #cfff33; box-shadow: 0 6px 20px rgba(207, 255, 51, 0.3);')

# 3. .btn-outline:hover -> que se oscurezca
outline_hover_search = '.btn-outline:hover {\n  background: rgba(184,245,0,0.25);\n  border-color: rgba(184,245,0,0.6);\n}'
outline_hover_replace = '.btn-outline:hover {\n  background: rgba(0, 0, 0, 0.5); /* Oscurece el fondo */\n  border-color: var(--lima);\n  filter: brightness(0.9);\n}'
if outline_hover_search in css:
    css = css.replace(outline_hover_search, outline_hover_replace)

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Button hovers tweaked successfully!")
