document.addEventListener("DOMContentLoaded", function() {
    // Récupérer les résultats des audits depuis localStorage
    let storedAudits = JSON.parse(localStorage.getItem("auditHistory")) || [];

    let auditResults = JSON.parse(localStorage.getItem("auditResults"));
    let auditDate = localStorage.getItem("auditDate");

    if (auditResults) {
        // Calcul du score total et du score maximum
        let totalScore = Object.values(auditResults).reduce((acc, val) => acc + parseInt(val), 0);
        let maxScore = Object.keys(auditResults).length * 10;
        
        // Calcul du score en pourcentage
        let percentage = (totalScore / maxScore) * 100;

        // Affichage du score en pourcentage
        document.getElementById("scoreValue").textContent = `Score : ${percentage.toFixed(2)}% (Audit du ${auditDate})`;

        let needle = document.querySelector(".needle");
        let rotation = (percentage * 1.8) - 90;
        needle.style.transform = `rotate(${rotation}deg)`; // Ajuste l'aiguille en fonction du pourcentage

        // Ajouter le nouvel audit à l'historique avec le pourcentage
        storedAudits.push({
            date: auditDate,
            score: totalScore,
            maxScore: maxScore,
            percentage: percentage.toFixed(2)
        });
        localStorage.setItem("auditHistory", JSON.stringify(storedAudits));
    }

    // Trier les audits par date (du plus récent au plus ancien)
    storedAudits.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Fonction pour déterminer la couleur de la pastille en fonction du score
    function getScoreColor(percentage) {
        if (percentage < 40) {
            return "black"; // Score faible
        } else if (percentage < 60) {
            return "red"; // Score moyen
        } else if (percentage < 80) {
            return "orange"; // Bon score
        } else {
            return "green"; // Très bon score
        }
    }

    // Afficher l'historique des audits avec pourcentage et pastille colorée, du plus récent au plus ancien
    let auditList = document.getElementById("auditList");
    auditList.innerHTML = "";
    storedAudits.forEach(audit => {
        let listItem = document.createElement("li");

        // Créer la pastille
        let scoreColor = getScoreColor(audit.percentage);
        let circle = document.createElement("span");
        circle.classList.add("score-circle");
        circle.style.backgroundColor = scoreColor;

        // Ajouter la pastille et le texte de l'audit
        listItem.textContent = `Audit du ${audit.date} : ${audit.percentage}% (Score : ${audit.score} / ${audit.maxScore})`;
        listItem.prepend(circle); // Placer la pastille avant le texte

        auditList.appendChild(listItem);
    });

    // Fonction pour télécharger les résultats en CSV
    document.getElementById("downloadResults").addEventListener("click", function() {
        let csvContent = "Date,Score,Score Max,Pourcentage\n";
        storedAudits.forEach(audit => {
            csvContent += `${audit.date},${audit.score},${audit.maxScore},${audit.percentage}\n`;
        });

        let blob = new Blob([csvContent], { type: "text/csv" });
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "resultats_audits.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});