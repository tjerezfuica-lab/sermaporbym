'use strict';

// ===== NAVBAR COMPACTO AL SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('compacto', window.scrollY > 50);
});

// ===== MENÚ HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navPrincipal = document.querySelector('.nav-principal');
hamburger.addEventListener('click', () => navPrincipal.classList.toggle('abierto'));
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navPrincipal.classList.remove('abierto'));
});

// ===== ANIMACIONES DE ENTRADA =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.animar').forEach(el => observer.observe(el));

// ===== FORMULARIO DE CONTACTO =====
const formContacto   = document.getElementById('form-contacto');
const formExito      = document.getElementById('form-exito');
const recaptchaError = document.getElementById('recaptcha-error');
if (formContacto) {
  formContacto.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validar reCAPTCHA
    const captchaResponse = typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse() : '';
    if (!captchaResponse) {
      recaptchaError.classList.add('visible');
      return;
    }
    recaptchaError.classList.remove('visible');

    // Envío exitoso
    formExito.classList.add('visible');
    formContacto.reset();
    if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
    setTimeout(() => formExito.classList.remove('visible'), 5000);
  });
}

// ===== CONTADOR ANIMADO =====
function animarContador(el) {
  const target = parseInt(el.dataset.target, 10);
  const step   = target / (1600 / 16);
  let current  = 0;
  const timer  = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}
const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-numero');
      if (numEl) animarContador(numEl);
      contadorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stat-item').forEach(el => contadorObserver.observe(el));

