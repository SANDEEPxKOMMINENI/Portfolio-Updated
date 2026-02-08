/* =============================================
   SANDEEP KOMMINENI — PORTFOLIO JS
   Apple / GitHub Inspired Interactions
   ============================================= */
(function () {
  'use strict';

  /* === Spotlight (cursor follow) === */
  const spot = document.getElementById('spotlight');
  if (spot && window.matchMedia('(hover:hover)').matches) {
    let mx = 0, my = 0, sx = 0, sy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      sx += (mx - sx) * 0.06;
      sy += (my - sy) * 0.06;
      spot.style.left = sx + 'px';
      spot.style.top = sy + 'px';
      requestAnimationFrame(loop);
    })();
  }

  /* === Theme Toggle === */
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme');
  if (saved) html.setAttribute('data-theme', saved);

  function syncIcon() {
    const dark = html.getAttribute('data-theme') !== 'light';
    if (themeIcon) themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
  }
  syncIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const dark = html.getAttribute('data-theme') !== 'light';
      const next = dark ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      syncIcon();
    });
  }

  /* === Nav scroll state === */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* === Mobile menu === */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-link').forEach(l => {
      l.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });
  }

  /* === Active nav link === */
  const secs = document.querySelectorAll('.section, .hero');
  const links = document.querySelectorAll('.nav-link');
  function setActive() {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', setActive, { passive: true });

  /* === Scroll Reveal === */
  const reveals = document.querySelectorAll('.reveal-up:not(.hero .reveal-up)');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));

  /* === Counter === */
  const counters = document.querySelectorAll('.metric-value');
  const cio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '+';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(t); }
        el.textContent = cur + (cur === target ? suffix : '');
      }, 25);
      cio.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => cio.observe(el));

  /* === Project Filter === */
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.proj-card');
  pills.forEach(p => {
    p.addEventListener('click', () => {
      pills.forEach(b => b.classList.remove('active'));
      p.classList.add('active');
      const f = p.dataset.filter;
      cards.forEach(c => {
        const cat = c.dataset.cat || '';
        if (f === 'all' || cat.includes(f)) {
          c.classList.remove('hidden');
          c.style.animation = 'heroReveal 0.45s var(--ease-out) forwards';
        } else {
          c.classList.add('hidden');
        }
      });
    });
  });

  /* === Smooth scroll === */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* === Subtle tilt on featured cards === */
  if (window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.featured-card, .exp-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-3px) perspective(1000px) rotateX(${-y*3}deg) rotateY(${x*3}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* === Parallax blobs === */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.blob').forEach((b, i) => {
      b.style.transform = 'translateY(' + (y * (i + 1) * 0.02) + 'px)';
    });
  }, { passive: true });

})();
