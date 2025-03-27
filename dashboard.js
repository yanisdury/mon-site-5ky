document.addEventListener("DOMContentLoaded", function() {
    let results = JSON.parse(localStorage.getItem('auditResults')) || {};
    let tableBody = document.getElementById('audit-results');

    // Vider le tableau avant d'ajouter les résultats
    tableBody.innerHTML = "";

    if (Object.keys(results).length === 0) {
        tableBody.innerHTML = "<tr><td colspan='2'>Aucun audit enregistré.</td></tr>";
    } else {
        Object.keys(results).forEach((key, index) => {
            let response = results[key] || "Non répondu";

            let row = document.createElement('tr');
            row.innerHTML = `<td>Question ${index + 1}</td><td>${response}</td>`;
            tableBody.appendChild(row);
        });
    }
});