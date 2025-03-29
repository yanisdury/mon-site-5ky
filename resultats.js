document.addEventListener("DOMContentLoaded", function() {
    let auditResults = JSON.parse(localStorage.getItem("auditResults"));
    let auditDate = localStorage.getItem("auditDate");

    if (auditResults) {
        let totalScore = Object.values(auditResults).reduce((acc, val) => acc + parseInt(val), 0);
        let maxScore = Object.keys(auditResults).length * 10;
        let percentage = (totalScore / maxScore) * 100;

        document.getElementById("scoreValue").textContent = `Score : ${totalScore} / ${maxScore} (Audit du ${auditDate})`;

        let needle = document.querySelector(".needle");
        let rotation = (percentage * 1.8) - 90; 
        needle.style.transform = `rotate(${rotation}deg)`;
    }
});