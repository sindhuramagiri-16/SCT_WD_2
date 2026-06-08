let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(time) {

    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0")
    );
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").addEventListener("click", () => {

    if (!running) {
        startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 100);

        running = true;
    }
});

document.getElementById("pause").addEventListener("click", () => {

    clearInterval(timerInterval);
    running = false;
});

document.getElementById("reset").addEventListener("click", () => {

    clearInterval(timerInterval);

    running = false;
    elapsedTime = 0;

    updateDisplay();

    laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {

    if (running) {

        const li = document.createElement("li");

        li.textContent =
            "Lap " +
            (laps.children.length + 1) +
            " - " +
            formatTime(elapsedTime);

        laps.prepend(li);
    }
});