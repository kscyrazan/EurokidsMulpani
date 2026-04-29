/* ===================================
   EUROKIDS MULPANI – SCRIPT.JS
   =================================== */

// ===== PAGE NAVIGATION =====
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById('page-' + pageName);
  if (target) target.classList.add('active');

  // Update nav active states
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageName);
  });

  // Close mobile menu
  document.getElementById('navLinks').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-run animations
  setTimeout(runReveal, 100);
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// ===== GALLERY FILTER =====
function filterGallery(cat, btn) {
  // Update button states
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Filter items
  document.querySelectorAll('.gal-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ===== LIGHTBOX =====
document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    const alt = item.querySelector('img').alt;
    document.getElementById('lbImg').src = src;
    document.getElementById('lbImg').alt = alt;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ===== SCROLL REVEAL =====
function runReveal() {
  const reveals = document.querySelectorAll('.page.active .reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));
}

// Add reveal class to key elements dynamically
function addRevealClasses() {
  const selectors = [
    '.why-card', '.prog-card', '.act-card', '.fac-card',
    '.prog-detail-card', '.adm-card', '.section-header',
    '.about-content', '.about-img-grid', '.principal-wrap',
    '.staff-card-large', '.ci-item', '.gal-item'
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i * 0.06) + 's';
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  addRevealClasses();
  runReveal();

  // Set home as active on load
  showPage('home');
});
