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

// Fonction pour sauvegarder les réponses
function saveAuditResults() {
    let results = {};
    
    document.querySelectorAll('.audit-question').forEach((question, index) => {
        let selectedValue = question.querySelector('input:checked');
        results[`question_${index + 1}`] = selectedValue ? selectedValue.value : null;
    });

    localStorage.setItem('auditResults', JSON.stringify(results));
    console.log("Audit sauvegardé !");
}

// Fonction pour récupérer les réponses sauvegardées
function loadAuditResults() {
    let results = JSON.parse(localStorage.getItem('auditResults'));

    if (results) {
        document.querySelectorAll('.audit-question').forEach((question, index) => {
            let savedValue = results[`question_${index + 1}`];
            if (savedValue) {
                let radioInput = question.querySelector(`input[value="${savedValue}"]`);
                if (radioInput) {
                    radioInput.checked = true;
                }
            }
        });
        console.log("Audit chargé !");
    }
}

// Charger les résultats au chargement de la page
document.addEventListener("DOMContentLoaded", loadAuditResults);

// Sauvegarde automatique à chaque sélection
document.querySelectorAll('.audit-question input').forEach(input => {
    input.addEventListener('change', saveAuditResults);
});
document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Rapport d'Audit 5S", 10, 10);

    let results = JSON.parse(localStorage.getItem('auditResults')) || {};
    let y = 20;

    document.querySelectorAll('.audit-question').forEach((question, index) => {
        let questionText = question.querySelector('label').innerText;
        let response = results[`question_${index + 1}`] || "Non répondu";

        doc.setFontSize(12);
        doc.text(`${index + 1}. ${questionText}: ${response}`, 10, y);
        y += 10;
    });

    doc.save("Rapport_Audit_5S.pdf");
});