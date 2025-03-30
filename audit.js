document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider");
    const submitButton = document.getElementById("submit-audit");

    // Vérifier si le bouton existe avant d'ajouter un écouteur d'événement
    if (submitButton) {
        submitButton.addEventListener("click", function () {
            const results = [];
            sliders.forEach(slider => {
                results.push(parseInt(slider.value));
            });

            // Stocker les résultats dans localStorage
            localStorage.setItem("auditResults", JSON.stringify(results));

            // Rediriger vers la page de résultats après un court délai
            setTimeout(() => {
                window.location.href = "resultats.html";
            }, 500);
        });
    }

    // Mettre à jour les curseurs dynamiquement
    sliders.forEach(slider => {
        const valueDisplay = document.createElement("div");
        valueDisplay.classList.add("value");
        slider.parentNode.appendChild(valueDisplay);

        function updateValueDisplay() {
            const value = parseInt(slider.value);
            valueDisplay.textContent = value;

            // Positionner la valeur dynamiquement au-dessus du curseur
            const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
            valueDisplay.style.left = `calc(${percent}% - 15px)`;

            // Changer la couleur en fonction de la valeur
            valueDisplay.className = "value";
            if (value <= 3) {
                valueDisplay.classList.add("low");
            } else if (value <= 5) {
                valueDisplay.classList.add("medium-low");
            } else if (value <= 8) {
                valueDisplay.classList.add("medium");
            } else {
                valueDisplay.classList.add("high");
            }
        }

        slider.addEventListener("input", updateValueDisplay);
        updateValueDisplay(); // Mise à jour initiale
    });
});