// ===== MODAL SERVICIOS =====
const serviciosDataI18n = {
  es: {
    estiba: {
      icono: '⚓',
      titulo: 'Servicios de Estiba y Desestiba',
      cuerpo: `<p>Contamos con equipos especializados y personal certificado para la operación eficiente de carga y descarga en los puertos donde operamos.</p>
        <ul>
          <li>Estiba y desestiba de carga general y granel</li>
          <li>Manejo de contenedores y carga project</li>
          <li>Personal operativo certificado y capacitado</li>
          <li>Cumplimiento de normativas IMDG e internacionales</li>
          <li>Operación en múltiples puertos del país</li>
        </ul>`
    },
    portuarios: {
      icono: '🚢',
      titulo: 'Servicios Portuarios',
      cuerpo: `<p>Ofrecemos una gestión integral de las operaciones portuarias, coordinando cada etapa del proceso con eficiencia y seguridad.</p>
        <ul>
          <li>Coordinación y supervisión de faenas portuarias</li>
          <li>Gestión de documentación y manifiestos de carga</li>
          <li>Enlace con autoridades marítimas y aduaneras</li>
          <li>Monitoreo en tiempo real de operaciones</li>
          <li>Atención de naves en puertos del centro y sur de Chile</li>
        </ul>`
    },
    logistica: {
      icono: '📦',
      titulo: 'Logística y Almacenaje',
      cuerpo: `<p>Gestionamos la cadena logística de su carga desde el puerto hasta el destino final, con soluciones de bodegaje y distribución a medida.</p>
        <ul>
          <li>Bodegaje especializado para distintos tipos de carga</li>
          <li>Control y gestión de inventario</li>
          <li>Distribución y transporte terrestre</li>
          <li>Trazabilidad de carga en tiempo real</li>
          <li>Servicios logísticos integrados puerto–destino</li>
        </ul>`
    }
  },
  en: {
    estiba: {
      icono: '⚓',
      titulo: 'Loading & Unloading Services',
      cuerpo: `<p>We have specialized teams and certified personnel for efficient cargo operations at the ports where we operate.</p>
        <ul>
          <li>Loading and unloading of general and bulk cargo</li>
          <li>Container and project cargo handling</li>
          <li>Certified and trained operational staff</li>
          <li>Compliance with IMDG and international regulations</li>
          <li>Operations at multiple ports across the country</li>
        </ul>`
    },
    portuarios: {
      icono: '🚢',
      titulo: 'Port Services',
      cuerpo: `<p>We offer comprehensive management of port operations, coordinating each stage of the process with efficiency and safety.</p>
        <ul>
          <li>Coordination and supervision of port operations</li>
          <li>Cargo documentation and manifest management</li>
          <li>Liaison with maritime and customs authorities</li>
          <li>Real-time operation monitoring</li>
          <li>Vessel assistance at ports in central and southern Chile</li>
        </ul>`
    },
    logistica: {
      icono: '📦',
      titulo: 'Logistics & Storage',
      cuerpo: `<p>We manage the logistics chain from port to final destination, with customized warehousing and distribution solutions.</p>
        <ul>
          <li>Specialized warehousing for different cargo types</li>
          <li>Inventory control and management</li>
          <li>Land distribution and transport</li>
          <li>Real-time cargo tracking</li>
          <li>Integrated port-to-destination logistics</li>
        </ul>`
    }
  },
  de: {
    estiba: {
      icono: '⚓',
      titulo: 'Be- und Entladedienste',
      cuerpo: `<p>Wir verfügen über spezialisierte Teams und zertifiziertes Personal für effiziente Ladevorgänge in den Häfen, in denen wir tätig sind.</p>
        <ul>
          <li>Be- und Entladen von Stück- und Schüttgut</li>
          <li>Container- und Projektfrachtumschlag</li>
          <li>Zertifiziertes und geschultes Betriebspersonal</li>
          <li>Einhaltung von IMDG- und internationalen Vorschriften</li>
          <li>Betrieb in mehreren Häfen des Landes</li>
        </ul>`
    },
    portuarios: {
      icono: '🚢',
      titulo: 'Hafendienste',
      cuerpo: `<p>Wir bieten umfassendes Management der Hafenbetriebe und koordinieren jede Prozessphase mit Effizienz und Sicherheit.</p>
        <ul>
          <li>Koordination und Überwachung des Hafenbetriebs</li>
          <li>Verwaltung von Frachturkunden und Ladungsmanifesten</li>
          <li>Verbindung zu See- und Zollbehörden</li>
          <li>Echtzeit-Betriebsüberwachung</li>
          <li>Schiffsbetreuung in Häfen Mittel- und Südchiles</li>
        </ul>`
    },
    logistica: {
      icono: '📦',
      titulo: 'Logistik & Lagerung',
      cuerpo: `<p>Wir verwalten die Logistikkette vom Hafen bis zum Endbestimmungsort mit maßgeschneiderten Lager- und Vertriebslösungen.</p>
        <ul>
          <li>Spezialisierte Lagerhaltung für verschiedene Frachtarten</li>
          <li>Lagerbestandskontrolle und -verwaltung</li>
          <li>Landverteilung und Transport</li>
          <li>Echtzeit-Frachtüberwachung</li>
          <li>Integrierte Hafen-zu-Ziel-Logistik</li>
        </ul>`
    }
  }
};

let currentLang  = localStorage.getItem('smp-lang') || 'es';
let serviciosData = serviciosDataI18n[currentLang];

const modalOverlay = document.getElementById('modal-overlay');
const modalIcono   = document.getElementById('modal-icono');
const modalTitulo  = document.getElementById('modal-titulo');
const modalCuerpo  = document.getElementById('modal-cuerpo');
const modalCerrar  = document.getElementById('modal-cerrar');

function abrirModal(key) {
  const data = serviciosData[key];
  if (!data) return;
  modalIcono.textContent  = data.icono;
  modalTitulo.textContent = data.titulo;
  modalCuerpo.innerHTML   = data.cuerpo;
  modalOverlay.classList.add('activo');
  document.body.style.overflow = 'hidden';
}
function cerrarModal() {
  modalOverlay.classList.remove('activo');
  document.body.style.overflow = '';
}

document.querySelectorAll('.servicio-card').forEach(card => {
  card.addEventListener('click', () => abrirModal(card.dataset.servicio));
});
modalCerrar.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) cerrarModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarModal(); });

