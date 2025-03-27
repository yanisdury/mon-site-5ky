document.getElementById('download-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Rapport d'Audit 5S", 10, 10);

    let results = JSON.parse(localStorage.getItem('auditResults')) || {};
    let y = 20;

    Object.keys(results).forEach((key, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Question ${index + 1}: ${results[key]}`, 10, y);
        y += 10;
    });

    doc.save("Rapport_Audit_5S.pdf");
});