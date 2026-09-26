import { SITE_URL } from '../../lib/site';
import Navbar from '../../components/Navbar';
import ContactoSection from '../../components/ContactoSection';

export const metadata = {
  title: 'Contacto',
  description: 'Comunicate con el equipo de Lima Technology para asesoramiento técnico y servicios de desarrollo.',
  alternates: {
    canonical: `${SITE_URL}/contacto`,
  },
  openGraph: {
    title: 'Contacto | Lima Technology',
    description: 'Comunicate con el equipo de Lima Technology para asesoramiento técnico y servicios de desarrollo.',
    url: `${SITE_URL}/contacto`,
  },
};

export default function ContactoPage() {
  return (
    <>
      <Navbar isHome={false} />
      <main style={{ paddingTop: '2.5rem', minHeight: '80vh' }}>
        <ContactoSection />
      </main>
      <footer className="ftr">
        <p>Lima Technology 2026 © Todos los derechos reservados</p>
        <p className="ftr-made">Hecho con ♥ en Latinoamérica</p>
      </footer>
    </>
  );
}
