/* ── Navbar: transparent → solid glass on scroll ── */
const nav = document.getElementById('mainNav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 55);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Scroll-reveal via IntersectionObserver ─────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Hero canvas: floating literary glyphs ──────── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Literary / typographic glyphs */
  const GLYPHS = ['"', '§', '¶', '—', '·', '◇', '✦', '∞', '∂', '»', '«'];

  const particles = Array.from({ length: 45 }, () => ({
    x:        Math.random() * (canvas.width  || 1200),
    y:        Math.random() * (canvas.height || 800),
    char:     GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
    size:     Math.random() * 24 + 10,
    opacity:  Math.random() * 0.35 + 0.05,
    vy:       Math.random() * 0.4 + 0.1,
    vx:       (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rSpeed:   (Math.random() - 0.5) * 0.008,
    gold:     Math.random() < 0.3,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      // Using new CSS variables colors approximately
      ctx.fillStyle   = p.gold ? '#e5ba6e' : '#f4ece1';
      ctx.font        = `300 ${p.size}px 'Cormorant Garamond', serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.char, 0, 0);
      ctx.restore();

      p.y        -= p.vy;
      p.x        += p.vx;
      p.rotation += p.rSpeed;

      if (p.y < -30) {
        p.y = canvas.height + 30;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -40 || p.x > canvas.width + 40) {
        p.x = p.vx > 0 ? -30 : canvas.width + 30;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Smooth anchor scroll ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id  = a.getAttribute('href');
    const target = id === '#' ? document.body : document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
