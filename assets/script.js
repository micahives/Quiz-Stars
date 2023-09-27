var timerElement = document.getElementById('countdown');

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
        question: "What of the following is not a primitive data type in JavaScript?",
        options: ["object", "NULL", "String", "Boolean"],
        answer: "object"      
    }
]


function countdown() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {
        if (timeLeft >= 0) {
            timerElement.textContent = "Time remaining: " + timeLeft;

            timeLeft--;
        } else {

            clearInterval(timeInterval);

        }


    }, 1000);
}

