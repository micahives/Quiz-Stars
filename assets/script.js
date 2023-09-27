var timerElement = document.getElementById('countdown');

var startButton = document.getElementById('startButton');

var homeContent = document.getElementById('homeContent');

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
    homeContent.style.display = 'none';

    countdown();
});

function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            timerElement.textContent = "Time Remaining: " + timeLeft;

            timeLeft--;
        } else {

            clearInterval(timeInterval);
            // Want to add red font/box flashing around timer when it is the last 10 seconds

        }


    }, 1000);
}

// When the user hits the "Start Quiz!" button, runs this function
function runQuiz() {
    // For loop through quiz content in js that renders a different set of questions each time a button is clicked
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

renderQuiz();
