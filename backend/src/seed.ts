import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from './utils/prisma';

async function main() {
  // Admin user
  const hash = await bcrypt.hash('sermapor2026', 12);
  await prisma.adminUser.upsert({
    where:  { username: 'admin' },
    update: {},
    create: { username: 'admin', passwordHash: hash },
  });

  // Hero slides
  const heroCount = await prisma.heroSlide.count();
  if (heroCount === 0) {
    await prisma.heroSlide.createMany({ data: [
      { order: 1, title: 'Servicios Marítimos y Portuarios', subtitle: 'Vamos por más', image: '/uploads/hero-1.jpg', active: true },
      { order: 2, title: 'Estiba y Desestiba de Excelencia', subtitle: 'Operaciones portuarias especializadas', image: '/uploads/hero-2.jpg', active: true },
      { order: 3, title: 'Logística y Almacenaje',           subtitle: 'Centro logístico en Puerto Montt', image: '/uploads/hero-3.jpg', active: true },
    ]});
  }

  // Secciones
  const sections = [
    { key: 'nosotros', title: 'Nuestra Historia', content: 'Servicios Marítimos y Portuarios (SMP), empresa del Grupo B&M Agencia Marítima S.A., se crea el año 1997 en la ciudad de Concepción, bajo el nombre "Estibas y Pacífico Sur S.A.". Su objeto principal fue la estiba y desestiba de naves, como también el transporte y manipuleo de cargas en los puertos del sur de Chile. Con el paso de los años, fue ampliando su presencia al resto del país, tomando el año 2007 su nombre actual (SMP) y expandiendo sus actividades portuarias al bodegaje y servicios logísticos, de modo de aportar cada vez más valor a la industria marítima–portuaria.' },
    { key: 'servicios_intro', title: 'Nuestros Servicios', content: 'Ofrecemos soluciones integrales para la operación portuaria y logística, con personal calificado y equipamiento especializado.' },
    { key: 'clientes_intro', title: 'Nuestros Clientes', content: 'Trabajamos con las principales empresas de la industria marítima, fertilizantes, alimentos y energía del país.' },
    { key: 'contacto_intro', title: 'Contáctenos', content: 'Estamos disponibles para atender sus requerimientos. Contáctenos y le responderemos a la brevedad.' },
  ];
  for (const s of sections) {
    await prisma.section.upsert({ where: { key: s.key }, update: {}, create: s });
  }

  // Servicios
  const svcCount = await prisma.service.count();
  if (svcCount === 0) await prisma.service.createMany({ data: [
    { order: 1, title: 'Muellaje y Estiba', subtitle: 'Servicios Portuarios Especializados', description: 'Nos especializamos en actividades esenciales para la operación portuaria, garantizando el flujo eficiente de las cargas y su manejo seguro. Operaciones eficientes para carga general y especializada con equipos y personal calificado. Servicios de amarradores, guardias de portalón y arriendo de espías.', icon: 'anchor' },
    { order: 2, title: 'Almacenamiento y Manejo de Cargas', subtitle: 'Logística y Almacenaje', description: 'Infraestructura especializada con bodegas de más de 28.000 m² en Puerto Montt. Manejo de fertilizantes con mezclas personalizadas y despacho a través de Copeval. Granos de alimento con limpieza, tamizado y despacho en maxi sacos o a granel para industrias salmoneras y ganaderas.', icon: 'warehouse' },
    { order: 3, title: 'Servicios Portuarios Integrales', subtitle: 'Apoyo Logístico Completo', description: 'Servicios de apoyo logístico en puerto con amarradores y guardias de portalón especializados. Transporte y manipuleo de cargas en puertos del sur de Chile. Soluciones adaptadas a los desafíos del sector marítimo-portuario con cobertura nacional.', icon: 'ship' },
  ]});

  // Config del sitio
  const configs = [
    ['site_name',    'SERMAPOR'],
    ['site_tagline', 'Servicios Marítimos y Portuarios'],
    ['phone_1',      '+56 9 92270853'],
    ['phone_2',      '+56 9 85582924'],
    ['email',        'contacto@sermapor.cl'],
    ['website',      'www.sermapor.cl'],
    ['address',      'Puerto Montt, Chile'],
    ['stats_years',  '27'],
    ['stats_ports',  '10+'],
    ['stats_m2',     '28.861'],
    ['stats_clients','50+'],
  ];
  for (const [key, value] of configs) {
    await prisma.siteConfig.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  console.log('✅ Seed completado. Admin: admin / sermapor2026');
}

main().catch(console.error).finally(() => prisma.$disconnect());
