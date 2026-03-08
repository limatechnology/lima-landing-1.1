import './globals.css';

export const metadata = {
  title: 'Lima Technology | Transformación Digital y Seguridad',
  description: 'Aceleramos tu crecimiento con tecnología confiable. Ciberseguridad, Crecimiento Digital, Sitios Web y Soporte IT para PyMEs en Rosario, Argentina.',
  keywords: 'ciberseguridad, crecimiento digital, soporte IT, sitios web, Rosario, Argentina, Lima Technology',
  openGraph: {
    title: 'Lima Technology | Transformación Digital y Seguridad',
    description: 'Aceleramos tu crecimiento con tecnología confiable. Sin interrupciones, sin incertidumbre, sin tecnología que te frustra.',
    url: 'https://limatechnology.com.ar',
    siteName: 'Lima Technology',
    locale: 'es_AR',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#101010" />
      </head>
      <body>{children}</body>
    </html>
  );
}
