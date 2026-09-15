'use client';
import Navbar           from './components/Navbar';
import HeroSection      from './components/HeroSection';
import StatsSection     from './components/StatsSection';
import NosotrosSection  from './components/NosotrosSection';
import ServiciosSection from './components/ServiciosSection';
import ClientesSection  from './components/ClientesSection';
import ContactoSection  from './components/ContactoSection';
import Footer           from './components/Footer';
import { SiteData } from './types';

const SITE_DATA: SiteData = {
  hero: [
    { id: '1', order: 1, title: 'Servicios Marítimos y Portuarios',         subtitle: 'Vamos por más',                              image: 'https://images.unsplash.com/photo-1504855012953-28b9baada3f6?w=1600&q=80' },
    { id: '2', order: 2, title: 'Puerto Montt — Operaciones de Excelencia', subtitle: 'Estiba, desestiba y logística portuaria',     image: '/puerto.jpg' },
  ],
  sections: [
    { key: 'nosotros',        title: 'Nuestra Historia',   content: 'Servicios Marítimos y Portuarios (SMP), empresa del Grupo B&M Agencia Marítima S.A., se crea el año 1997 en la ciudad de Concepción, bajo el nombre "Estibas y Pacífico Sur S.A.". Su objeto principal fue la estiba y desestiba de naves, como también el transporte y manipuleo de cargas en los puertos del sur de Chile. Con el paso de los años, fue ampliando su presencia al resto del país, tomando el año 2007 su nombre actual (SMP) y expandiendo sus actividades portuarias al bodegaje y servicios logísticos, de modo de aportar cada vez más valor a la industria marítima–portuaria.' },
    { key: 'servicios_intro', title: 'Nuestros Servicios', content: 'Ofrecemos soluciones integrales para la operación portuaria y logística, con personal calificado y equipamiento especializado.' },
    { key: 'clientes_intro',  title: 'Nuestros Clientes',  content: 'Trabajamos con las principales empresas de la industria marítima, fertilizantes, alimentos y energía del país.' },
    { key: 'contacto_intro',  title: 'Contáctenos',        content: 'Estamos disponibles para atender sus requerimientos. Contáctenos y le responderemos a la brevedad.' },
  ],
  services: [
    { id: '1', order: 1, title: 'Muellaje y Estiba',                  subtitle: 'Servicios Portuarios Especializados', description: 'Nos especializamos en actividades esenciales para la operación portuaria, garantizando el flujo eficiente de las cargas y su manejo seguro. Operaciones eficientes para carga general y especializada con equipos y personal calificado. Servicios de amarradores, guardias de portalón y arriendo de espías.', icon: 'anchor' },
    { id: '2', order: 2, title: 'Almacenamiento y Manejo de Cargas', subtitle: 'Logística y Almacenaje',              description: 'Infraestructura especializada con bodegas de más de 28.000 m² en Puerto Montt. Manejo de fertilizantes con mezclas personalizadas y despacho a través de Copeval. Granos de alimento con limpieza, tamizado y despacho en maxi sacos o a granel para industrias salmoneras y ganaderas.', icon: 'warehouse' },
    { id: '3', order: 3, title: 'Servicios Portuarios Integrales',   subtitle: 'Apoyo Logístico Completo',           description: 'Servicios de apoyo logístico en puerto con amarradores y guardias de portalón especializados. Transporte y manipuleo de cargas en puertos del sur de Chile. Soluciones adaptadas a los desafíos del sector marítimo-portuario con cobertura nacional.', icon: 'ship' },
  ],
  clients: [],
  config: {
    site_name:    'SERMAPOR',
    site_tagline: 'Servicios Marítimos y Portuarios',
    phone_1:      '+56 9 92270853',
    phone_2:      '+56 9 85582924',
    email:        'contacto@sermapor.cl',
    website:      'www.sermapor.cl',
    address:      'Puerto Montt, Chile',
    stats_years:  '27',
    stats_ports:  '10',
    stats_m2:     '28861',
    stats_clients:'50',
  },
};

export default function Home() {
  const getSection = (key: string) =>
    SITE_DATA.sections.find(s => s.key === key) ?? { key, title: '', content: '' };

  return (
    <main>
      <Navbar           config={SITE_DATA.config} />
      <HeroSection      slides={SITE_DATA.hero} />
      <StatsSection     config={SITE_DATA.config} />
      <NosotrosSection  section={getSection('nosotros')} />
      <ServiciosSection services={SITE_DATA.services} section={getSection('servicios_intro')} />
      <ClientesSection  clients={SITE_DATA.clients}   section={getSection('clientes_intro')} />
      <ContactoSection  section={getSection('contacto_intro')} config={SITE_DATA.config} />
      <Footer           config={SITE_DATA.config} />
    </main>
  );
}
