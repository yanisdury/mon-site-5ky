document.querySelectorAll('.slider').forEach(slider => {
    slider.addEventListener('input', function() {
        this.nextElementSibling.textContent = this.value;
    });
});

document.getElementById("auditForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let auditResults = {};
    
    document.querySelectorAll('.audit-question').forEach((question, index) => {
        let value = question.querySelector('.slider').value;
        auditResults[`question_${index + 1}`] = value;
    });

    localStorage.setItem("auditResults", JSON.stringify(auditResults));
    localStorage.setItem("auditDate", new Date().toLocaleString());

    window.location.href = "resultats.html";
}); 