// ===== MODALES EXTRA (BODEGAS / EQUIPOS) =====
const extraModales = {
  bodegas: {
    icono: '🏭',
    titulo: 'Bodegas',
    cuerpo: `
      <p><strong>Bodega N°1</strong></p>
      <ul>
        <li>Superficie: 4.990,83 m²</li>
        <li>Accesos: 2 Portones (1A – 1B)</li>
        <li>Alero N°1: 210 m²</li>
        <li>Alero N°2: 210 m²</li>
      </ul>
      <p><strong>Bodega N°2</strong></p>
      <ul>
        <li>Superficie: 5.693,88 m²</li>
        <li>Accesos: 3 Portones (2A – 2B – 2C)</li>
        <li>Alero: 480 m²</li>
      </ul>
      <p><strong>Bodega N°3</strong></p>
      <ul>
        <li>Superficie: 6.887,35 m²</li>
        <li>Accesos: 3 Portones (3A – 3B – 3C)</li>
        <li>Alero: 210 m²</li>
      </ul>
      <p><strong>Bodega N°4</strong></p>
      <ul>
        <li>Superficie: 5.490 m²</li>
        <li>Accesos: 1 Portón</li>
      </ul>
      <p><strong>Bodega N°5</strong></p>
      <ul>
        <li>Superficie: 1.500 m²</li>
        <li>Accesos: 1 Portón</li>
      </ul>
      <p><strong>Bodega N°6 (Don Gabriel)</strong></p>
      <ul>
        <li>Superficie: 2.400 m²</li>
        <li>Accesos: 2 Portones (6A – 6B)</li>
      </ul>
      <p><strong>Bodega N°7 (Don Gonzalo)</strong></p>
      <ul>
        <li>Superficie: 2.400 m²</li>
        <li>Accesos: 2 Portones (7A – 7B)</li>
      </ul>`
  },
  equipos: {
    icono: '⚙️',
    titulo: 'Equipos e Infraestructura',
    cuerpo: `
      <p><strong>Romanas (02 Unidades)</strong></p>
      <ul>
        <li>Marca: Rice Lake</li>
        <li>Modelo: IQ+355E-2B</li>
        <li>Capacidad Mínima: 10 Kgs</li>
        <li>Capacidad Máxima: 60.000 Kgs</li>
      </ul>
      <p><strong>Equipos Móviles y Producción</strong></p>
      <ul>
        <li>Cargadores Frontales: 4 Equipos</li>
        <li>Grúas Horquillas: 2 Equipos</li>
        <li>Cinta Conveyor: 1 Equipo</li>
        <li>Mezclador Fertilizante: 3 Plantas</li>
        <li>Mezclador Alimento: 1 Planta</li>
        <li>Envasadora Fertilizante: 3 Plantas (Sacos – Maxisacos)</li>
        <li>Envasadora Alimento: 2 Plantas (Sacos – Maxisacos)</li>
        <li>Tornillo de Carga (Rosco): 1 Equipo</li>
      </ul>
      <p><strong>Seguridad</strong></p>
      <ul>
        <li>Circuito Cerrado de T.V.</li>
        <li>Cámaras de Seguridad</li>
      </ul>`
  }
};

document.querySelectorAll('.modal-extra-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const data = extraModales[btn.dataset.modal];
    if (!data) return;
    modalIcono.textContent  = data.icono;
    modalTitulo.textContent = data.titulo;
    modalCuerpo.innerHTML   = data.cuerpo;
    modalOverlay.classList.add('activo');
    document.body.style.overflow = 'hidden';
  });
});

// ===== TABS MAPA =====
const mapaIframe = document.getElementById('mapa-iframe');
document.querySelectorAll('.mapa-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mapa-tab').forEach(t => t.classList.remove('activo'));
    tab.classList.add('activo');
    mapaIframe.src = tab.dataset.src;
  });
});

