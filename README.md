# Lima Technology Landing Page

Landing page para [Lima Technology](https://limatechnology.com.ar) - Transformación Digital y Seguridad.

## Stack
- **Next.js 14** (App Router)
- **React 18**
- **Plus Jakarta Sans** (Google Fonts)
- **Deploy:** Vercel

## Deploy en Vercel

### Opción 1: Desde GitHub (Recomendado)
1. Subí este proyecto a tu repo en GitHub (`lima-technology-landing`)
2. Andá a [vercel.com](https://vercel.com) → New Project
3. Importá el repo
4. Vercel lo detecta como Next.js automáticamente
5. Click en Deploy

### Opción 2: Desde tu terminal
```bash
npm install
npm run dev        # desarrollo local en localhost:3000
npm run build      # build de producción
```

### Subir a GitHub
```bash
git init
git add .
git commit -m "Lima Technology Landing v2"
git remote add origin https://github.com/limatechnology/lima-technology-landing.git
git push -u origin main
```

## Estructura
```
├── app/
│   ├── layout.js      # Layout raíz + SEO metadata
│   ├── page.js        # Landing completa (componente React)
│   └── globals.css    # Reset mínimo
├── public/            # Assets estáticos (logo, favicon, etc)
├── package.json
├── next.config.js
└── .gitignore
```

## Paleta de colores
- Lima (principal): `#B8F500`
- Ciberseguridad: `#6C63FF`
- Crecimiento Digital: `#F5005E`
- Sitios Web: `#38BDF8`
- Soporte IT: `#0078D4`
- Fondo: `#101010`

---
Lima Technology 2025 © Rosario, Santa Fe
