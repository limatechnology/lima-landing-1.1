const path = require('path');
const nextConfig = require(path.join(__dirname, '../next.config.js'));

async function validate() {
  console.log('=========================================');
  console.log('🛡️  Lima Technology - Auditoría de Seguridad');
  console.log('=========================================\n');

  if (typeof nextConfig.headers !== 'function') {
    throw new Error("❌ Error: next.config.js no exporta una función 'headers' válida.");
  }

  const headersList = await nextConfig.headers();
  const globalRoute = headersList.find(h => h.source === '/:path*');
  if (!globalRoute) throw new Error("❌ Error: No se encontró regla global de cabeceras.");

  const headers = globalRoute.headers;
  const criticalHeaders = {
    'Content-Security-Policy': (val) => {
      const isDevEnv = process.env.NODE_ENV === 'development';
      return val.includes("'unsafe-eval'") && !isDevEnv
        ? "Contiene 'unsafe-eval' fuera de desarrollo."
        : null;
    },
    'X-Frame-Options': (val) => val === 'DENY' || val === 'SAMEORIGIN' ? null : "Debe ser 'DENY' o 'SAMEORIGIN'",
    'X-Content-Type-Options': (val) => val === 'nosniff' ? null : "Debe ser 'nosniff'",
    'Referrer-Policy': (val) => val === 'strict-origin-when-cross-origin' ? null : "Debe ser 'strict-origin-when-cross-origin'",
    'Strict-Transport-Security': (val) => val.includes('max-age=') ? null : "Debe incluir 'max-age='",
    'Permissions-Policy': (val) => !!val ? null : 'Debe estar definida'
  };

  let failed = false;
  console.log('Checking Global Routes security headers...');
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
      failed = true;
    } else {
      console.log(`✓ ${key}: CORRECTA`);
    }
  }

  console.log('\nChecking Cache-Control rules...');
  const cacheRules = [
    { source: '/js/:path*', expected: 'must-revalidate' },
    { source: '/api/:path*', expected: 'no-store' }
  ];
  for (const rule of cacheRules) {
    const route = headersList.find(h => h.source === rule.source);
    const cacheHeader = route && route.headers.find(h => h.key.toLowerCase() === 'cache-control');
    if (!cacheHeader) {
      console.log(`❌ Ruta ${rule.source}: Sin cabecera Cache-Control`);
      failed = true;
    } else if (cacheHeader.value.includes(rule.expected)) {
      console.log(`✓ Ruta ${rule.source}: Cache-Control CORRECTA ("${cacheHeader.value}")`);
    } else {
      console.log(`❌ Ruta ${rule.source}: Cache-Control INCORRECTA`);
      failed = true;
    }
  }

  console.log('\nChecking API CORS rules...');
  const apiRoute = headersList.find(h => h.source === '/api/:path*');
  const apiHeaders = apiRoute ? apiRoute.headers : [];
  for (const key of ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']) {
    const header = apiHeaders.find(h => h.key.toLowerCase() === key.toLowerCase());
    if (!header || !header.value || (key === 'Access-Control-Allow-Origin' && header.value === '*')) {
      console.log(`❌ ${key}: NO DEFINIDA o inválida`);
      failed = true;
    } else {
      console.log(`✓ ${key}: CORRECTA`);
    }
  }

  const customStaticCache = headersList.find(h => h.source === '/_next/static/:path*');
  if (customStaticCache) {
    console.log('❌ Ruta /_next/static/:path*: No debe tener regla custom');
    failed = true;
  } else {
    console.log('✓ Ruta /_next/static/:path*: Sin regla custom');
  }

  console.log('\n=========================================');
  if (failed) {
    console.log('❌ LA AUDITORÍA DE SEGURIDAD HA FALLADO.');
    process.exit(1);
  }
  console.log('🎉 TODAS LAS CABECERAS PASARON LA AUDITORÍA.');
}

validate().catch(err => {
  console.error('\n❌ Error inesperado durante la auditoría:', err.message);
  process.exit(1);
});
