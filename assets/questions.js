var beginTimer = document.querySelector("#begin");
var time = document.querySelector("#timer");
var secondsLeft = 60;
var timerInterval = 0;


beginTimer.addEventListener("click", function() {
    if (timerInterval === 0) {
        timerInterval = setInterval(function() {
            secondsLeft--;
            time.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
});