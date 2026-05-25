/* ══════════════════════════════════════════════════════════════════════
   TABS & FAQ — Tab switching and accordion functionality
═════════════════════════════════════════════════════════════════════ */

// TAB SWITCHING
function switchTab(tabName) {
  // Hide all tab contents
  const contents = document.querySelectorAll('.tab-content');
  contents.forEach((content) => {
    content.classList.remove('active');
  });

  // Remove active class from all buttons
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach((button) => {
    button.classList.remove('active');
  });

  // Show selected tab
  const selectedContent = document.getElementById(tabName);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Highlight selected button
  event.target.classList.add('active');

  // Smooth scroll to tab content
  selectedContent?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// FAQ TOGGLE
function toggleFAQ(element) {
  const faqItem = element.closest('.faq-item');

  if (faqItem) {
    // Close other open FAQs
    const allItems = document.querySelectorAll('.faq-item');
    allItems.forEach((item) => {
      if (item !== faqItem && item.classList.contains('open')) {
        item.classList.remove('open');
      }
    });

    // Toggle current FAQ
    faqItem.classList.toggle('open');
  }
}

// FORM SUBMISSION
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    state: document.getElementById('state').value,
    propertyType: document.getElementById('property-type').value,
    interest: document.getElementById('interest').value,
    message: document.getElementById('message').value,
  };

  // Validate
  if (!formData.name || !formData.email || !formData.phone) {
    alert('Por favor completa todos los campos requeridos');
    return;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Por favor ingresa un email válido');
    return;
  }

  // Send data (currently just log to console - connect to backend when ready)
  console.log('Form submitted:', formData);

  // Show success message
  const button = event.target.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.textContent = '✓ Enviado con éxito!';
  button.style.background = '#10b981';
  button.disabled = true;

  // Reset form
  event.target.reset();

  // Restore button after 3 seconds
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = '';
    button.disabled = false;
  }, 3000);

  // TODO: Connect to backend API to send email/store lead
  // fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // })
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Set first tab as active
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
      firstTab.classList.add('active');
    }
  });
} else {
  const firstTab = document.querySelector('.tab-btn');
  if (firstTab) {
    firstTab.classList.add('active');
  }
}
