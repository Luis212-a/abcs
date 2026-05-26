/* ══════════════════════════════════════════════════════════════════
   MOBILE NAVIGATION — Hamburger toggle
══════════════════════════════════════════════════════════════════ */

let _navOpen = false;

function openMob() {
  const menu = document.getElementById('mobMenu');
  const ham  = document.querySelector('.ham');
  if (!menu) return;
  _navOpen = true;
  menu.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (ham) {
    ham.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translateY(7px)';
    ham.querySelector('span:nth-child(2)').style.opacity  = '0';
    ham.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translateY(-7px)';
  }
}

function closeMob() {
  const menu = document.getElementById('mobMenu');
  const ham  = document.querySelector('.ham');
  if (!menu) return;
  _navOpen = false;
  menu.classList.remove('open');
  document.body.style.overflow = '';
  if (ham) {
    ham.querySelector('span:nth-child(1)').style.transform = '';
    ham.querySelector('span:nth-child(2)').style.opacity  = '1';
    ham.querySelector('span:nth-child(3)').style.transform = '';
  }
}

function toggleMob() {
  _navOpen ? closeMob() : openMob();
}

document.addEventListener('DOMContentLoaded', () => {
  const ham = document.querySelector('.ham');
  if (ham) {
    // Quitar el onclick inline y manejar aquí
    ham.removeAttribute('onclick');
    ham.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMob();
    });
  }

  // Cerrar con ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && _navOpen) closeMob();
  });
});
