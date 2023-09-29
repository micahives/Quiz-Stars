var preGame = document.getElementById("pre-game");
var game = document.getElementById("game");
var gameEnd = document.getElementById("game-end");
var hiScore = document.getElementById("hi-score");

var timerElement = document.getElementById('countdown');
var startButton = document.getElementById('startButton');

var score = 0;

const quizQuestions = [
    {
        question: "What HTML element is used to embed JavaScript code?",
        options: ["<footer>", "<src>", "<script>", "<js>"],
        answer: "<script>"
    },
    {
        question: "Which of the following keywords is not used to declare a variable in JavaScript?",
        options: ["var", "let", "const", "All options declare a variable"],
        answer: "All options declare a variable"
    },
    {
        question: "Which of the following is not a primitive data type in JavaScript?",
        options: ["object", "NULL", "String", "Boolean"],
        answer: "object"      
    }
]

startButton.addEventListener('click', function() {
    startButton.disabled = true;
    countdown();
    startGame();
});

function startGame() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-active");
}

function endGame() {
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-active");
}

function viewHiScore() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-inactive");
    hiScore.setAttribute("class", "is-active");
}

function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            timerElement.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
        }
    }, 1000);
}

// This function will generate a random quiz question and that question will display as the UI
function renderQuiz() {
    var randomIndex = Math.floor(Math.random() * quizQuestions.length);
    var randomQuestion = quizQuestions[randomIndex];
    var randomQuestionEl = document.getElementById(randomQuestion.question);


    // Display the random question as an h3 tag on the page
    var questionTitle = document.createElement("h3");
    questionTitle.textContent = randomQuestion.question;
    console.log(randomQuestion.question);
}

