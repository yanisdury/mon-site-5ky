document.getElementById("auditForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    let score = document.getElementById("score").value;
    let commentaires = document.getElementById("commentaires").value;
    
    // Création d'un objet avec les résultats
    let auditData = {
        score: score,
        commentaires: commentaires,
        date: new Date().toLocaleDateString()
    };

    // Sauvegarde dans localStorage
    localStorage.setItem("dernierAudit", JSON.stringify(auditData));

    // Redirection vers la page des résultats
    window.location.href = "resultats.html";
});