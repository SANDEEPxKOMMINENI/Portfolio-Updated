/* =============================================
   SANDEEP CHOWDARY KOMMINENI — PORTFOLIO JS
   Apple / GitHub Inspired Interactions
   Premium Edition with Special Effects
   ============================================= */
(function () {
  'use strict';

  /* ========================================
     1. PARTICLE BACKGROUND (Canvas)
     ======================================== */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [], mouse = { x: -1000, y: -1000 };
    const PARTICLE_COUNT = 60;
    const MAX_DIST = 140;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    }
    createParticles();

    if (window.matchMedia('(hover:hover)').matches) {
      document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const pColor = isDark ? 'rgba(99,102,241,' : 'rgba(79,70,229,';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x += dx * 0.02;
          p.y += dy * 0.02;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = pColor + '0.5)';
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = pColor + alpha + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ========================================
     2. SPOTLIGHT (Cursor Follow)
     ======================================== */
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

  /* ========================================
     3. THEME TOGGLE
     ======================================== */
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

  /* ========================================
     4. NAV SCROLL STATE
     ======================================== */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ========================================
     5. MOBILE MENU
     ======================================== */
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

  /* ========================================
     6. ACTIVE NAV LINK
     ======================================== */
  const secs = document.querySelectorAll('.section, .hero');
  const links = document.querySelectorAll('.nav-link');
  function setActive() {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
  window.addEventListener('scroll', setActive, { passive: true });

  /* ========================================
     7. SCROLL REVEAL
     ======================================== */
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

  /* ========================================
     8. COUNTER ANIMATION
     ======================================== */
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

  /* ========================================
     9. TYPEWRITER EFFECT
     ======================================== */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const phrases = [
      'AI/ML Engineer',
      'Full-Stack Developer',
      'GenAI Builder',
      'Open Source Contributor',
      'Production Platform Builder',
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
      const current = phrases[phraseIndex];
      if (!isDeleting) {
        typeEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, 2000); // Pause before deleting
          return;
        }
        setTimeout(type, 70);
      } else {
        typeEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 500);
          return;
        }
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1200); // Initial delay
  }

  /* ========================================
     10. TEXT SCRAMBLE EFFECT (Hero Name)
     ======================================== */
  const scrambleEl = document.getElementById('scrambleText');
  if (scrambleEl) {
    const finalText = scrambleEl.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
    let frame = 0;

    function scramble() {
      const progress = frame / 30; // 30 frames to complete
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          result += ' ';
        } else if (i / finalText.length < progress) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      scrambleEl.textContent = result;
      frame++;
      if (frame <= 30) {
        requestAnimationFrame(scramble);
      }
    }

    // Trigger on page load after hero animation
    setTimeout(scramble, 800);
  }

  /* ========================================
     11. PROJECT FILTER
     ======================================== */
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

  /* ========================================
     12. SMOOTH SCROLL
     ======================================== */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ========================================
     13. 3D TILT EFFECT ON CARDS
     ======================================== */
  if (window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `translateY(-3px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ========================================
     14. PARALLAX BLOBS
     ======================================== */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.blob').forEach((b, i) => {
      b.style.transform = 'translateY(' + (y * (i + 1) * 0.02) + 'px)';
    });
  }, { passive: true });

  /* ========================================
     15. MAGNETIC HOVER ON BUTTONS
     ======================================== */
  if (window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ========================================
     16. SKILL CHIP STAGGER ANIMATION
     ======================================== */
  const skillBlocks = document.querySelectorAll('.skill-block');
  const skillIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const chips = e.target.querySelectorAll('.skill-chips span');
      chips.forEach((chip, i) => {
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(8px) scale(0.95)';
        setTimeout(() => {
          chip.style.transition = 'all 0.35s var(--ease-out)';
          chip.style.opacity = '1';
          chip.style.transform = 'translateY(0) scale(1)';
        }, i * 40 + 100);
      });
      skillIO.unobserve(e.target);
    });
  }, { threshold: 0.3 });
  skillBlocks.forEach(el => skillIO.observe(el));

})();
