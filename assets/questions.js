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

var possibleQuestions = [
    {
        title: "Which one of these is NOT a Javascript data type?",
        choices: ["String", "Boolean", "Number", "Header"],
        answer: "Header"
    },
    {
        title: "Which symbol is used to enclose an array?",
        choices: ["{}", "()", "[]", "``"],
        answer: "[]"
    },
    {
        title: "What is a function?",
        choices: ["A block of code designed to perform a particular task", "zero or more characters written inside quotes", "a special variable, which can hold more than one value", "a format for storing and transporting data"],
        answer: "A block of code designed to perform a particular task"
    },
]