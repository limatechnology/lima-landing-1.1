export default function manifest() {
  return {
    name: 'Lima Technology',
    short_name: 'Lima Technology',
    description: 'Ciberseguridad, soporte IT, páginas web y digitalización para PyMEs de Rosario.',
    start_url: '/',
    display: 'standalone',
    background_color: '#010101',
    theme_color: '#101010',
    lang: 'es-AR',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
