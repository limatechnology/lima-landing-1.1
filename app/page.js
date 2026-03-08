'use client';

import React, { useState } from 'react';
import { Menu, X, ChevronDown, Zap, Lock, Code, Shield, ArrowRight, Check } from 'lucide-react';

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
    green_dark: '#003C00',
    gray_light: '#F5F5F5',
    gray_medium: '#E8E8E8',
    gray_dark_bg: '#1A1A1A',
    white: '#FFFFFF',
    black: '#101010',
    
    ciberseguridad: '#6C63FF',
    crecimiento: '#F5005E',
    sitios_web: '#38BDF8',
    soporte_it: '#0078D4'
  };

  const services = [
    {
      id: 'crecimiento',
      icon: <Zap className="w-8 h-8" />,
      title: 'Crecimiento Digital',
      description: 'Automatizaciones, páginas web, email marketing, CRM y estrategia digital.',
      highlight: 'Hacemos que la tecnología trabaje para tu negocio, no al revés.',
      color: colors.crecimiento,
      image: '📈',
      serviceFeatures: [
        'Optimización de redes y Google Business',
        'Automatización de mensajes y atención',
        'Implementación de CRM y herramientas',
        'Estrategia de contenido y posicionamiento'
      ],
      plans: [
        {
          name: 'Paquete Starter Digital',
          price: '$700.000',
          type: 'única vez',
          features: [
            'Config WhatsApp Business',
            'Automatización WA setup inicial',
            'CRM carga y segmentación',
            'Informe inicial de métricas'
          ]
        },
        {
          name: 'Paquete Presencia Total',
          price: '$1.000.000',
          type: 'única vez',
          highlight: true,
          features: [
            'Todo lo del Starter +',
            'Automatización IG setup inicial',
            'Landing Page (hasta 5 secciones)',
            'Estrategia digital + análisis de redes',
            '1 mes de soporte post-entrega'
          ]
        },
        {
          name: 'Plan Basic',
          price: '$120.000/mes',
          type: 'mensual',
          features: [
            '1 difusión (ManyChat o email)',
            '1 reunión de seguimiento',
            'Informe mensual'
          ]
        },
        {
          name: 'Plan Pro',
          price: '$250.000/mes',
          type: 'mensual',
          features: [
            '2 difusiones (ManyChat + email)',
            'Publicación de hasta 3 piezas en web',
            'Reunión mensual de seguimiento',
            'Informe mensual'
          ]
        }
      ]
    },
    {
      id: 'ciberseguridad',
      icon: <Lock className="w-8 h-8" />,
      title: 'Ciberseguridad',
      description: 'Auditorías y protección de información: cuentas, accesos, backups, redes y dispositivos.',
      highlight: 'Porque un negocio desprotegido es un negocio vulnerable.',
      color: colors.ciberseguridad,
      image: '🔐',
      serviceFeatures: [
        'Auditoría de accesos y permisos',
        'Revisión de backups y recuperación',
        'Análisis de vulnerabilidades básicas',
        'Configuración segura de cuentas y dispositivos'
      ],
      plans: [
        {
          name: 'Auditoría Micro',
          price: '$180.000',
          type: 'única vez',
          features: [
            'Para 1-5 personas',
            'Revisión de cuentas corporativas vs personales',
            'Auditoría de backups y dispositivos',
            'Análisis de WiFi y dominio',
            'Informe escrito'
          ]
        },
        {
          name: 'Auditoría PyME',
          price: '$350.000',
          type: 'única vez',
          features: [
            'Para 5-20 personas',
            'Todo lo anterior +',
            'Revisión completa de permisos y accesos',
            'Análisis de estructura de carpetas',
            'Directorio activo',
            'Informe detallado + recomendaciones'
          ]
        }
      ]
    },
    {
      id: 'soporte-it',
      icon: <Code className="w-8 h-8" />,
      title: 'Soporte IT',
      description: 'Reparaciones, configuraciones y soporte técnico remoto y presencial.',
      highlight: 'Cuando algo falla o necesita ponerse a punto.',
      color: colors.soporte_it,
      image: '🖥�?,
      serviceFeatures: [
        'Reparación y optimización de equipos',
        'Revisión completa de red y WiFi',
        'Diagnóstico y mantenimiento preventivo',
        'Instalación y configuración de software'
      ],
      plans: [
        {
          name: 'Plan Basic',
          price: '$118.000/mes',
          type: 'mensual',
          features: [
            '3 horas incluidas mensuales',
            'Soporte remoto',
            'Consultas técnicas',
            'Equipos: PC, Laptop, Impresoras'
          ]
        },
        {
          name: 'Plan Pro',
          price: '$255.000/mes',
          type: 'mensual',
          features: [
            '6 horas incluidas mensuales',
            'Soporte remoto + presencial programado',
            'Prioridad alta',
            'Soporte para redes LAN/WiFi',
            'Múltiples equipos'
          ]
        }
      ]
    },
    {
      id: 'sitios-web',
      icon: <Shield className="w-8 h-8" />,
      title: 'Presencia Online y Sitios Web',
      description: 'Diseño de sitios profesionales, landing pages y presencia digital optimizada.',
      highlight: 'Tu web es la puerta de entrada de tus clientes.',
      color: colors.sitios_web,
      image: '🌐',
      serviceFeatures: [
        'Diseño de sitio o landing profesional',
        'Integración con redes y formularios',
        'Optimización básica para buscadores',
        'Publicación y puesta online'
      ],
      plans: [
        {
          name: 'Landing Page',
          price: '$580.000',
          type: 'única vez',
          features: [
            'Hasta 5 secciones',
            'Diseño profesional + publicación',
            'SEO básico + integración WhatsApp',
            'Revisión de visitas y análisis'
          ]
        }
      ]
    }
  ];

  const ServiceCard = ({ service }) => {
    const isExpanded = expandedService === service.id;

    // Mapeo de imágenes PNG de Unidraw
    const imageMap = {
      'crecimiento': '/undraw_ideas_vn7a_2.png',
      'ciberseguridad': '/undraw_secure-server_lz9x.png',
      'soporte-it': '/undraw_bug-fixing_sgk7_3.png',
      'sitios-web': '/undraw_web-devices_i15y_2.png'
    };

    return (
      <div className="group relative rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700" style={{backgroundColor: '#1A1A1A'}}>
        {/* Color accent top */}
        <div className="h-1" style={{backgroundColor: service.color}} />

        <div className="p-8">
          {/* Header con imagen PNG */}
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

          {/* Highlight quote */}
          <div className="mb-6 pl-4" style={{borderLeft: `3px solid ${service.color}`}}>
            <p className="text-gray-300 italic text-sm">{service.highlight}</p>
          </div>

          {/* Service Features */}
          <div className="mb-6">
            <ul className="space-y-2">
              {service.serviceFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <span style={{color: service.color}} className="mt-0.5">�?/span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setExpandedService(isExpanded ? null : service.id)}
            className="w-full flex items-center justify-between py-3 px-4 rounded-lg transition-colors font-semibold text-white"
            style={{backgroundColor: service.color + '20', color: service.color}}
          >
            <span>{isExpanded ? 'Ocultar planes y precios' : 'Ver planes y precios'}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {/* Plans - Expandable */}
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
                        <span className="font-bold mt-0.5" style={{color: service.color}}>�?/span>
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
    <div className="min-h-screen" style={{backgroundColor: colors.white}}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b" style={{backgroundColor: colors.black, borderColor: colors.lima + '30'}}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo - Lima Technology */}
          <div className="flex items-center">
            <img 
              src="/lima-logo.png" 
              alt="Lima Technology" 
              className="h-10 w-auto"
            />
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <button onClick={() => scrollToSection('servicios')} style={{color: colors.gray_light}} className="hover:opacity-70 transition">Servicios</button>
            <button onClick={() => scrollToSection('quienes-somos')} style={{color: colors.gray_light}} className="hover:opacity-70 transition">Quiénes Somos</button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-black px-6 py-2 rounded-lg font-semibold transition hover:opacity-90" style={{backgroundColor: colors.lima}}>
              Contactar
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{color: colors.white}}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4 space-y-4" style={{backgroundColor: colors.black, borderColor: colors.lima + '30'}}>
            <button onClick={() => scrollToSection('servicios')} style={{color: colors.gray_light}} className="block w-full text-left py-2">Servicios</button>
            <button onClick={() => scrollToSection('quienes-somos')} style={{color: colors.gray_light}} className="block w-full text-left py-2">Quiénes Somos</button>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full text-black px-6 py-2 rounded-lg font-semibold text-center" style={{backgroundColor: colors.lima}}>
              Contactar
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section - FONDO OSCURO CON PATRÓN 3D OLA + LÍNEAS GAJO DE LIMA */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden" style={{backgroundColor: colors.black}}>
        {/* Patrón 3D animado tipo ola + líneas de conexión */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <style>{`
            @keyframes float-up-down {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(-15px); opacity: 0.8; }
            }
            @keyframes draw-line-1 {
              0% { stroke-dashoffset: 1000; opacity: 0; }
              8% { stroke-dashoffset: 0; opacity: 0.6; }
              35% { stroke-dashoffset: 0; opacity: 0.6; }
              47% { stroke-dashoffset: -1000; opacity: 0; }
              100% { stroke-dashoffset: -1000; opacity: 0; }
            }
            @keyframes draw-line-2 {
              0% { stroke-dashoffset: 1000; opacity: 0; }
              18% { stroke-dashoffset: 0; opacity: 0.6; }
              45% { stroke-dashoffset: 0; opacity: 0.6; }
              57% { stroke-dashoffset: -1000; opacity: 0; }
              100% { stroke-dashoffset: -1000; opacity: 0; }
            }
            @keyframes draw-line-3 {
              0% { stroke-dashoffset: 1000; opacity: 0; }
              28% { stroke-dashoffset: 0; opacity: 0.6; }
              55% { stroke-dashoffset: 0; opacity: 0.6; }
              67% { stroke-dashoffset: -1000; opacity: 0; }
              100% { stroke-dashoffset: -1000; opacity: 0; }
            }
            @keyframes draw-line-4 {
              0% { stroke-dashoffset: 1000; opacity: 0; }
              38% { stroke-dashoffset: 0; opacity: 0.6; }
              65% { stroke-dashoffset: 0; opacity: 0.6; }
              77% { stroke-dashoffset: -1000; opacity: 0; }
              100% { stroke-dashoffset: -1000; opacity: 0; }
            }
            .wave-dot {
              animation: float-up-down 3s ease-in-out infinite;
            }
            .gajo-line {
              stroke-dasharray: 1000;
              stroke-linecap: round;
              filter: drop-shadow(0 0 2px ${colors.lima}40);
            }
            .gajo-1 { animation: draw-line-1 8s ease-in-out infinite; }
            .gajo-2 { animation: draw-line-2 8s ease-in-out infinite; }
            .gajo-3 { animation: draw-line-3 8s ease-in-out infinite; }
            .gajo-4 { animation: draw-line-4 8s ease-in-out infinite; }
          `}</style>

          {/* Puntos fijos rotados 30 grados con movimiento de ola - MÁS DENSOS */}
          <svg className="absolute inset-0 w-full h-full" style={{opacity: 0.6}}>
            {/* Fila 1 */}
            <circle cx="5%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0s'}} />
            <circle cx="10%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.08s'}} />
            <circle cx="15%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.16s'}} />
            <circle cx="20%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.24s'}} />
            <circle cx="25%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.32s'}} />
            <circle cx="30%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.4s'}} />
            <circle cx="35%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="40%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="45%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="50%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="55%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="60%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="65%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="70%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="75%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="80%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="85%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="90%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="95%" cy="10%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />

            {/* Fila 2 */}
            <circle cx="5%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.08s'}} />
            <circle cx="10%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.16s'}} />
            <circle cx="15%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.24s'}} />
            <circle cx="20%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.32s'}} />
            <circle cx="25%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.4s'}} />
            <circle cx="30%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="35%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="40%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="45%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="50%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="55%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="60%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="65%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="70%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="75%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="80%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="85%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="90%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="95%" cy="20%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />

            {/* Fila 3 */}
            <circle cx="5%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.16s'}} />
            <circle cx="10%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.24s'}} />
            <circle cx="15%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.32s'}} />
            <circle cx="20%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.4s'}} />
            <circle cx="25%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="30%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="35%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="40%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="45%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="50%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="55%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="60%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="65%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="70%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="75%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="80%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="85%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="90%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="95%" cy="30%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />

            {/* Fila 4 (Centro) */}
            <circle cx="5%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.24s'}} />
            <circle cx="10%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.32s'}} />
            <circle cx="15%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.4s'}} />
            <circle cx="20%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="25%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="30%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="35%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="40%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="45%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="50%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="55%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="60%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="65%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="70%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="75%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="80%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="85%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="90%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />
            <circle cx="95%" cy="40%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.68s'}} />

            {/* Fila 5 */}
            <circle cx="5%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.32s'}} />
            <circle cx="10%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.4s'}} />
            <circle cx="15%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="20%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="25%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="30%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="35%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="40%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="45%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="50%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="55%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="60%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="65%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="70%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="75%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="80%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="85%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />
            <circle cx="90%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.68s'}} />
            <circle cx="95%" cy="50%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.76s'}} />

            {/* Fila 6 */}
            <circle cx="5%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.4s'}} />
            <circle cx="10%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="15%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="20%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="25%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="30%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="35%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="40%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="45%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="50%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="55%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="60%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="65%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="70%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="75%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="80%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />
            <circle cx="85%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.68s'}} />
            <circle cx="90%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.76s'}} />
            <circle cx="95%" cy="60%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.84s'}} />

            {/* Fila 7 */}
            <circle cx="5%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.48s'}} />
            <circle cx="10%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="15%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="20%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="25%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="30%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="35%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="40%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="45%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="50%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="55%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="60%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="65%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="70%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="75%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />
            <circle cx="80%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.68s'}} />
            <circle cx="85%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.76s'}} />
            <circle cx="90%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.84s'}} />
            <circle cx="95%" cy="70%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.92s'}} />

            {/* Fila 8 */}
            <circle cx="5%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.56s'}} />
            <circle cx="10%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="15%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="20%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="25%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="30%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="35%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="40%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="45%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="50%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="55%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="60%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="65%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="70%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />
            <circle cx="75%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.68s'}} />
            <circle cx="80%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.76s'}} />
            <circle cx="85%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.84s'}} />
            <circle cx="90%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.92s'}} />
            <circle cx="95%" cy="80%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '2s'}} />

            {/* Fila 9 */}
            <circle cx="5%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.64s'}} />
            <circle cx="10%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.72s'}} />
            <circle cx="15%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.8s'}} />
            <circle cx="20%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.88s'}} />
            <circle cx="25%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '0.96s'}} />
            <circle cx="30%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.04s'}} />
            <circle cx="35%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.12s'}} />
            <circle cx="40%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.2s'}} />
            <circle cx="45%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.28s'}} />
            <circle cx="50%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.36s'}} />
            <circle cx="55%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.44s'}} />
            <circle cx="60%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.52s'}} />
            <circle cx="65%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.6s'}} />
            <circle cx="70%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.68s'}} />
            <circle cx="75%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.76s'}} />
            <circle cx="80%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.84s'}} />
            <circle cx="85%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '1.92s'}} />
            <circle cx="90%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '2s'}} />
            <circle cx="95%" cy="90%" r="2" fill={colors.lima} className="wave-dot" style={{animationDelay: '2.08s'}} />

            {/* 4 LÍNEAS - Gajo de Lima (X) SIN CAMBIOS */}
            <line x1="15%" y1="15%" x2="85%" y2="85%" stroke={colors.lima} strokeWidth="2" className="gajo-line gajo-1" />
            <line x1="85%" y1="15%" x2="15%" y2="85%" stroke={colors.lima} strokeWidth="2" className="gajo-line gajo-2" />
            <line x1="50%" y1="10%" x2="50%" y2="90%" stroke={colors.lima} strokeWidth="2" className="gajo-line gajo-3" />
            <line x1="10%" y1="50%" x2="90%" y2="50%" stroke={colors.lima} strokeWidth="2" className="gajo-line gajo-4" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight" style={{color: colors.white}}>
            <span style={{color: colors.lima}}>
              Aceleramos tu crecimiento
            </span>
            <br />
            <span style={{color: colors.white}}>con tecnología confiable</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Sin interrupciones, sin incertidumbre, sin tecnología que te frustra.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:scale-105"
            style={{backgroundColor: colors.lima}}
          >
            Comencemos
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Services Section - GRIS OSCURO */}
      <section id="servicios" className="py-24 px-6" style={{backgroundColor: '#2A2A2A'}}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{color: colors.lima}}>Nuestros Servicios</h2>
            <p className="text-xl" style={{color: colors.gray_light}}>
              Diseñamos y acompañamos tu transformación digital con herramientas modernas, seguras y accesibles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials/Clients - NEGRO */}
      <section className="py-24 px-6" style={{backgroundColor: colors.black}}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8" style={{color: colors.lima}}>Confían en nosotros</h2>
          <p className="text-lg text-gray-300">Empresas y profesionales que transformaron su negocio con Lima Technology.</p>
        </div>
      </section>

      {/* Quiénes Somos - GRIS OSCURO */}
      <section id="quienes-somos" className="py-24 px-6" style={{backgroundColor: '#2A2A2A'}}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{color: colors.lima}}>Quiénes Somos</h2>
            <p className="text-lg" style={{color: colors.gray_light}}>Impulsamos la tecnología que transforma tu negocio.</p>
          </div>

          <div className="space-y-8 text-lg leading-relaxed" style={{color: colors.gray_light}}>
            <p className="text-xl font-semibold italic" style={{color: colors.lima}}>
              "Lima no nació en una oficina ni con un plan de negocios de 40 páginas. Nació de una conversación, de una idea suelta, y fue mutando hasta convertirse en algo con propósito real."
            </p>

            <p>
              <strong>Lima Technology</strong> es un emprendimiento tecnológico fundado por Kevin, un profesional con más de 10 años de experiencia en IT, seguridad informática y marketing digital, <strong>nacido y criado en Rosario</strong>.
            </p>

            <p>
              Nuestro objetivo es simple pero poderoso: <strong>acompañar a PyMEs y negocios locales en su crecimiento digital</strong>, con la misma dedicación que le pondría el dueño del negocio.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 rounded-xl border-l-4" style={{backgroundColor: colors.black, borderColor: colors.lima}}>
                <h3 className="text-xl font-bold mb-3" style={{color: colors.lima}}>Nuestra Misión</h3>
                <p style={{color: colors.gray_light}}>
                  Simplificar lo complejo. Hacemos que la tecnología sea una aliada cotidiana, accesible y alineada con tus objetivos.
                </p>
              </div>

              <div className="p-8 rounded-xl border-l-4" style={{backgroundColor: colors.black, borderColor: colors.green_dark}}>
                <h3 className="text-xl font-bold mb-3" style={{color: colors.lima}}>Nuestros Valores</h3>
                <ul className="space-y-2" style={{color: colors.gray_light}}>
                  <li><strong>Honestidad:</strong> Si algo no lo necesitás, te lo decimos.</li>
                  <li><strong>Compromiso real:</strong> Nos metemos en tu negocio como si fuera el nuestro.</li>
                  <li><strong>Simplicidad:</strong> Tecnología que se entiende y se usa.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - NEGRO */}
      <section className="py-16 px-6" style={{backgroundColor: colors.black}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6" style={{color: colors.white}}>¿Listo para transformar tu negocio?</h2>
          <p className="text-xl mb-8" style={{color: colors.gray_light}}>
            Hablemos sobre cómo Lima Technology puede ayudarte a crecer.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-lg font-bold text-lg transition hover:opacity-90"
            style={{backgroundColor: colors.lima, color: colors.black}}
          >
            Enviar mensaje por WhatsApp
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-400 py-12 px-6 border-t" style={{backgroundColor: colors.black, borderColor: colors.lima + '30'}}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">Lima Technology</h3>
              <p className="text-sm">Transformación digital y seguridad para tu negocio.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Conecta</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.instagram.com/limatech_ar/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="https://x.com/limatech_ar" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Twitter / X</a></li>
                <li><a href="mailto:limatech.ar@gmail.com" className="hover:text-white transition">Email</a></li>
                <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Ubicación</h3>
              <p className="text-sm">Rosario, Santa Fe, Argentina</p>
            </div>
          </div>

          <div className="pt-8 text-center text-sm" style={{borderColor: colors.lima + '30', borderTop: `1px solid ${colors.lima}30`}}>
            <p>© 2025 Lima Technology. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
