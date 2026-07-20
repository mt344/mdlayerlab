// Mobile-Navigation
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Anfrageformular: per fetch senden, ohne die Seite zu verlassen
const orderForm = document.getElementById('orderForm');
const formStatus = document.getElementById('formStatus');

if (orderForm) {
  orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet …';

    try {
      const response = await fetch(orderForm.action, {
        method: 'POST',
        body: new FormData(orderForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Danke! Deine Anfrage ist angekommen — ich melde mich in Kürze bei dir.';
        formStatus.className = 'form-status visible ok';
        orderForm.reset();
      } else {
        throw new Error('Formular konnte nicht gesendet werden.');
      }
    } catch (err) {
      formStatus.textContent = 'Da ist etwas schiefgelaufen. Schreib mir gern direkt per E-Mail.';
      formStatus.className = 'form-status visible err';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Anfrage senden';
    }
  });
}
