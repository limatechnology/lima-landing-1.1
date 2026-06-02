import os

# 1. Update app/page.js
with open('app/page.js', 'r', encoding='utf-8') as f:
    js = f.read()

tiktok_svg = """  tiktok: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.78-1.15 5.54-3.33 7.31-1.92 1.57-4.62 2.15-7.01 1.4-2.58-.8-4.64-3.08-5.11-5.73-.55-3.08.76-6.41 3.42-7.98 1.88-1.12 4.24-1.31 6.29-.63l-.04 4.12c-1.3-.39-2.8-.24-3.92.51-1.25.84-1.8 2.51-1.22 3.9.52 1.25 1.96 2.05 3.32 1.95 1.52-.1 2.75-1.32 2.89-2.84.06-2.47.01-4.94.03-7.41V.02z"/></svg>,\n"""
# insert tiktok icon in const I
js = js.replace('const I = {\n', 'const I = {\n' + tiktok_svg)

# Replace Seguinos with Seguinos en redes
js = js.replace('<h3>Seguinos</h3>', '<h3>Seguinos en redes</h3>')

tiktok_link = '              <a href="https://www.tiktok.com/@limatech.ar" target="_blank" rel="noopener noreferrer" className="btn-link">{I.tiktok} TikTok</a>\n'
js = js.replace('<a href="https://x.com/limatech_ar"', tiktok_link + '              <a href="https://x.com/limatech_ar"')

with open('app/page.js', 'w', encoding='utf-8') as f:
    f.write(js)

# 2. Update globals.css for cf-select
with open('app/globals.css', 'r', encoding='utf-8') as f:
    css = f.read()

# I will append the cf-select styles at the bottom of the file
css_add = """
.cf-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.2em;
  padding-right: 2.5rem; /* Make sure text doesn't overlap chevron */
}
"""

if '.cf-select {' not in css:
    css += css_add

with open('app/globals.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Applied tweaks successfully!")
