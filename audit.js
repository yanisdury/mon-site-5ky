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
            results.push(parseInt(slider.value)); // Sauvegarde les valeurs comme des entiers
        });

        // Calcul du score sur 100
        const maxPossibleScore = sliders.length * 10; // Si chaque curseur a une valeur de 0 à 10
        const totalScore = results.reduce((acc, value) => acc + value, 0); // Somme des valeurs des curseurs
        const scoreOutOf100 = (totalScore / maxPossibleScore) * 100; // Normalisation sur 100

        // Sauvegarde le score et les résultats dans le localStorage
        const auditData = { results, score: scoreOutOf100 };
        localStorage.setItem("auditResults", JSON.stringify(auditData));

        // Redirection vers la page des résultats sans ajouter à l'historique
        window.location.replace("resultats.html");
    });
});