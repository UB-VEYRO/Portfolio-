(() => {
  'use strict';

  const menu = document.getElementById('menu');
  const nav = document.getElementById('nav');

  if (menu && nav) {
    const closeMenu = () => {
      nav.classList.remove('show');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open navigation menu');
      menu.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    };

    menu.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menu.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const progress = document.getElementById('progress');
  let scrollTicking = false;
  const updateProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    scrollTicking = false;
  };
  if (progress) {
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateProgress);
        scrollTicking = true;
      }
    }, { passive: true });
    updateProgress();
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 40px 0px' });
    revealItems.forEach(item => observer.observe(item));
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const message = document.getElementById('message')?.value.trim() || '';
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:udaybehra219@gmail.com?subject=${subject}&body=${body}`;
    });
  }
})();
