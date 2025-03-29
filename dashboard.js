document.addEventListener("DOMContentLoaded", function() {
    let results = JSON.parse(localStorage.getItem("auditResults")) || {};
    let scoreText = `Score total : ${results.totalScore || 0} / ${results.maxScore || 0}`;
    document.getElementById("score").innerText = scoreText;
});

document.getElementById("download-pdf").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Rapport d'Audit 5S", 10, 10);

    let results = JSON.parse(localStorage.getItem("auditResults")) || {};
    let y = 20;

    Object.keys(results).forEach((key, index) => {
        if (key !== "totalScore" && key !== "maxScore") {
            doc.text(`${index + 1}. ${key.replace("question_", "Question ")}: ${results[key]}`, 10, y);
            y += 10;
        }
    });

    doc.setFontSize(14);
    doc.text(`Score total : ${results.totalScore || 0} / ${results.maxScore || 0}`, 10, y + 10);

    doc.save("Rapport_Audit_5S.pdf");
});