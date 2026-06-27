/* =========================================================
   MIGUEL TRIGOSO — sitio personal UCSP
   script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasIO = 'IntersectionObserver' in window;

  const safe = (fn) => {
    try { fn(); } catch (err) { console.error(err); }
  };

  /* ---------------------------------------------------------
     1. NAV: fondo al hacer scroll + menú móvil
     --------------------------------------------------------- */
  safe(() => {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    const onScrollNav = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScrollNav();
    window.addEventListener('scroll', onScrollNav, { passive: true });

    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });
  });

  /* ---------------------------------------------------------
     2. SCROLL-SPY: resaltar el link de la sección visible
     --------------------------------------------------------- */
  safe(() => {
    if (!hasIO) return;

    const navLinks = document.getElementById('nav-links');
    const sections = document.querySelectorAll('main section[id]');
    const navLinkMap = new Map();
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      navLinkMap.set(link.getAttribute('href').slice(1), link);
    });

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const link = navLinkMap.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinkMap.forEach(l => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(section => spyObserver.observe(section));
  });

  /* ---------------------------------------------------------
     3. REVEAL ON SCROLL
     --------------------------------------------------------- */
  safe(() => {
    const revealEls = document.querySelectorAll('.reveal');

    if (prefersReducedMotion || !hasIO) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  });

  /* ---------------------------------------------------------
     4. TERMINAL DE BIENVENIDA (efecto de tecleo)
     --------------------------------------------------------- */
  safe(() => {
    const terminalEl = document.getElementById('hero-terminal');
    const terminalLines = [
      { prompt: '> whoami', value: 'miguel_trigoso' },
      { prompt: '> carrera', value: 'ciencia_de_la_computacion · ucsp' },
      { prompt: '> estado', value: 'primer_anio — construyendo y aprendiendo' }
    ];

    async function typeTerminal() {
      if (prefersReducedMotion) {
        terminalEl.textContent = terminalLines
          .map(l => `${l.prompt}\n${l.value}`)
          .join('\n');
        return;
      }

      const typeChars = (text) => new Promise(resolve => {
        let i = 0;
        const speed = 28;
        const tick = () => {
          terminalEl.textContent += text.charAt(i);
          i++;
          if (i < text.length) {
            setTimeout(tick, speed);
          } else {
            resolve();
          }
        };
        tick();
      });

      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

      for (const line of terminalLines) {
        await typeChars(line.prompt + '\n');
        await wait(150);
        await typeChars(line.value + '\n\n');
        await wait(350);
      }
    }

    typeTerminal();
  });

  /* ---------------------------------------------------------
     5. INDICADOR DE PROGRESO — "eclipse" de scroll
     --------------------------------------------------------- */
  safe(() => {
    const eclipseShadow = document.getElementById('eclipse-shadow');
    const eclipseBtn = document.getElementById('eclipse-progress');

    const updateEclipseProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      // 0 = sombra totalmente a la derecha (sin eclipse) · 1 = sombra centrada (eclipse total)
      const offset = (1 - progress) * 100;
      eclipseShadow.style.transform = `translateX(${offset}%)`;
    };

    updateEclipseProgress();
    window.addEventListener('scroll', updateEclipseProgress, { passive: true });
    window.addEventListener('resize', updateEclipseProgress);

    eclipseBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

});

