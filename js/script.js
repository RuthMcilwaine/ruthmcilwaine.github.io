function loadComponent(url, elementId) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${elementId}`);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch((error) => {
            console.error(`Error loading ${elementId}:`, error);
        });
}

window.onload = function () {
    loadComponent('../components/header.html', 'header');
    loadComponent('../components/footer.html', 'footer');
};
