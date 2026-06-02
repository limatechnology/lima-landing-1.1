import os
import re

with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Arreglar btn-primary:hover
# En vez de pisar el background (que rompe botones de otro color), 
# usamos un filter: brightness suave.
primary_hover_search = r'\.btn-primary:hover\s*\{\s*background:\s*#cfff33;[^\}]*\}'
primary_hover_replace = '.btn-primary:hover {\n  filter: brightness(1.15);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);\n}'
css = re.sub(primary_hover_search, primary_hover_replace, css)

# 2. Arreglar btn-outline:hover
# Cambiamos el fondo oscuro por una capa blanca translúcida
outline_hover_search = r'\.btn-outline:hover\s*\{[^\}]*\}'
outline_hover_replace = '.btn-outline:hover {\n  background: rgba(255, 255, 255, 0.1);\n  border-color: var(--lima);\n}'
css = re.sub(outline_hover_search, outline_hover_replace, css)

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Button hovers fixed successfully!")
