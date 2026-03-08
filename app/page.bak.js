'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

export default function LimaLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedService, setExpandedService] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const whatsappLink = "https://wa.me/5493416139281?text=Hola%2C%20quiero%20asesoramiento%21";

  // Colores de Lima Technology (BRAND REPORT v2.0)
  const colors = {
    lima: '#B8F500',
    lima_light: '#B8F5A0',
    lima_dark: '#003C00',
    gray_light: '#F5F5F5',
    gray_medium: '#E8E8E8',
    gray_dark_bg: '#1A1A1A',
    gray_alt: '#2A2A2A',
    white: '#FFFFFF',
    black: '#101010',
    ciberseguridad: '#6C63FF',
    crecimiento: '#F5005E',
    soporte_it: '#0078D4',
    sitios_web: '#38BDF8',
  };

  const services = [
    {
      id: 'crecimiento',
      title: 'Crecimiento Digital',
      color: colors.crecimiento,
      description: 'Estrategias integrales para escalar tu negocio en el mundo digital.',
      highlight: 'De startup a empresa consolidada.',
      serviceFeatures: [
        'Desarrollo de marca digital',
        'Estrategia de marketing omnicanal',
        'Gestión de redes sociales',
        'Posicionamiento SEO/SEM',
        'Análisis y reportes'
      ],
      plans: [
        {
          name: 'Paquete Starter',
          type: 'Proyecto',
          price: '$700k',
          highlight: false,
          features: ['Branding básico', 'Setup social media', 'Plan inicial de contenidos']
        },
        {
          name: 'Presencia Total',
          type: 'Proyecto',
          price: '$1M',
          highlight: true,
          features: ['Branding completo', 'Web + redes', 'Estrategia SEO inicial', 'Community manager']
        },
        {
          name: 'Plan Basic',
          type: 'Mensual',
          price: '$120k',
          highlight: false,
          features: ['Social media 3 redes', 'Reportes mensales', 'Soporte por email']
        },
        {
          name: 'Plan Pro',
          type: 'Mensual',
          price: '$250k',
          highlight: true,
          features: ['Todas las redes', 'Campañas SEM', 'Community manager', 'Estrategia SEO', 'Reportes avanzados']
        }
      ]
    },
    {
      id: 'ciberseguridad',
      title: 'Ciberseguridad',
      color: colors.ciberseguridad,
      description: 'Protege tu infraestructura IT de amenazas y vulnerabilidades.',
      highlight: 'Auditoría y protección 360°.',
      serviceFeatures: [
        'Análisis de vulnerabilidades',
        'Auditoría de seguridad',
        'Testing de penetración',
        'Implementación de políticas',
        'Capacitación en seguridad'
      ],
      plans: [
        {
          name: 'Auditoría Micro',
          type: 'Proyecto',
          price: '$180k',
          highlight: false,
          features: ['Para 1-5 usuarios', 'Informe de vulnerabilidades', 'Recomendaciones']
        },
        {
          name: 'Auditoría PyME',
          type: 'Proyecto',
          price: '$350k',
          highlight: true,
          features: ['5-50 usuarios', 'Testing completo', 'Plan de acción', 'Implementación asistida']
        }
      ]
    },
    {
      id: 'soporte-it',
      title: 'Soporte IT',
      color: colors.soporte_it,
      description: 'Soporte técnico 24/7 para tu infraestructura y sistemas.',
      highlight: 'Tu partner IT confiable.',
      serviceFeatures: [
        'Help desk 24/7',
        'Mantenimiento preventivo',
        'Gestión de servidores',
        'Copias de seguridad',
        'Respuesta a incidentes'
      ],
      plans: [
        {
          name: 'Plan Basic',
          type: 'Mensual',
          price: '$118k',
          highlight: false,
          features: ['Help desk por email', 'Mantenimiento básico', 'Soporte horario']
        },
        {
          name: 'Plan Pro',
          type: 'Mensual',
          price: '$255k',
          highlight: true,
          features: ['Help desk 24/7', 'Mantenimiento completo', 'Monitoreo 24/7', 'Reportes mensuales']
        }
      ]
    },
    {
      id: 'sitios-web',
      title: 'Sitios Web',
      color: colors.sitios_web,
      description: 'Desarrollo de sitios web modernos y responsive.',
      highlight: 'Tu presencia digital impactante.',
      serviceFeatures: [
        'Diseño responsive',
        'Desarrollo frontend/backend',
        'Hosting y dominio',
        'SEO técnico',
        'Mantenimiento incluido'
      ],
      plans: [
        {
          name: 'Landing Page',
          type: 'Proyecto',
          price: '$580k',
          highlight: false,
          features: ['1-3 secciones', 'Diseño moderno', 'Formulario de contacto', 'Mobile first']
        },
        {
          name: 'Sitio Completo',
          type: 'Proyecto',
          price: '$1.2M+',
          highlight: true,
          features: ['Múltiples páginas', 'Sistema de blog', 'Carrito de compras', 'Integración de pagos']
        }
      ]
    }
  ];

  const ServiceCard = ({ service }) => {
    const isExpanded = expandedService === service.id;

    const imageMap = {
      'crecimiento': 'undraw_ideas_vn7a_2.png',
      'ciberseguridad': 'undraw_secure-server_lz9x.png',
      'soporte-it': 'undraw_bug-fixing_sgk7_3.png',
      'sitios-web': 'undraw_web-devices_i15y_2.png'
    };

    return (
      <div className="group relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700" style={{backgroundColor: '#1A1A1A'}}>
        <div className="h-1" style={{backgroundColor: service.color}} />

        <div className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-lg flex items-center justify-center min-h-[80px] min-w-[80px]" style={{backgroundColor: service.color + '10'}}>
              <img 
                src={imageMap[service.id]} 
                alt={service.title}
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2" style={{color: colors.lima}}>{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          </div>

          <div className="mb-6 pl-4" style={{borderLeft: `3px solid ${service.color}`}}>
            <p className="text-gray-300 italic text-sm">{service.highlight}</p>
          </div>

          <div className="mb-6">
            <ul className="space-y-2">
              {service.serviceFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span style={{color: service.color}} className="mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setExpandedService(isExpanded ? null : service.id)}
            className="w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors font-semibold text-white"
            style={{backgroundColor: service.color + '20', color: service.color}}
          >
            <span>{isExpanded ? 'Ocultar planes y precios' : 'Ver planes y precios'}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded && (
            <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-2">
              {service.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-lg border-2 transition-all`}
                  style={{borderColor: plan.highlight ? service.color : '#374151', backgroundColor: plan.highlight ? service.color + '15' : '#111827'}}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-gray-100">{plan.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{plan.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{color: service.color}}>{plan.price}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="font-bold mt-0.5" style={{color: service.color}}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{backgroundColor: colors.black, color: colors.white}} className="min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-gray-800" style={{backgroundColor: colors.black}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/lima-logo.png" alt="Lima Technology" className="h-8 w-8" />
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('servicios')} className="text-gray-300 hover:text-white transition">Servicios</button>
            <button onClick={() => scrollToSection('nosotros')} className="text-gray-300 hover:text-white transition">Nosotros</button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" 
               className="px-6 py-2 rounded-lg font-semibold transition-all"
               style={{backgroundColor: colors.lima, color: colors.black}}>
              Contactar
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 p-4 space-y-4" style={{backgroundColor: colors.gray_alt}}>
            <button onClick={() => scrollToSection('servicios')} className="block w-full text-left text-gray-300 hover:text-white">Servicios</button>
            <button onClick={() => scrollToSection('nosotros')} className="block w-full text-left text-gray-300 hover:text-white">Nosotros</button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" 
               className="block w-full text-center px-4 py-2 rounded-lg font-semibold"
               style={{backgroundColor: colors.lima, color: colors.black}}>
              Contactar
            </a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section style={{backgroundColor: colors.black}} className="relative overflow-hidden py-20 md:py-32">
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{pointerEvents: 'none'}}>
          <defs>
            <style>{`
              @keyframes float-up-down {
                0%, 100% { transform: translateY(0px); opacity: 0.5; }
                50% { transform: translateY(-15px); opacity: 0.8; }
              }
              .dot { animation: float-up-down 4s ease-in-out infinite; }
            `}</style>
          </defs>
          {Array.from({length: 171}).map((_, i) => {
            const row = Math.floor(i / 19);
            const col = i % 19;
            const x = (col / 18) * 100;
            const y = (row / 8) * 100;
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r="3"
                fill={colors.lima}
                className="dot"
                style={{animationDelay: `${i * 0.08}s`}}
              />
            );
          })}
        </svg>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Aceleramos tu <span style={{color: colors.lima}}>crecimiento con tecnología confiable</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
            Sin interrupciones, sin incertidumbre, sin tecnología que te frustra.
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all hover:scale-105"
             style={{backgroundColor: colors.lima, color: colors.black}}>
            Comencemos <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{backgroundColor: colors.gray_alt}} className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{color: colors.lima}}>Nuestros Servicios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="nosotros" style={{backgroundColor: colors.black}} className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{color: colors.lima}}>Quiénes Somos</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Lima Technology nace en 2024 como respuesta a la necesidad de empresas y emprendedores en Rosario de tener un partner IT confiable y cercano. 
            Combinamos expertise técnica con entendimiento del negocio local.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Nos especializamos en crecimiento digital, ciberseguridad y soporte IT. Cada proyecto es un compromiso con tu éxito.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{backgroundColor: colors.gray_alt}} className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">¿Listo para crecer?</h2>
          <p className="text-gray-400 text-lg mb-8">Contáctanos sin compromiso y conoce cómo podemos acelerar tu negocio.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
               className="px-8 py-3 rounded-lg font-semibold transition-all"
               style={{backgroundColor: colors.lima, color: colors.black}}>
              WhatsApp
            </a>
            <a href="https://www.instagram.com/limatech_ar/" target="_blank" rel="noopener noreferrer"
               className="px-8 py-3 rounded-lg font-semibold border-2" style={{borderColor: colors.lima}}>
              Instagram
            </a>
            <a href="mailto:limatech.ar@gmail.com"
               className="px-8 py-3 rounded-lg font-semibold border-2" style={{borderColor: colors.lima}}>
              Email
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{backgroundColor: colors.black}} className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Lima Technology. Todos los derechos reservados.</p>
          <p>Rosario, Santa Fe, Argentina</p>
        </div>
      </footer>
    </div>
  );
}
