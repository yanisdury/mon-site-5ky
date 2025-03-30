document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les résultats stockés dans le localStorage
    const auditData = JSON.parse(localStorage.getItem("auditResults"));

    // Si des résultats sont trouvés, les afficher
    if (auditData) {
        const score = auditData.score;

        // Affichage du score dans le texte
        const scoreValueElement = document.getElementById("scoreValue");
        scoreValueElement.textContent = `Score : ${score.toFixed(2)} / 100`;

        // Mise à jour de l'aiguille de la jauge
        const needle = document.querySelector(".needle");
        const needleDegree = (score / 100) * 180; // Calculer l'angle de l'aiguille en fonction du score
        needle.style.transform = `rotate(${needleDegree}deg)`; // Applique l'angle à l'aiguille
    } else {
        console.log("Aucun résultat trouvé.");
    }
});