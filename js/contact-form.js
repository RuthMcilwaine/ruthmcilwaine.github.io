
// Contact form: send without leaving the page, then clear the form.
// Without JavaScript the form still posts to Formspree as normal.
(function () {
  var form = document.querySelector('#contact form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');

  function showStatus(message, type) {
    status.textContent = message;
    status.className = 'form-status' + (type ? ' form-status--' + type : '');
  }

  // If the visitor comes back to this page with the browser's Back button,
  // start with an empty form.
  window.addEventListener('pageshow', function (event) {
    var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    var cameBack = event.persisted || (nav && nav.type === 'back_forward');
    if (cameBack) {
      form.reset();
      showStatus('', '');
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    button.disabled = true;
    showStatus('Sending your message…', '');

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          showStatus('Thanks, your message has been sent. I’ll get back to you soon.', 'success');
          button.disabled = false;
        } else {
          // Formspree wants a normal submission (for example, to show a spam check),
          // so fall back to the standard form post.
          form.submit();
        }
      })
      .catch(function () {
        showStatus('Sorry, your message couldn’t be sent. Please check your connection and try again, or email me directly.', 'error');
        button.disabled = false;
      });
  });
})();