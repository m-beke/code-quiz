var scores = document.querySelector("#scores");
var clear = document.querySelector("#clear");
var storedScores = localStorage.getItem("storedScores");

storedScores = JSON.parse(storedScores);

if (storedScores !== null) {
    for (var i = 0; i < storedScores.length; i++) {
        var scoreboard = document.createElement("li");
        scoreboard.textContent = storedScores[i].initials + " - " + storedScores[i].score;
        scores.appendChild(scoreboard);
    }
}

clear.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});
