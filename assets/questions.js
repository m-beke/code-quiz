var beginTimer = document.querySelector("#begin");
var time = document.querySelector("#timer");
var secondsLeft = 60;
var timerInterval = 0;
var score = 0;
var questionIndex = 0;
var start = document.querySelector("#start");
var createList = document.createElement("ul");

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

function showQuestions(questionIndex) {
    start.innerHTML = "";
    createList.innerHTML = "";

    for (var i = 0; i < possibleQuestions.length; i++) {
        var displayQuestion = possibleQuestions[questionIndex].title;
        var displayChoices = possibleQuestions[questionIndex].choices;
        start.textContent = displayQuestion;
    }

    displayChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        start.appendChild(createList);
        createList.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

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
    showQuestions(questionIndex);
});



