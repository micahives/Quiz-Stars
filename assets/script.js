// DOM elements
const preGame = document.getElementById("pre-game");
const game = document.getElementById("game");
const gameEnd = document.getElementById("game-end");
const hiScore = document.getElementById("hi-score");
const timerElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');

// Game variables
var score = 0;
var timeLeft = 60;
var finalScore = 0;
let gameEnded = false;

// Array of objects, each containing a question with multiple choices and the correct answer
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
    }
]

// Hit 'Start Quiz!'
startButton.addEventListener('click', startQuiz);

// Runs timer and quiz functions
function startQuiz() {
    finalScore = 0;
    startButton.disabled = true;
    countdown();
    startGame();
    renderQuiz();
}

// Dictates visibility of the game sections (start, end, high-score)
function startGame() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-active");
}

function endGame() {
    gameEnded = true;
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-active");
    console.log(finalScore);
    
    const scoreDisplay = document.getElementById('finalScore');
    scoreDisplay.textContent = "Final Score: " + finalScore;
}

function viewHiScore() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-inactive");
    hiScore.setAttribute("class", "is-active");
}

function countdown() {
    timeLeft = 60;

    const timeInterval = setInterval(function () {
        // If the game hasn't ended, keep the timer going
        if (gameEnded) {
            clearInterval(timeInterval);
            return;
        }

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            endGame();
        } else {
            timerElement.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
        }
    }, 1000);
}

// Generates a random quiz question and displays a list of multiple choices
function renderQuiz() {
    // Variable to later append and display quiz renderings
    const gameContainer = document.getElementById("game");

    if (quizQuestions.length === 0 || timeLeft <= 0) {
        endGame();
        return;
    }

    // Gets a random index from quizQuestions and selects the question at that index.
    // Removes from question pool by splicing at the selected index. Avoids repeat questions.
    const randomIndex = Math.floor(Math.random()* quizQuestions.length);
    const randomQuestion = quizQuestions.splice(randomIndex, 1)[0];

    // Creates h3 element for the random quiz question
    const questionTitle = document.createElement("h3");
    questionTitle.textContent = randomQuestion.question;

    // Creates list to hold options for the question
    const optionsList = document.createElement("ul");

    // For each question, creates a list item within the list (as a button) for each option in the options array within quizQuestions
    randomQuestion.options.forEach(function (optionText) {

        const optionItem = document.createElement("li");

        const optionButton = document.createElement("button");
        optionButton.textContent = optionText;

        // When option button is clicked, compare the selection with the answer value
        optionButton.addEventListener('click', function() {
            // Creates variable as an <h3> to display 'Correct!' if the answer matches, else 'Incorrect.'
            const feedback = document.createElement("h3");

            if (optionText === randomQuestion.answer) {
                score++;
                feedback.textContent = "Correct!";
                feedback.style.color = "green";
            } else {
                timeLeft -= 10;
                feedback.textContent = "Incorrect.";
                feedback.style.color = "red";

                if (score > 0) {
                    score -= 1;
                }
            }

            finalScore = score + timeLeft;

            // Displays feedback on the screen 
            gameContainer.appendChild(feedback);

            questionTitle.remove();
            optionsList.remove();

            // Feedback is displayed to the user for one second, then removes feedback and continues to render quiz as long as questions remain
            setTimeout(function() {
                feedback.remove();
            if (quizQuestions.length > 0) {
                renderQuiz();
            } else {
                endGame();
            }
        }, 1000);
    });

    // Within the forEach function that renders the list items, appends the options to their respective element
        optionItem.appendChild(optionButton);
        optionsList.appendChild(optionItem);

    });

    // Appends random question to the "game" container
    gameContainer.appendChild(questionTitle);
    gameContainer.appendChild(optionsList);
}
