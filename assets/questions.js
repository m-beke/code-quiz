//Variables to be used    
var beginTimer = document.querySelector(".begin");
var time = document.querySelector("#timer");
var secondsLeft = 60;
var timerInterval = 0;
var score = 0;
var penalty = 10;
var questionIndex = 0;
var start = document.querySelector("#start");
var createList = document.createElement("ul");


//Array containing quiz questions
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
    {
        title: "What tool can be useful for debugging while working in Javascript?",
        choices: ["Console Log", "Git Bash", "Bug Spray", "None of the Above"],
        answer: "Console Log"
    },
    {
        title: "What does DRY stand for?",
        choices: ["Don't Rush Yourself", "Don't Really Yell", "Don't Repeat Yourself", "Do Rhinos Yelp"],
        answer: "Don't Repeat Yourself"
    },
]


//Displays questions once the begin button has been clicked
function showQuestions(questionIndex) {
    start.innerHTML = "";
    createList.innerHTML = "";

    for (var i = 0; i < possibleQuestions.length; i++) {
        var displayQuestion = possibleQuestions[questionIndex].title;
        var displayChoices = possibleQuestions[questionIndex].choices;
        start.textContent = displayQuestion;
    }

    displayChoices.forEach(function (choices) {
        var choiceButton = document.createElement("button");
        choiceButton.type = "button";
        choiceButton.className = "btn btn-primary";
        choiceButton.textContent = choices;
        start.appendChild(createList);
        createList.appendChild(choiceButton);
        choiceButton.addEventListener("click", (checkAnswer));
    })
}


//Starts the quiz timer
beginTimer.addEventListener("click", function () {
    if (timerInterval === 0) {
        timerInterval = setInterval(function () {
            secondsLeft--;
            time.textContent = secondsLeft;

            if (secondsLeft <= 0) {
                endQuiz();
                clearInterval(timerInterval);
                time.textContent = "Time's up!";
            }
        }, 1000);
    }
    showQuestions(questionIndex);
});


//Checks user's answer with the correct anwser
function checkAnswer(event) {
    var chosenAnswer = event.target;
    var showResult = document.createElement("div");
    var showScore = document.createElement("h2");

    // Remove any previous alerts
    var existingAlert = start.querySelector(".alert");
    if (existingAlert) {
        existingAlert.remove();
    }

    if (chosenAnswer.matches("button")) {
        start.appendChild(showResult);

        if (chosenAnswer.textContent == possibleQuestions[questionIndex].answer) {
            score += 10;
            showResult.className = "alert alert-success result";
            showResult.role = "alert";
            showResult.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            showResult.className = "alert alert-danger result";
            showResult.role = "alert";
            showResult.textContent = "Incorrect. The correct answer is " + possibleQuestions[questionIndex].answer;
        }

        // Display the result for a brief moment, then move to the next question
        setTimeout(function() {
            questionIndex++; // Move to next question

            if (questionIndex >= possibleQuestions.length) {
                endQuiz();
                showResult.textContent = ""; // Clear the alert when the quiz ends
                start.appendChild(showScore);
                showScore.textContent = "You got " + score + " points!";
            } else {
                showQuestions(questionIndex); // Show next question
            }
        }, 1500); // Adjust the delay time (1500ms = 1.5 seconds)
    }
}



//Ends the quiz once the timer is up
function endQuiz() {
    start.innerHTML = "";
    time.innerHTML = "";

    var endingHeader = document.createElement("h1");
    start.appendChild(endingHeader);
    endingHeader.className = "end-header";
    endingHeader.textContent = "Quiz Over";

    if (secondsLeft > 0) {
        score = score + secondsLeft;
    }

    var initialsPrompt = document.createElement("h3");
    start.appendChild(initialsPrompt);
    initialsPrompt.textContent = "Enter your initials to save your high score!"

    var enterInitials = document.createElement("input");
    enterInitials.setAttribute("type", "text");
    enterInitials.textContent = "";
    start.appendChild(enterInitials);

    var submitInitials = document.createElement("button");
    submitInitials.textContent = "Submit";
    start.appendChild(submitInitials);

    submitInitials.addEventListener("click", function () {
        var initials = enterInitials.value;
        var submitScore = {
            initials: initials,
            score: score
        }

        if (initials === null) {
            console.log("ERROR: Please enter your initials");
        } else {
            console.log(submitScore);
            var storedScores = localStorage.getItem("storedScores");
            if (storedScores === null) {
                storedScores = [];
            } else {
                storedScores = JSON.parse(storedScores);
            }
            storedScores.push(submitScore);

            var storeNew = JSON.stringify(storedScores);
            localStorage.setItem("storedScores", storeNew);

            window.location.replace("./assets/highscores.html");
        }
    });
}





