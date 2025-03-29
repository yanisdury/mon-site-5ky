document.getElementById("auditForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let results = {};
    let totalScore = 0;
    let numQuestions = 0;

    document.querySelectorAll('.audit-question').forEach((question, index) => {
        let value = question.querySelector('input').value;
        results[`question_${index + 1}`] = value;
        totalScore += parseInt(value);
        numQuestions++;
    });

    let averageScore = numQuestions > 0 ? (totalScore / numQuestions).toFixed(1) : 0;
    let dateTime = new Date().toLocaleString();

    let auditData = {
        score: averageScore,
        date: dateTime,
        responses: results
    };

    // Récupérer les audits existants et ajouter le nouveau
    let auditHistory = JSON.parse(localStorage.getItem("auditHistory")) || [];
    auditHistory.push(auditData);
    localStorage.setItem("auditHistory", JSON.stringify(auditHistory));

    // Redirection vers la page des résultats
    window.location.href = "resultats.html";
});