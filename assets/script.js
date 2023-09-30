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
        options: ["Object", "NULL", "String", "Boolean"],
        answer: "Object"      
    },
    {
        question: "What does 'NaN' mean in JavaScript?",
        options: ["Not a name", "Not a number", "Not a node", "Need a number"],
        answer: "Not a number"      
    }, 
    {
        question: "What is the syntax for selecting a random index of an array?",
        options: ["Math.floor(Math.random() * array.length);", "Math.random() * array.length;", "Math.random(array);", "Math.random(array.length);"],
        answer: "Math.floor(Math.random() * array.length);"      
    },
    {
        question: "Which best defines a 'for' loop in JavaScript?",
        options: ["Loops through the properties of an object", "Loops through a block of code a number of times", "Loops through a block of code while a specified condition is true", "Loops through the values of an iterable object"],
        answer: "Loops through a block of code a number of times"      
    },
    {
        question: "Can a variable that is defined within a function be used outside the function in JavaScript?",
        options: ["Yes", "No"],
        answer: "No"      
    },
    {
        question: "Which JavaScript array method adds an element to the beginning of an array?",
        options: [".push()", ".shift()", ".unpush()", ".unshift()"],
        answer: ".unshift()"      
    },
    {
        question: "Is the JSON format text only?",
        options: ["Yes", "No"],
        answer: "Yes"      
    },
    {
        question: "What does the JavaScript 'this' keyword refer to?",
        options: ["An object", "A function", "An Array", "A method"],
        answer: "An object"      
    }, 
]

startButton.addEventListener('click', function() {
    startButton.disabled = true;
    countdown();
    startGame();
    renderQuiz();
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

// This function will generate a random quiz question and displays it in the UI
function renderQuiz() {

    // Gets a random index from quizQuestions and selects the question at that index
    var randomIndex = Math.floor(Math.random()* quizQuestions.length);
    var randomQuestion = quizQuestions[randomIndex];

    // Creates h3 element for the random quiz question
    var questionTitle = document.createElement("h3");
    questionTitle.textContent = randomQuestion.question;

    // Creates list to hold options for the question
    var optionsList = document.createElement("ul");

    randomQuestion.options.forEach(function (optionText) {

        var optionItem = document.createElement("li");

        var optionButton = document.createElement("button");
        optionButton.textContent = optionText;

        optionButton.addEventListener('click', function() {
            if (optionText === randomQuestion.answer) {

            } else {

            }

            optionsList.querySelectorAll('button').forEach(function (button) {
                button.disabled = true;
            });
        });

        optionItem.appendChild(optionButton);

        optionsList.appendChild(optionItem);
    });

    // Appends random question to the "game" container
    var gameContainer = document.getElementById("game");
    gameContainer.appendChild(questionTitle);
    gameContainer.appendChild(optionsList);
}
