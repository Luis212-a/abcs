/* ══════════════════════════════════════════════════════════════════════
   THEME TOGGLE — Dark/Light Mode Management
═════════════════════════════════════════════════════════════════════ */

const THEME_KEY = 'abc-solar-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

class ThemeManager {
  constructor() {
    this.htmlElement = document.documentElement;
    this.themeButton = document.querySelector('.theme-btn');

    this.init();
  }

  init() {
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemTheme = this.getSystemTheme();
    const theme = savedTheme || systemTheme;

    this.setTheme(theme);

    // Listen for theme button click
    if (this.themeButton) {
      this.themeButton.addEventListener('click', () => this.toggleTheme());
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          this.setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }
  }

  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME;
  }

  setTheme(theme) {
    const validTheme = [DARK_THEME, LIGHT_THEME].includes(theme) ? theme : DARK_THEME;

    this.htmlElement.setAttribute('data-theme', validTheme);
    localStorage.setItem(THEME_KEY, validTheme);

    // Update button icon if needed
    if (this.themeButton) {
      const icon = validTheme === DARK_THEME ? '☀️' : '🌙';
      this.themeButton.textContent = icon;
    }
  }

  toggleTheme() {
    const currentTheme = this.htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    this.setTheme(newTheme);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
  });
} else {
  new ThemeManager();
}
