# Lima Technology - Guidelines & Design Decisions

Este documento contiene las reglas de arquitectura, decisiones de diseño, y lecciones aprendidas (lo que funciona y lo que **NO** queremos) para la landing page de Lima Technology. Debe ser consultado por la IA y los desarrolladores antes de proponer cambios mayores.

## 1. Identidad Visual y UI
* **Modo Oscuro (Dark Mode):** El diseño base es sobre fondos oscuros (casi negros) para dar un aspecto premium, limpio y tecnológico.
* **Color Principal:** Verde Lima (`--lima`: `#B8F500`).
* **Paleta de Servicios:**
  * Ciberseguridad: Violeta (`#6C63FF`)
  * Crecimiento Digital: Magenta (`#F5005E`)
  * Sitios Web: Celeste (`#38BDF8`)
  * Soporte IT: Azul (`#0078D4`)

## 2. Decisiones sobre Botones y Animaciones

### ✅ Lo que SÍ funciona (MANTENER):
* **Ripples (Ondas) Sensibles al Mouse:** Las animaciones de rellenado en botones *Outline* y *Secondary* deben nacer de forma circular exactamente desde las coordenadas donde se posiciona el mouse. Se logra usando `useEffect` para setear `--x` e `--y` y animando el `width/padding` en CSS.
* **Escala Sutil (Scale):** Para dar sensación táctil a los botones primarios, usamos `transform: scale(1.03)` al hacer hover.
* **Sombras Sutiles:** Usar sombras controladas y suaves (ej. `box-shadow: 0 4px 15px rgba(..., 0.15)`).
* **Transiciones Ágiles:** Las animaciones deben sentirse rápidas y responsivas. El estándar fijado es de `0.25s` para la mayoría de los efectos interactivos. Todo debe ocurrir en sincronía (fondos y sombras inician juntos).

### ❌ Lo que NO queremos (EVITAR ESTRICTAMENTE):
* **NO al Glow Exagerado ("Glow Flashero"):** Bajo ninguna circunstancia utilizar filtros de desenfoque masivos (`filter: blur(14px)`) o sombras enormes que hagan que los botones parezcan antorchas o luces de neón baratas. Ensucian el diseño y restan profesionalidad.
* **NO a la mezcla descoordinada de tiempos:** Evitar que un borde cambie en `0.3s` y la sombra en `0.5s` provocando un efecto "retrasado". Todo el botón debe reaccionar como una unidad.
* **NO CSS Utilities invasivos:** Preferimos mantener el HTML de la landing limpio utilizando clases semánticas de CSS Vainilla (`globals.css`). Evitar dependencias masivas como Tailwind si no son explícitamente requeridas.

## 3. Arquitectura del Código
* **Next.js App Router puro:** La estructura reside en la carpeta `app/`. No buscar ni generar archivos HTML estáticos.
* **Componentización interna:** Dentro de `app/page.js` se mantienen funciones puras como componentes (ej. `ServiceCard`, `PlanCard`) para evitar un archivo inmanejable, pero agrupado lógicamente para facilidad de lectura en landing pages simples.

## 4. Historial de Mantenimiento
* **Junio 2026:** Limpieza profunda de repositorio (eliminación de scripts `.py` huérfanos y archivos `.bak`). Reestructuración visual de botones eliminando brillos agresivos, agregando soporte direccional por cursor en hover y refinando tiempos a 250ms.
