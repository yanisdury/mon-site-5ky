document.addEventListener("DOMContentLoaded", function() {
    let auditData = JSON.parse(localStorage.getItem("dernierAudit"));

    if (auditData) {
        document.getElementById("date").textContent = auditData.date;
        document.getElementById("score").textContent = auditData.score;
        document.getElementById("commentaires").textContent = auditData.commentaires;
    } else {
        document.querySelector(".resultats").innerHTML = "<p>Aucun audit enregistré.</p>";
    }
});
document.addEventListener("DOMContentLoaded", function () {
    let auditResults = JSON.parse(localStorage.getItem('auditResults')) || {};
    let totalScore = 0;
    let questionCount = Object.keys(auditResults).length;

    if (questionCount > 0) {
        Object.values(auditResults).forEach(score => {
            totalScore += parseInt(score) || 0;
        });
        totalScore = (totalScore / questionCount).toFixed(1); // Score moyen sur 10
    } else {
        totalScore = 0;
    }

    drawGauge(totalScore);
});

function drawGauge(score) {
    const canvas = document.getElementById("scoreGauge");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.9;
    const radius = 100;
    const startAngle = Math.PI; // 180°
    const endAngle = 0; // 0°

    // Définir les couleurs pour les zones du compteur
    const colors = [
        { min: 0, max: 3, color: "black" },
        { min: 3, max: 5, color: "red" },
        { min: 5, max: 8, color: "orange" },
        { min: 8, max: 10, color: "green" }
    ];

    // Dessiner les segments colorés
    colors.forEach(({ min, max, color }) => {
        const start = startAngle + (min / 10) * Math.PI;
        const end = startAngle + (max / 10) * Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, start, end, false);
        ctx.lineWidth = 20;
        ctx.strokeStyle = color;
        ctx.stroke();
    });

    // Dessiner l'aiguille
    const needleAngle = startAngle + (score / 10) * Math.PI;
    const needleLength = radius - 10;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + needleLength * Math.cos(needleAngle),
        centerY - needleLength * Math.sin(needleAngle)
    );
    ctx.lineWidth = 4;
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Afficher le score au centre
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Score: ${score}/10`, centerX, centerY - 20);
}