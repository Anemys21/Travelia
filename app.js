// Travelia interactions: Parallax hero, smooth scroll indicators, reveal-on-scroll

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Parallax effect for hero layered backgrounds
const layers = document.querySelectorAll('.layer');
function parallax() {
  const scrollY = window.scrollY;
  layers.forEach(el => {
    const speed = parseFloat(el.dataset.speed || '0');
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}
parallax();
window.addEventListener('scroll', parallax, { passive: true });

// Header shadow on scroll
(function(){
  const header = document.querySelector('.site-header');
  if (!header) return;
  function setShadow(){
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  setShadow();
  window.addEventListener('scroll', setShadow, { passive: true });
})();

// Parallax inside split section image
const innerParallaxImgs = document.querySelectorAll('.parallax-img');
function parallaxInner(){
  const y = window.scrollY;
  innerParallaxImgs.forEach(img => {
    const sp = parseFloat(img.dataset.speed || '0.2');
    img.style.transform = `translateY(${y * sp * 0.2}px)`;
  });
}
parallaxInner();
window.addEventListener('scroll', parallaxInner, { passive: true });

// Reveal on scroll animations (also target cards)
const revealEls = document.querySelectorAll('.reveal-up, .card');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  })
},{ threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Mobile Navigation Toggle
(function(){
  const toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(toggle => {
    const header = toggle.closest('.site-header');
    const nav = header ? header.querySelector('.nav') : null;
    if (!nav) return;
    // ensure an id for aria-controls target
    if (!nav.id) nav.id = 'primary-nav';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');

    function open(){
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
    function close(){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu(){
      if (nav.classList.contains('is-open')) close(); else open();
    }
    toggle.addEventListener('click', (e)=>{ e.preventDefault(); toggleMenu(); });

    // Close on outside click
    document.addEventListener('click', (e)=>{
      if (!header.contains(e.target)) close();
    });
    // Close on resize > 900 or orientation change
    const mq = window.matchMedia('(min-width: 901px)');
    mq.addEventListener('change', ()=> close());
    // Close on Escape (only nav)
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') close();
    });
  });
})();

// Smooth scroll for internal nav links (enhanced)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e)=>{
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  })
});

// Quote Modal & Estimator (FCFA)
(function(){
  const modal = document.getElementById('quoteModal');
  if (!modal) return; // page may not have the modal
  const inputDest = document.getElementById('q-destination');
  const inputType = document.getElementById('q-type');
  const inputPersons = document.getElementById('q-personnes');
  const inputNights = document.getElementById('q-nuits');
  const inputSeason = document.getElementById('q-saison');
  const resultEl = document.getElementById('q-resultat');

  const fmt = new Intl.NumberFormat('fr-FR');

  function baseRate(type){
    return type === 'hotel' ? 45000 : 120000; // par personne / nuit
  }
  function destFactor(dest){
    const d = (dest||'').toLowerCase();
    if (d.includes('bora')) return 2.2;
    if (d.includes('tokyo') || d.includes('japon')) return 1.8;
    if (d.includes('alpes') || d.includes('chamonix')) return 1.2;
    if (d.includes('venise') || d.includes('italie')) return 1.4;
    if (d.includes('patagon')) return 1.9;
    if (d.includes('new') || d.includes('york') || d.includes('nyc')) return 1.7;
    return 1.3; // par défaut
  }
  function seasonFactor(val){
    if (val === 'haute') return 1.25;
    if (val === 'basse') return 0.85;
    return 1.0;
  }
  function compute(){
    const t = baseRate(inputType.value);
    const nights = Math.max(1, parseInt(inputNights.value||'1',10));
    const persons = Math.max(1, parseInt(inputPersons.value||'1',10));
    const df = destFactor(inputDest.value);
    const sf = seasonFactor(inputSeason.value);
    // Prix estimatif simple: base * nuits * personnes * facteurs + frais fixes
    const fixed = 85000; // transferts/assistance
    const estimate = Math.round((t * nights * persons * df * sf) + fixed);
    resultEl.textContent = `Estimation: ${fmt.format(estimate)} FCFA`;
  }

  function openModal(prefill){
    if (prefill) inputDest.value = prefill;
    resultEl.textContent = '';
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal(){
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  modal.addEventListener('click', (e)=>{
    if (e.target === modal || e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') closeModal();
  });

  const quoteButtons = document.querySelectorAll('[data-quote]');
  quoteButtons.forEach(btn => {
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      openModal(btn.getAttribute('data-quote')||'');
    });
  });
  const calc = document.getElementById('q-calculer');
  if (calc) calc.addEventListener('click', (e)=>{ e.preventDefault(); compute(); });
})();
