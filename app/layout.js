import './globals.css'

export const metadata = {
  title: 'Lima Technology | Crecimiento Digital y Ciberseguridad',
  description: 'Transformación digital, ciberseguridad y soporte IT para PyMEs en Rosario, Argentina',
  keywords: 'crecimiento digital, ciberseguridad, soporte IT, landing page, Rosario',
  openGraph: {
    title: 'Lima Technology',
    description: 'Aceleramos tu crecimiento con tecnología confiable',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
