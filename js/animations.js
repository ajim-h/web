document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll observer for reveal animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal, .section__header, .wave-divider, .site-footer').forEach(el => {
    observer.observe(el);
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navOverlay = document.querySelector('.nav-overlay');
  const toggleMenu = () => {
    navToggle.classList.toggle('is-open');
    navOverlay.classList.toggle('is-open');
  };
  navToggle.addEventListener('click', toggleMenu);

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
      if (navOverlay.classList.contains('is-open')) toggleMenu();
    });
  });

  // Particle system
  const initParticles = () => {
    const containers = document.querySelectorAll('.animation-container.particles');
    containers.forEach(container => {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 8 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 4}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);
      }
    });
  };
  initParticles();

  // Cursor ripple effect
  const cursor = document.querySelector('.cursor');
  let isRippling = false;
  const handleCursor = (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    if (e.type === 'click' && !isRippling) {
      isRippling = true;
      cursor.classList.add('ripple');
      setTimeout(() => {
        cursor.classList.remove('ripple');
        isRippling = false;
      }, 500);
    }
  };
  document.addEventListener('mousemove', handleCursor);
  document.addEventListener('click', handleCursor);

  // Parallax effect for hero background
  let lastScroll = 0;
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    if (Math.abs(scrollPosition - lastScroll) > 10) {
      document.querySelectorAll('.hero__bg').forEach(bg => {
        bg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      });
      lastScroll = scrollPosition;
    }
  };
  window.addEventListener('scroll', () => {
    requestAnimationFrame(handleScroll);
  });
});
