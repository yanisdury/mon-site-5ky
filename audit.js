document.addEventListener("DOMContentLoaded", function () {
    // Sélectionner tous les curseurs
    const sliders = document.querySelectorAll(".range-input");

    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling;

        // Mettre à jour l'affichage initial
        updateSliderStyle(slider, valueDisplay);

        // Ajouter un écouteur d'événements sur l'input
        slider.addEventListener("input", function () {
            updateSliderStyle(slider, valueDisplay);
        });
    });

    function updateSliderStyle(slider, valueDisplay) {
        let value = slider.value;
        valueDisplay.textContent = value;

        // Déterminer la couleur du curseur
        let color = "black";
        if (value >= 4 && value <= 5) color = "red";
        else if (value >= 6 && value <= 8) color = "orange";
        else if (value >= 9) color = "green";

        slider.style.background = `linear-gradient(to right, ${color} ${value * 10}%, #ddd ${value * 10}%)`;
    }
});