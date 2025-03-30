// Mise à jour dynamique des curseurs
document.querySelectorAll('.slider').forEach(slider => {
    let valueDisplay = slider.nextElementSibling;

    function updateValue() {
        let value = slider.value;
        valueDisplay.textContent = value;

        // Changement de couleur en fonction de la valeur
        if (value <= 3) {
            valueDisplay.style.color = "red";
        } else if (value <= 6) {
            valueDisplay.style.color = "orange";
        } else {
            valueDisplay.style.color = "green";
        }

        // Position dynamique de la valeur au-dessus du curseur
        let percent = (value - slider.min) / (slider.max - slider.min) * 100;
        valueDisplay.style.left = `calc(${percent}% - 15px)`;
    }

    // Mise à jour initiale
    updateValue();

    // Ajout de l'événement pour mise à jour en temps réel
    slider.addEventListener('input', updateValue);
});

// Gestion du formulaire d'audit et stockage des résultats
document.getElementById("auditForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    let auditResults = {};

    // Récupération des valeurs des curseurs
    document.querySelectorAll('.audit-question').forEach((question, index) => {
        let value = question.querySelector('.slider').value;
        auditResults[`question_${index + 1}`] = value;
    });

    // Sauvegarde des résultats dans le stockage local
    localStorage.setItem("auditResults", JSON.stringify(auditResults));
    localStorage.setItem("auditDate", new Date().toLocaleString());

    // Redirection immédiate vers la page des résultats
    window.location.href = "resultats.html";
});