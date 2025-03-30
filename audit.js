document.addEventListener("DOMContentLoaded", function () {
    // Sélectionne tous les curseurs
    const sliders = document.querySelectorAll(".slider");

    sliders.forEach(slider => {
        const valueDisplay = slider.nextElementSibling; // Sélectionne l'élément affichant la valeur

        // Fonction pour mettre à jour l'affichage du curseur
        function updateValue() {
            const value = slider.value;
            valueDisplay.textContent = value;

            // Changement de couleur selon la valeur
            if (value < 3) {
                valueDisplay.style.color = "black";
            } else if (value < 5) {
                valueDisplay.style.color = "red";
            } else if (value < 8) {
                valueDisplay.style.color = "orange";
            } else {
                valueDisplay.style.color = "green";
            }
        }

        // Initialise la valeur au chargement
        updateValue();

        // Met à jour la valeur lors d'un mouvement du curseur
        slider.addEventListener("input", updateValue);
    });

    // Gestion du bouton "Valider l’audit"
    document.getElementById("validateAudit").addEventListener("click", function () {
        // Récupérer toutes les valeurs des curseurs
        let results = [];
        sliders.forEach(slider => {
            results.push(slider.value);
        });

        // Sauvegarde les résultats dans le localStorage
        localStorage.setItem("auditResults", JSON.stringify(results));

        // Redirection vers la page des résultats sans ajouter à l'historique
        window.location.replace("resultats.html");
    });
});