// ===== SISTEMA DE TRADUCCIÓN (i18n) =====
const translations = {
  es: {
    'nav-inicio':       'Inicio',
    'nav-nosotros':     'Nosotros',
    'nav-servicios':    'Servicios',
    'nav-contacto':     'Contacto',
    'hero-titulo':      'Servicios Marítimos<br /><span class="hero-acento">y Portuarios</span>',
    'hero-slogan':      '"Vamos por más"',
    'hero-desc':        'Más de 25 años de experiencia en estiba, servicios portuarios y logística de cargas en Chile.',
    'hero-btn-servicios': 'Nuestros Servicios',
    'hero-btn-contacto':  'Contáctenos',
    'stat-years':       'Años de Experiencia',
    'stat-ports':       'Puertos en Operación',
    'stat-iso':         'Certificaciones ISO',
    'stat-clients':     'Clientes Destacados',
    'nosotros-eyebrow': 'Quiénes Somos',
    'nosotros-titulo':  'Nuestra Historia',
    'nosotros-p1':      'Servicios Marítimos y Portuarios (SMP), empresa del Grupo B&M Agencia Marítima S.A., se crea el año 1997 en la ciudad de Concepción, bajo el nombre "Estibas y Pacífico Sur S.A.". Su objeto principal fue la estiba y desestiba de naves, como también el transporte y manipuleo de cargas en los puertos del sur de Chile.',
    'nosotros-p2':      'Con el paso de los años, fue ampliando su presencia al resto del país, tomando el año 2007 su nombre actual (SMP) y expandiendo sus actividades portuarias al bodegaje y servicios logísticos, de modo de aportar cada vez más valor a la industria marítima–portuaria.',
    'servicios-eyebrow': 'Lo que hacemos',
    'servicios-titulo':  'Nuestros Servicios',
    'servicios-desc':    'Soluciones integrales para la industria marítima–portuaria en Chile.',
    'estiba-titulo':    'Servicios de Estiba y Desestiba',
    'estiba-desc':      'Operaciones de carga y descarga de naves con personal calificado y certificado.',
    'portuarios-titulo': 'Servicios Portuarios',
    'portuarios-desc':  'Coordinación integral de operaciones en los principales puertos del país.',
    'logistica-titulo': 'Logística y Almacenaje',
    'logistica-desc':   'Soluciones de bodegaje, distribución y trazabilidad de carga a medida.',
    'ver-mas':          'Ver más',
    'contacto-eyebrow': 'Hablemos',
    'contacto-titulo':  'Contáctenos',
    'contacto-desc':    'Estamos disponibles para responder sus consultas y coordinar operaciones.',
    'label-nombre':     'Nombre',
    'ph-nombre':        'Su nombre completo',
    'label-empresa':    'Empresa',
    'ph-empresa':       'Nombre de su empresa',
    'label-email':      'Correo electrónico',
    'ph-email':         'correo@ejemplo.cl',
    'label-telefono':   'Teléfono',
    'ph-telefono':      '+56 9 XXXX XXXX',
    'label-servicio':   'Servicio de interés',
    'opt-default':      'Seleccione un servicio',
    'opt-estiba':       'Estiba y Desestiba',
    'opt-portuarios':   'Servicios Portuarios',
    'opt-logistica':    'Logística y Almacenaje',
    'opt-otro':         'Otro',
    'label-mensaje':    'Mensaje',
    'ph-mensaje':       'Describa su consulta o requerimiento...',
    'btn-submit':       'Enviar mensaje',
    'form-exito':       '✔ Mensaje enviado. Nos pondremos en contacto a la brevedad.',
    'recaptcha-error':  'Por favor confirma que no eres un robot.',
    'datos-direccion':  'Dirección',
    'datos-telefono':   'Teléfono',
    'datos-correo':     'Correo',
  },
  en: {
    'nav-inicio':       'Home',
    'nav-nosotros':     'About Us',
    'nav-servicios':    'Services',
    'nav-contacto':     'Contact',
    'hero-titulo':      'Maritime Services<br /><span class="hero-acento">and Port</span>',
    'hero-slogan':      '"We strive for more"',
    'hero-desc':        'Over 25 years of experience in stevedoring, port services and cargo logistics in Chile.',
    'hero-btn-servicios': 'Our Services',
    'hero-btn-contacto':  'Contact Us',
    'stat-years':       'Years of Experience',
    'stat-ports':       'Ports in Operation',
    'stat-iso':         'ISO Certifications',
    'stat-clients':     'Key Clients',
    'nosotros-eyebrow': 'Who We Are',
    'nosotros-titulo':  'Our History',
    'nosotros-p1':      'Servicios Marítimos y Portuarios (SMP), a company of Grupo B&M Agencia Marítima S.A., was founded in 1997 in the city of Concepción under the name "Estibas y Pacífico Sur S.A.". Its main purpose was the loading and unloading of vessels, as well as the transport and handling of cargo in the ports of southern Chile.',
    'nosotros-p2':      'Over the years, the company expanded its presence throughout the country, adopting its current name (SMP) in 2007 and expanding its port activities to warehousing and logistics services, adding ever greater value to the maritime–port industry.',
    'servicios-eyebrow': 'What We Do',
    'servicios-titulo':  'Our Services',
    'servicios-desc':    'Comprehensive solutions for the maritime–port industry in Chile.',
    'estiba-titulo':    'Loading & Unloading Services',
    'estiba-desc':      'Loading and unloading vessel operations with qualified and certified personnel.',
    'portuarios-titulo': 'Port Services',
    'portuarios-desc':  'Comprehensive coordination of operations at the main ports of the country.',
    'logistica-titulo': 'Logistics & Storage',
    'logistica-desc':   'Custom warehousing, distribution and cargo tracking solutions.',
    'ver-mas':          'Learn more',
    'contacto-eyebrow': "Let's Talk",
    'contacto-titulo':  'Contact Us',
    'contacto-desc':    'We are available to answer your inquiries and coordinate operations.',
    'label-nombre':     'Name',
    'ph-nombre':        'Your full name',
    'label-empresa':    'Company',
    'ph-empresa':       'Your company name',
    'label-email':      'Email',
    'ph-email':         'email@example.com',
    'label-telefono':   'Phone',
    'ph-telefono':      '+56 9 XXXX XXXX',
    'label-servicio':   'Service of interest',
    'opt-default':      'Select a service',
    'opt-estiba':       'Loading & Unloading',
    'opt-portuarios':   'Port Services',
    'opt-logistica':    'Logistics & Storage',
    'opt-otro':         'Other',
    'label-mensaje':    'Message',
    'ph-mensaje':       'Describe your inquiry or requirement...',
    'btn-submit':       'Send message',
    'form-exito':       '✔ Message sent. We will contact you shortly.',
    'recaptcha-error':  'Please confirm you are not a robot.',
    'datos-direccion':  'Address',
    'datos-telefono':   'Phone',
    'datos-correo':     'Email',
  },
  de: {
    'nav-inicio':       'Startseite',
    'nav-nosotros':     'Über uns',
    'nav-servicios':    'Leistungen',
    'nav-contacto':     'Kontakt',
    'hero-titulo':      'Maritime<br /><span class="hero-acento">Hafendienste</span>',
    'hero-slogan':      '"Wir streben nach mehr"',
    'hero-desc':        'Über 25 Jahre Erfahrung in der Stauerei, im Hafenservice und in der Frachtlogistik in Chile.',
    'hero-btn-servicios': 'Unsere Leistungen',
    'hero-btn-contacto':  'Kontakt',
    'stat-years':       'Jahre Erfahrung',
    'stat-ports':       'Häfen in Betrieb',
    'stat-iso':         'ISO-Zertifizierungen',
    'stat-clients':     'Wichtige Kunden',
    'nosotros-eyebrow': 'Wer wir sind',
    'nosotros-titulo':  'Unsere Geschichte',
    'nosotros-p1':      'Servicios Marítimos y Portuarios (SMP), ein Unternehmen der Grupo B&M Agencia Marítima S.A., wurde 1997 in Concepción unter dem Namen „Estibas y Pacífico Sur S.A." gegründet. Hauptzweck war die Be- und Entladung von Schiffen sowie der Transport und die Handhabung von Fracht in den südchilenischen Häfen.',
    'nosotros-p2':      'Im Laufe der Jahre erweiterte das Unternehmen seine Präsenz im ganzen Land, nahm 2007 seinen heutigen Namen (SMP) an und weitete seine Hafentätigkeiten auf Lagerhaltung und Logistikdienstleistungen aus, um der maritimen Hafenwirtschaft einen immer größeren Mehrwert zu bieten.',
    'servicios-eyebrow': 'Was wir tun',
    'servicios-titulo':  'Unsere Leistungen',
    'servicios-desc':    'Umfassende Lösungen für die maritime und hafenwirtschaftliche Industrie in Chile.',
    'estiba-titulo':    'Be- und Entladedienste',
    'estiba-desc':      'Lade- und Löschvorgänge mit qualifiziertem und zertifiziertem Personal.',
    'portuarios-titulo': 'Hafendienste',
    'portuarios-desc':  'Umfassende Koordinierung der Betriebsabläufe in den wichtigsten Häfen des Landes.',
    'logistica-titulo': 'Logistik & Lagerung',
    'logistica-desc':   'Maßgeschneiderte Lagerhaltungs-, Distributions- und Rückverfolgungslösungen.',
    'ver-mas':          'Mehr erfahren',
    'contacto-eyebrow': 'Sprechen wir',
    'contacto-titulo':  'Kontaktieren Sie uns',
    'contacto-desc':    'Wir stehen für Ihre Anfragen und die Koordination von Betriebsabläufen zur Verfügung.',
    'label-nombre':     'Name',
    'ph-nombre':        'Ihr vollständiger Name',
    'label-empresa':    'Unternehmen',
    'ph-empresa':       'Name Ihres Unternehmens',
    'label-email':      'E-Mail',
    'ph-email':         'email@beispiel.de',
    'label-telefono':   'Telefon',
    'ph-telefono':      '+56 9 XXXX XXXX',
    'label-servicio':   'Gewünschte Leistung',
    'opt-default':      'Leistung auswählen',
    'opt-estiba':       'Be- und Entladen',
    'opt-portuarios':   'Hafendienste',
    'opt-logistica':    'Logistik & Lagerung',
    'opt-otro':         'Sonstiges',
    'label-mensaje':    'Nachricht',
    'ph-mensaje':       'Beschreiben Sie Ihre Anfrage...',
    'btn-submit':       'Nachricht senden',
    'form-exito':       '✔ Nachricht gesendet. Wir melden uns in Kürze.',
    'recaptcha-error':  'Bitte bestätige, dass du kein Roboter bist.',
    'datos-direccion':  'Adresse',
    'datos-telefono':   'Telefon',
    'datos-correo':     'E-Mail',
  }
};

