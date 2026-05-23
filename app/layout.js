import './globals.css';
import Script from 'next/script';
import { SITE_URL } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lima Technology | Ciberseguridad y Crecimiento Digital',
    template: '%s | Lima Technology'
  },
  description: 'Expertos en Ciberseguridad, Crecimiento Digital y Sitios Web en Rosario. Soluciones tecnológicas confiables para PyMEs, seguridad de datos y soporte IT.',
  keywords: ['ciberseguridad', 'crecimiento digital', 'digitalizar negocio', 'paginas web rosario', 'soporte IT', 'seguridad informatica', 'auditoria pyme', 'Lima Technology'],
  authors: [{ name: 'Kevin', url: SITE_URL }],
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
    title: 'Lima Technology | Ciberseguridad y Crecimiento Digital',
    description: 'Aceleramos tu crecimiento con tecnología confiable en Rosario. Ciberseguridad, Digitalización y Soporte IT para potenciar tu PyME.',
    url: SITE_URL,
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
    'image': `${SITE_URL}/LimaTechnology.png`,
    'logo': `${SITE_URL}/icon.png`,
    '@id': SITE_URL,
    'url': SITE_URL,
    'telephone': '+5493416139281',
    'email': 'limatech.ar@gmail.com',
    'priceRange': '$$',
    'areaServed': [
      {
        '@type': 'AdministrativeArea',
        'name': 'Rosario'
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Santa Fe'
      },
      {
        '@type': 'AdministrativeArea',
        'name': 'Argentina'
      }
    ],
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
        <Script id="google-tag-manager" src="/js/gtm.js" strategy="afterInteractive" />
        <meta name="theme-color" content="#101010" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJNCKXDR"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
