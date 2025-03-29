document.addEventListener("DOMContentLoaded", function () {
    // Récupérer les résultats stockés
    let audits = JSON.parse(localStorage.getItem("auditHistory")) || [];

    // Sélectionner la liste des audits
    let auditList = document.getElementById("audit-list");

    // Affichage des audits précédents
    audits.forEach(audit => {
        let li = document.createElement("li");
        li.textContent = `Score: ${audit.score}/10 - ${audit.date} à ${audit.heure}`;
        auditList.appendChild(li);
    });

    // Affichage du dernier score sur la jauge
    if (audits.length > 0) {
        let latestAudit = audits[audits.length - 1];
        updateGauge(latestAudit.score);
    }
});

// Fonction pour mettre à jour la jauge
function updateGauge(score) {
    let angle = (score / 10) * 180 - 90; // Convertir le score en angle
    let needle = document.getElementById("needle");
    needle.setAttribute("transform", `rotate(${angle}, 100, 90)`);
    document.getElementById("score-value").textContent = `Score: ${score} / 10`;
}