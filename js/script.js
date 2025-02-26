window.onload = function () {
  // Load the header content
  fetch('../components/header.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch header');
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById('header').innerHTML = data;
    })
    .catch((error) => {
      console.error('Error loading header:', error);
    });

  // Load the footer content
  fetch('../components/footer.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch footer');
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById('footer').innerHTML = data;
    })
    .catch((error) => {
      console.error('Error loading footer:', error);
    });
};
