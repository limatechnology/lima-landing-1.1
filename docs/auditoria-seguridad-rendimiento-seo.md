# Auditoría: Seguridad, Rendimiento y SEO

**Sitio:** [https://www.limatechnology.com.ar/](https://www.limatechnology.com.ar/)  
**Fecha:** 21 de mayo de 2026  
**Alcance:** Producción (headers, HTML, sitemap, robots) + código del repositorio

---

## Resumen ejecutivo

| Área | Calificación | Estado |
|------|--------------|--------|
| **Seguridad** | **A** (9/10) | Muy sólida; cabeceras OWASP activas en Vercel |
| **SEO** | **7.5/10** | Buena base; hay un problema de dominio www vs sin www |
| **Rendimiento** | **6/10** | Carga rápida en caché, pero la animación canvas pesa mucho en móviles |

---

## Seguridad — **A** en SecurityHeaders.com

La configuración en `next.config.js` está desplegada y activa:

| Cabecera | Estado |
|----------|--------|
| Content-Security-Policy | Presente |
| Strict-Transport-Security | `max-age=63072000; preload` |
| X-Frame-Options | `DENY` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | Presente |
| CORS | Restringido a `https://limatechnology.com.ar` (no `*`) |

El script de CI `scripts/validate-headers.js` pasa todas las comprobaciones.

### Advertencias

1. **`unsafe-inline` en CSP** — Necesario para Next.js App Router; SecurityHeaders capa la nota en A (no A+). Riesgo XSS mitigado, pero no eliminado.
2. **Cabeceras opcionales ausentes** — `Cross-Origin-Opener-Policy`, `Cross-Origin-Embedder-Policy`, `Cross-Origin-Resource-Policy` (mejora defensa en profundidad, no crítico).
3. **`interest-cohort=()`** en Permissions-Policy — API FLoC deprecada; conviene quitarla.

### TLS

Vercel gestiona HTTPS; HSTS con preload está bien configurado.

---

## SEO — **7.5/10**

### Lo que está bien

- Metadata completa en `app/layout.js`: título, descripción, keywords, Open Graph, Twitter Cards.
- **JSON-LD** `LocalBusiness` con teléfono, geo, horarios y redes.
- **Canonical** vía `metadataBase` → `https://www.limatechnology.com.ar`.
- **H1** con texto accesible en `.sr-only` para el typewriter (buena práctica).
- Jerarquía de headings coherente (H1 → H2 → H3).
- `robots.txt` y `sitemap.xml` generados por Next.js.
- Página `/contacto` con metadata propia.
- Imágenes con `alt` descriptivo.

### Problemas a corregir

#### 1. Inconsistencia www vs sin www — **corregido en código**

Se centralizó la URL en `lib/site.js` (`SITE_URL`) y se actualizaron `sitemap.js`, `robots.js`, `layout.js` y CORS en `next.config.js`.

**Pendiente en Vercel:** confirmar que `limatechnology.com.ar` (sin www) redirige con **301** a `www.limatechnology.com.ar`.

#### 2. Página 100% client-side

`app/page.js` tiene `"use client"` en toda la landing. El contenido depende de JavaScript para hidratar. Google lo indexa, pero es peor que Server Components para crawlers y First Contentful Paint.

#### 3. Footer desactualizado — **corregido**

Actualizado a 2026 en `app/page.js` y `app/contacto/page.js`.

#### 4. `icon.png` en metadata

`app/layout.js` referencia `/icon.png`, pero en el repo solo está `favicon.svg`. Verificar que exista en producción y que no devuelva 404.

---

## Rendimiento — **6/10**

En el navegador (con caché de Vercel): DOM ~67 ms, load ~99 ms. Eso no refleja la primera visita real; el cuello de botella está en el cliente.

### Impacto alto

**Animación canvas `FloatingParticles`** (`app/page.js`):

- ~**1.350 partículas** en el orbe + **90 nodos** de fondo.
- `requestAnimationFrame` continuo en toda la visita.
- `backdrop-filter` en nav y en el orbe (costoso en GPU, sobre todo en móviles).

**Recomendaciones:** reducir partículas en móvil (`matchMedia`), pausar cuando la pestaña no está visible (`document.visibilityState`), o desactivar en `prefers-reduced-motion`.

### Impacto medio

| Factor | Detalle |
|--------|---------|
| Google Fonts | `@import` en `globals.css` bloquea render; mejor `next/font` |
| GTM | 16 scripts en página; necesario para analytics, pero penaliza Lighthouse |
| Bundle JS | Toda la landing en un Client Component grande |

### Lo que está bien

- Cache largo para `/_next/static/` (1 año, immutable).
- Gzip en Vercel.
- HTML servido desde CDN (`x-vercel-cache: HIT`).
- Logo ~300 bytes transferidos (bien optimizado).

---

## Acciones priorizadas

| Prioridad | Acción | Impacto |
|-----------|--------|---------|
| Alta | Unificar URLs a `https://www.limatechnology.com.ar` en sitemap y robots | SEO |
| Alta | Reducir/pausar animación canvas en móvil | Rendimiento |
| Media | Migrar fuentes a `next/font` (eliminar `@import`) | Rendimiento |
| Media | Extraer secciones estáticas a Server Components | SEO + rendimiento |
| Baja | Añadir COOP/COEP si se quiere endurecer más | Seguridad |
| Baja | Actualizar copyright a 2026 | Confianza |

---

## Conclusión

Para una landing de PyME, la **seguridad está por encima del promedio**: cabeceras OWASP, CI de auditoría y nota A en SecurityHeaders. El **SEO tiene buena base técnica** (metadata, schema, sitemap), pero la mezcla www/sin-www puede diluir ranking. El **rendimiento** es el punto más débil: la animación premium es visualmente fuerte pero costosa en CPU/GPU y en métricas de Lighthouse móvil.

---

## Referencias

- [SecurityHeaders — www.limatechnology.com.ar](https://securityheaders.com/?q=https://www.limatechnology.com.ar)
- Configuración de cabeceras: `next.config.js`
- Validación CI: `.github/workflows/security.yml`, `scripts/validate-headers.js`
