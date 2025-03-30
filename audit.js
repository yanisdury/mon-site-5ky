document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {
        const valueDisplay = document.createElement("div");
        valueDisplay.classList.add("value");
        slider.parentNode.appendChild(valueDisplay);

        function updateValueDisplay() {
            const value = parseInt(slider.value);
            valueDisplay.textContent = value;

            // Met à jour la position de la valeur par rapport au curseur
            const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
            valueDisplay.style.left = `calc(${percent}% - 15px)`;

            // Change la couleur de la valeur en fonction du score
            if (value <= 3) {
                valueDisplay.className = "value low";
            } else if (value <= 5) {
                valueDisplay.className = "value medium-low";
            } else if (value <= 8) {
                valueDisplay.className = "value medium";
            } else {
                valueDisplay.className = "value high";
            }
        }

        slider.addEventListener("input", updateValueDisplay);
        updateValueDisplay(); // Initialiser au chargement
    });

    // Gestion du bouton de validation
    document.getElementById("submit-audit").addEventListener("click", function () {
        const results = [];
        sliders.forEach(slider => {
            results.push(parseInt(slider.value));
        });

        // Stocker les résultats dans localStorage
        localStorage.setItem("auditResults", JSON.stringify(results));

        // Rediriger vers la page de résultats
        window.location.href = "resultats.html";
    });
});