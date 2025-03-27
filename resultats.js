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