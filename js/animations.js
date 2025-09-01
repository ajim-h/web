document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal, .section__header, .card, .site-footer, .nav-list li').forEach(el => {
    observer.observe(el);
  });

  // Mobile navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    navList.classList.toggle('is-open');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Blog search and filter
  const searchInput = document.querySelector('#blog-search');
  const tagButtons = document.querySelectorAll('.tag-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  if (searchInput && tagButtons.length > 0) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      blogCards.forEach(card => {
        const title = card.querySelector('.h3').textContent.toLowerCase();
        const content = card.querySelector('p:not(.blog-meta)').textContent.toLowerCase();
        card.style.display = (title.includes(searchTerm) || content.includes(searchTerm)) ? 'block' : 'none';
      });
    });

    tagButtons.forEach(button => {
      button.addEventListener('click', () => {
        tagButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const tag = button.getAttribute('data-tag');
        blogCards.forEach(card => {
          const tags = card.getAttribute('data-tags').split(',');
          card.style.display = (tag === 'all' || tags.includes(tag)) ? 'block' : 'none';
        });
      });
    });
  }

  // Simple parallax effect for hero
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.hero__bg').forEach(bg => {
      const scrollPosition = window.pageYOffset;
      bg.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
  });
});
