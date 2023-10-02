// DOM elements
const preGame = document.getElementById("pre-game");
const game = document.getElementById("game");
const gameEnd = document.getElementById("game-end");
const hiScore = document.getElementById("hi-score");
const timerElement = document.getElementById('countdown');
const startButton = document.getElementById('startButton');
const scoreDisplay = document.getElementById("finalScore");

// Game variables
var score = 0;
var timeLeft = 60;
var finalScore = 0;
let gameEnded = false;
let timeInterval;
const highScores = [];

// Quiz questions, an array of objects
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

// Sets up quiz when page loads so that the initial event listener is in place
function initializeQuiz() {
    startButton.addEventListener('click', startQuiz);
    document.getElementById("submitScore").addEventListener("click", submitScore);
    preGame.setAttribute("class", "is-active");
}

// Runs timer, activates game state, and calls renderQuiz for quiz content
function startQuiz() {
    countdown();
    startGame();
    renderQuiz();
}

// Dictates visibility of the game sections (start, end, high-score)
function startGame() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-active");
}

// What will be shown when the end-game is active
function endGame() {
    gameEnded = true;
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-active");
    console.log(finalScore);
    scoreDisplay.textContent = "Final Score: " + finalScore;
    document.getElementById("submitScore").style.display = "block";
}

// Creates a timer
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
        if (!gameEnded) {
            endGame();
        }
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
            }

            finalScore = score;

            // Displays feedback on the screen 
            gameContainer.appendChild(feedback);

            // Removes the previously answered question from the display
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

// When the Submit button is hit in the end game, stores userName input and score to a record and pushes to the highScores array
// Array is sorted by score, set to local storage, high scores are then viewed
function submitScore() {
    const userName = document.getElementById("userName").value;
    const userScore = finalScore;

    const userRecord = {
        name: userName,
        score: userScore,
    };

    highScores.push(userRecord);

    highScores.sort((a, b) => b.score - a.score);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    viewHiScore();

    console.log("Submit button clicked");
}

// Activates high score display, gets high score from local storage and displays in list form
// Back button will refresh the game
function viewHiScore() {
    preGame.setAttribute("class", "is-inactive");
    game.setAttribute("class", "is-inactive");
    gameEnd.setAttribute("class", "is-inactive");
    hiScore.setAttribute("class", "is-active");

    const hiScoreSection = document.getElementById("hi-score");
    hiScoreSection.innerHTML = "<h3>High Scores</h3";

    const storedHighScores = JSON.parse(localStorage.getItem("highScores")) || [];

    if (storedHighScores.length === 0) {
        hiScoreSection.innerHTML += "<p>No high scores yet</p>";
    } else {
        hiScoreSection.innerHTML += "<ol>";

        for (var i = 0; i < storedHighScores.length; i++) {
            const record = storedHighScores[i];
            hiScoreSection.innerHTML += `<li>${record.name}: ${record.score}</li>`;
        }

        hiScoreSection.innerHTML += "</ol>";
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Go Back";

    backButton.addEventListener("click", function() {
            window.location.reload();
    });

    hiScoreSection.appendChild(backButton);
}

window.addEventListener('load', initializeQuiz);