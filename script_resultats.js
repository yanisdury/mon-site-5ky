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
    let latestScore = audits.length > 0 ? audits[audits.length - 1].score : 0;
    updateGauge(latestScore);
});

// Fonction pour mettre à jour la jauge avec Chart.js
function updateGauge(score) {
    let ctx = document.getElementById("gaugeChart").getContext("2d");

    let gaugeChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Score", "Restant"],
            datasets: [{
                data: [score, 10 - score],
                backgroundColor: [
                    score <= 3 ? "black" : score <= 5 ? "red" : score <= 8 ? "orange" : "green",
                    "#ddd"
                ],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: "70%",
            plugins: {
                legend: { display: false }
            }
        }
    });

    document.getElementById("score-value").textContent = `Score: ${score} / 10`;
}