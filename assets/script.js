var timerElement = document.getElementById('countdown');

var startButton = document.getElementById('startButton');

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
});

function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            timerElement.textContent = "Time remaining: " + timeLeft;

            timeLeft--;
        } else {

            clearInterval(timeInterval);
            // Want to add red font/box flashing around timer when it is the last 10 seconds

        }


    }, 1000);
}

// For loop through quiz content in js that renders a different set of questions each time a button is clicked

