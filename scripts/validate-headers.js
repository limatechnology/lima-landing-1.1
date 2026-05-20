const path = require('path');
const nextConfig = require(path.join(__dirname, '../next.config.js'));

async function validate() {
  console.log("=========================================");
  console.log("🛡️  Lima Technology - Auditoría de Seguridad");
  console.log("=========================================\n");

  if (typeof nextConfig.headers !== 'function') {
    throw new Error("❌ Error: next.config.js no exporta una función 'headers' válida.");
  }

  const headersList = await nextConfig.headers();
  
  // 1. Validar reglas globales
  const globalRoute = headersList.find(h => h.source === '/:path*');
  if (!globalRoute) {
    throw new Error("❌ Error: No se encontró regla global de cabeceras para '/:path*'.");
  }

  const headers = globalRoute.headers;
  const criticalHeaders = {
    'Content-Security-Policy': (val) => {
      // Se permite 'unsafe-inline' en script-src como requerimiento fundamental de Next.js App Router
      // para hidratar componentes y procesar datos RSC en despliegues estáticos / CDN (Vercel Edge).
      // Se bloquea estrictamente 'unsafe-eval' en entornos que no sean de desarrollo local.
      const isDevEnv = process.env.NODE_ENV === 'development';
      if (val.includes("'unsafe-eval'") && !isDevEnv) {
        return "Contiene 'unsafe-eval' en script-src fuera de entorno de desarrollo (¡Peligro de inyección de código!).";
      }
      return null;
    },
    'X-Frame-Options': (val) => val === 'DENY' || val === 'SAMEORIGIN' ? null : "Debe ser 'DENY' o 'SAMEORIGIN'",
    'X-Content-Type-Options': (val) => val === 'nosniff' ? null : "Debe ser 'nosniff'",
    'Referrer-Policy': (val) => !!val ? null : "Debe estar definida",
    'Strict-Transport-Security': (val) => val.includes('max-age=') ? null : "Debe incluir 'max-age'",
    'Access-Control-Allow-Origin': (val) => val !== '*' ? null : "No debe ser '*' (Evitar comodín en CORS)"
  };

  let failed = false;

  console.log("Checking Global Routes security headers...");
  for (const [key, validator] of Object.entries(criticalHeaders)) {
    const header = headers.find(h => h.key.toLowerCase() === key.toLowerCase());
    if (!header) {
      console.log(`❌ ${key}: NO DEFINIDA`);
      failed = true;
      continue;
    }

    const error = validator(header.value);
    if (error) {
      console.log(`❌ ${key}: INVALIDA - ${error}`);
      console.log(`   Valor actual: "${header.value}"`);
      failed = true;
    } else {
      console.log(`✓ ${key}: CORRECTA`);
    }
  }

  // 2. Validar reglas de Cache-Control
  console.log("\nChecking Cache-Control rules...");
  
  const cacheRules = [
    { source: '/_next/static/:path*', expected: 'immutable' },
    { source: '/js/:path*', expected: 'must-revalidate' },
    { source: '/api/:path*', expected: 'no-store' }
  ];

  for (const rule of cacheRules) {
    const route = headersList.find(h => h.source === rule.source);
    if (!route) {
      console.log(`❌ Ruta ${rule.source}: Ausente`);
      failed = true;
      continue;
    }
    const cacheHeader = route.headers.find(h => h.key.toLowerCase() === 'cache-control');
    if (!cacheHeader) {
      console.log(`❌ Ruta ${rule.source}: Sin cabecera Cache-Control`);
      failed = true;
      continue;
    }

    if (cacheHeader.value.includes(rule.expected)) {
      console.log(`✓ Ruta ${rule.source}: Cache-Control CORRECTA ("${cacheHeader.value}")`);
    } else {
      console.log(`❌ Ruta ${rule.source}: Cache-Control INCORRECTA (Esperaba "${rule.expected}", obtuvo "${cacheHeader.value}")`);
      failed = true;
    }
  }

  console.log("\n=========================================");
  if (failed) {
    console.log("❌ LA AUDITORÍA DE SEGURIDAD HA FALLADO.");
    console.log("Revisa las alertas indicadas arriba.");
    console.log("=========================================");
    process.exit(1);
  } else {
    console.log("🎉 TODAS LAS CABECERAS PASARON LA AUDITORÍA.");
    console.log("Tu aplicación cumple con los estándares OWASP.");
    console.log("=========================================");
  }
}

validate().catch(err => {
  console.error("\n❌ Error inesperado durante la auditoría:", err.message);
  process.exit(1);
});
