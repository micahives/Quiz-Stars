var timerElement = document.getElementById('countdown');


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

