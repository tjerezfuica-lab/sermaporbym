/* =========================================================
   SERMAPOR — main.js
   ========================================================= */

// ── Año en footer ────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Smooth scroll ────────────────────────────────────────
function smoothNav(e, id) {
  if (e) e.preventDefault();
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  if (menuOpen) toggleMenu();
  setActive(id);
}

// ── Navbar scroll ────────────────────────────────────────
var navbar = document.getElementById('navbar');
window.addEventListener('scroll', function () {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  updateActiveNav();
});

// ── Active nav link ──────────────────────────────────────
var sections   = ['inicio', 'nosotros', 'servicios', 'clientes', 'contacto'];
var navLinks   = document.querySelectorAll('.navbar-links a');
var mobileLinks = document.querySelectorAll('.mobile-menu a');

function setActive(id) {
  navLinks.forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
}

function updateActiveNav() {
  var current = 'inicio';
  sections.forEach(function (id) {
    var el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  setActive(current);
}
updateActiveNav();

// ── Mobile menu ──────────────────────────────────────────
var menuOpen   = false;
var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  menuOpen = !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  mobileMenu.classList.toggle('open', menuOpen);
}

// ── Hero carousel ────────────────────────────────────────
var slides = [
  { title: 'Servicios Marítimos y Portuarios',         sub: 'Vamos por más' },
  { title: 'Puerto Montt — Operaciones de Excelencia', sub: 'Estiba, desestiba y logística portuaria' },
];

var currentSlide = 0;
var heroSlides   = document.querySelectorAll('.hero-slide');
var heroDots     = document.querySelectorAll('.dot');
var heroTitle    = document.getElementById('heroTitle');
var heroSub      = document.getElementById('heroSub');
var autoPlay;

function goSlide(index) {
  heroSlides[currentSlide].classList.remove('active');
  heroDots[currentSlide].classList.remove('active');

  currentSlide = index;

  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');

  heroTitle.style.animation = 'none';
  heroTitle.offsetHeight;
  heroTitle.style.animation = 'fadeInUp 0.8s ease';
  heroTitle.textContent = slides[currentSlide].title;
  heroSub.textContent   = slides[currentSlide].sub;
}

function nextSlide() {
  goSlide((currentSlide + 1) % slides.length);
}

function startAutoPlay() {
  autoPlay = setInterval(nextSlide, 5500);
}

heroDots.forEach(function (btn, i) {
  btn.addEventListener('click', function () {
    clearInterval(autoPlay);
    goSlide(i);
    startAutoPlay();
  });
});

startAutoPlay();

// ── Stats counter ────────────────────────────────────────
function animateCounter(card) {
  var countEl = card.querySelector('.count');
  var target  = parseInt(card.dataset.target, 10);
  var steps   = 60;
  var step    = target / steps;
  var delay   = 1800 / steps;
  var current = 0;

  var t = setInterval(function () {
    current += step;
    if (current >= target) {
      countEl.textContent = target.toLocaleString('es-CL');
      clearInterval(t);
    } else {
      countEl.textContent = Math.floor(current).toLocaleString('es-CL');
    }
  }, delay);
}

var statsObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(function (card) {
  statsObserver.observe(card);
});

// ── Contact form ─────────────────────────────────────────
function submitForm(e) {
  e.preventDefault();

  var btn     = document.getElementById('submitBtn');
  var errEl   = document.getElementById('formError');
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');

  btn.disabled    = true;
  btn.textContent = 'Enviando...';
  errEl.style.display = 'none';

  var data = new FormData(form);
  var body = '';
  data.forEach(function (val, key) {
    body += key + ': ' + val + '\n';
  });

  var subject = data.get('subject') || 'Consulta desde sermapor.cl';
  var mailto  = 'mailto:contacto@sermapor.cl'
    + '?subject=' + encodeURIComponent(subject)
    + '&body='    + encodeURIComponent(body);

  try {
    window.location.href = mailto;
    setTimeout(function () {
      form.style.display    = 'none';
      success.style.display = 'block';
    }, 800);
  } catch (err) {
    errEl.style.display = 'block';
    btn.disabled        = false;
    btn.textContent     = 'Enviar mensaje';
  }
}

function resetForm() {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var btn     = document.getElementById('submitBtn');

  form.reset();
  form.style.display    = 'block';
  success.style.display = 'none';
  btn.disabled          = false;
  btn.textContent       = 'Enviar mensaje';
}
