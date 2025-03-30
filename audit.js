document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;

        function updateValueDisplay() {
            const value = parseInt(slider.value);
            valueDisplay.textContent = value;

            // Met à jour la position de la valeur par rapport au curseur
            const percent = ((value - slider.min) / (slider.max - slider.min)) * 100;
            valueDisplay.style.left = `calc(${percent}% - 20px)`;

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
        updateValueDisplay(); // Initialiser la couleur et la position au chargement
    });
});