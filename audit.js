document.getElementById("auditForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    let results = {};
    let totalScore = 0;
    let numQuestions = 0;

    document.querySelectorAll('.audit-question input').forEach((input, index) => {
        let score = parseInt(input.value);
        results[`question_${index + 1}`] = score;
        totalScore += score;
        numQuestions++;
    });

    results["totalScore"] = totalScore;
    results["maxScore"] = numQuestions * 10; // Score max possible
    results["date"] = new Date().toLocaleDateString();

    localStorage.setItem("auditResults", JSON.stringify(results));

    window.location.href = "resultats.html";
});