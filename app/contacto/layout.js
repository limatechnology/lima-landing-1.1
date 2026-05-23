export const metadata = {
  title: 'Contacto Profesional y Soporte IT | Lima Technology Rosario',
  description: 'Hablemos de tu proyecto. Contactanos para obtener asesoramiento en Ciberseguridad, Crecimiento Digital, Sitios Web y Soporte IT para PyMEs en Rosario.',
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Contacto | Lima Technology Rosario',
    description: 'Asesoramiento en ciberseguridad, crecimiento digital, sitios web y soporte IT para PyMEs en Rosario.',
    url: '/contacto',
    type: 'website',
    locale: 'es_AR',
    images: [
      {
        url: '/LimaTechnology.png',
        width: 1200,
        height: 630,
        alt: 'Contacto Lima Technology - Rosario',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | Lima Technology Rosario',
    description: 'Asesoramiento en ciberseguridad, digitalización y soporte IT para PyMEs en Rosario.',
    images: ['/LimaTechnology.png'],
  },
};

export default function ContactoLayout({ children }) {
  return children;
}
