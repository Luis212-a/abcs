/* ══════════════════════════════════════════════════════════════════════
   MAIN — App Initialization & Global Utilities
═════════════════════════════════════════════════════════════════════ */

class App {
  constructor() {
    this.init();
  }

  init() {
    // Initialize core modules
    this.setupScrollBehavior();
    this.setupIntersectionObserver();
    this.setupFormValidation();

    // Log initialization
    console.log('ABCSolar Web App Initialized');
  }

  // Smooth scroll for anchor links
  setupScrollBehavior() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Intersection Observer for reveal animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .stg').forEach((el) => {
      observer.observe(el);
    });
  }

  // Basic form validation
  setupFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach((input) => {
          if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
          } else {
            input.classList.remove('error');
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      });

      // Remove error class on input
      form.querySelectorAll('input, textarea').forEach((input) => {
        input.addEventListener('input', () => {
          input.classList.remove('error');
        });
      });
    });
  }

  // Utility: Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  }

  // Utility: Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Utility: Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Initialize app on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}

// Error handling for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});