function setLanguage(lang) {
  currentLang  = lang;
  serviciosData = serviciosDataI18n[lang];
  const t = translations[lang];

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = t[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = t[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const val = t[el.dataset.i18nPh];
    if (val !== undefined) el.placeholder = val;
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.classList.toggle('activo', opt.dataset.lang === lang);
  });

  localStorage.setItem('smp-lang', lang);
}

// ===== SELECTOR DE IDIOMA =====
const langBtn      = document.getElementById('lang-btn');
const langDropdown = document.getElementById('lang-dropdown');

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle('abierto');
});

document.querySelectorAll('.lang-option').forEach(opt => {
  opt.addEventListener('click', () => {
    setLanguage(opt.dataset.lang);
    langDropdown.classList.remove('abierto');
  });
});

document.addEventListener('click', (e) => {
  if (!document.getElementById('lang-switcher').contains(e.target)) {
    langDropdown.classList.remove('abierto');
  }
});

// Aplicar idioma guardado al cargar
setLanguage(currentLang);

// ===== HERO BACKGROUND SLIDER =====
(function () {
  const slides = document.querySelectorAll('#fondo-global .hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (slides.length < 2) return;
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('activo');
    dots[current].classList.remove('activo');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('activo');
    dots[current].classList.add('activo');
  }

  function autoPlay() { timer = setInterval(() => goTo(current + 1), 5000); }

  dots.forEach(dot => dot.addEventListener('click', () => {
    clearInterval(timer);
    goTo(+dot.dataset.idx);
    autoPlay();
  }));

  autoPlay();
})();
