import './globals.css';

export const metadata = {
  metadataBase: new URL('https://limatechnology.com.ar'),
  title: {
    default: 'Lima Technology | Ciberseguridad and Crecimiento Digital en Rosario',
    template: '%s | Lima Technology'
  },
  description: 'Tus expertos en Ciberseguridad, Crecimiento Digital y Sitios Web en Rosario. Soluciones tecnológicas confiables para PyMEs: seguridad de datos, automatización y soporte IT.',
  keywords: ['ciberseguridad', 'crecimiento digital', 'digitalizar negocio', 'paginas web rosario', 'soporte IT', 'seguridad informatica', 'auditoria pyme', 'Lima Technology'],
  authors: [{ name: 'Kevin', url: 'https://limatechnology.com.ar' }],
  creator: 'Lima Technology',
  publisher: 'Lima Technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Lima Technology | Ciberseguridad and Crecimiento Digital',
    description: 'Aceleramos tu crecimiento con tecnología confiable en Rosario. Ciberseguridad, Digitalización y Soporte IT para potenciar tu PyME.',
    url: 'https://limatechnology.com.ar',
    siteName: 'Lima Technology',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/LimaTechnology.png',
        width: 1200,
        height: 630,
        alt: 'Lima Technology - Ciberseguridad y Crecimiento Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lima Technology | Ciberseguridad y Crecimiento Digital',
    description: 'Soluciones tecnológicas confiables para PyMEs en Rosario. Ciberseguridad, Digitalización y Soporte IT.',
    images: ['/LimaTechnology.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Lima Technology',
    'image': 'https://limatechnology.com.ar/LimaTechnology.png',
    '@id': 'https://limatechnology.com.ar',
    'url': 'https://limatechnology.com.ar',
    'telephone': '+5493416139281',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Rosario',
      'addressRegion': 'Santa Fe',
      'addressCountry': 'AR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -32.9575,
      'longitude': -60.6394
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      'opens': '09:00',
      'closes': '18:00'
    },
    'sameAs': [
      'https://www.instagram.com/limatech_ar/',
      'https://x.com/limatech_ar'
    ],
    'description': 'Especialistas en Ciberseguridad, Crecimiento Digital y Desarrollo de Páginas Web en Rosario para PyMEs y emprendedores.'
  };

  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#101010" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
