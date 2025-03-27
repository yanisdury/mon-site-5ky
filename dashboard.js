document.addEventListener("DOMContentLoaded", function() {
    let results = JSON.parse(localStorage.getItem('auditResults')) || {};
    let tableBody = document.getElementById('audit-results');

    if (Object.keys(results).length === 0) {
        tableBody.innerHTML = "<tr><td colspan='2'>Aucun audit enregistré.</td></tr>";
    } else {
        document.querySelectorAll('.audit-question').forEach((question, index) => {
            let questionText = question.querySelector('label').innerText;
            let response = results[`question_${index + 1}`] || "Non répondu";

            let row = document.createElement('tr');
            row.innerHTML = `<td>${questionText}</td><td>${response}</td>`;
            tableBody.appendChild(row);
        });
    }
});