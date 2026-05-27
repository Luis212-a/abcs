/* ══════════════════════════════════════════════════════════════════════
   MOBILE NAVIGATION — Hamburger Menu Management
═════════════════════════════════════════════════════════════════════ */

class MobileNav {
  constructor() {
    this.mobMenu = document.getElementById('mobMenu');
    this.hamButton = document.querySelector('.ham');
    this.mobLinks = this.mobMenu?.querySelectorAll('a') || [];

    this.init();
  }

  init() {
    // Hamburger button click
    if (this.hamButton) {
      this.hamButton.addEventListener('click', () => this.openMenu());
    }

    // Close menu when link is clicked
    this.mobLinks.forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });

    // Close menu when clicking outside
    if (this.mobMenu) {
      this.mobMenu.addEventListener('click', (e) => {
        if (e.target === this.mobMenu) {
          this.closeMenu();
        }
      });
    }
  }

  openMenu() {
    if (this.mobMenu) {
      this.mobMenu.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Animate hamburger
      const spans = this.hamButton?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = 'rotate(45deg) translateY(12px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
      }
    }
  }

  closeMenu() {
    if (this.mobMenu) {
      this.mobMenu.classList.remove('open');
      document.body.style.overflow = '';

      // Reset hamburger
      const spans = this.hamButton?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
      }
    }
  }
}

// Legacy function for HTML onclick handlers
function closeMob() {
  const nav = new MobileNav();
  nav.closeMenu();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MobileNav();
  });
} else {
  new MobileNav();
}
