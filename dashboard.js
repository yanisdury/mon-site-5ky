document.addEventListener("DOMContentLoaded", function() {
    let results = JSON.parse(localStorage.getItem('auditResults')) || {};
    let tableBody = document.getElementById('audit-results');
    let scoreDisplay = document.getElementById('total-score');

    if (!results || Object.keys(results).length === 0) {
        tableBody.innerHTML = "<tr><td colspan='2'>Aucun audit enregistré.</td></tr>";
        scoreDisplay.innerText = "Score : 0 / 0";
        return;
    }

    let totalScore = 0;
    let totalQuestions = Object.keys(results).length;

    Object.keys(results).forEach((key, index) => {
        let score = parseInt(results[key]) || 0;
        totalScore += score;

        let row = document.createElement('tr');
        row.innerHTML = `<td>Question ${index + 1}</td><td>${results[key]}</td>`;
        tableBody.appendChild(row);
    });

    scoreDisplay.innerText = `Score total : ${totalScore} / ${totalQuestions * 5}`;
});