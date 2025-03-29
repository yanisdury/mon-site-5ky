document.getElementById("auditForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let results = {};
    let totalScore = 0;
    let totalQuestions = 0;

    document.querySelectorAll(".audit-question").forEach((question, index) => {
        let selected = question.querySelector("input:checked");
        if (selected) {
            let value = parseInt(selected.value);
            results[`question_${index + 1}`] = value;
            totalScore += value;
            totalQuestions++;
        }
    });

    results["totalScore"] = totalScore;
    results["maxScore"] = totalQuestions * 5;

    localStorage.setItem("auditResults", JSON.stringify(results));

    window.location.href = "resultats.html";
});