function loadComponent(url, elementId, callback) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${elementId}`);
            }
            return response.text();
        })
        .then((data) => {
            document.getElementById(elementId).innerHTML = data;
            if (typeof callback === "function") {
                callback();
            }
        })
        .catch((error) => {
            console.error(`Error loading ${elementId}:`, error);
        });
}

window.onload = function () {
    console.log("Loaded");
    loadComponent('../components/header.html', 'header', function () {
        const hamburger = document.querySelector(".hamburger");
        const menu = document.querySelector(".menu");

        if (hamburger && menu) {
        hamburger.addEventListener("click", () => {
            menu.classList.toggle("show");
        });
        } else {
            console.error('Hamburger or menu not found in DOM')
        }
    });
    console.log("Loaded after");
    loadComponent('../components/footer.html', 'footer');
};
