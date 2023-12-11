const $ = (selector) => document.querySelector(selector);

const h = $(".hour");
const m = $(".min");
const s = $(".sec");
const ms = $(".ms");
const start = $(".start");
const pause = $(".pause");
const reset = $(".reset");
const laps = $(".lap");
const container = $(".laps");
const dots = document.querySelectorAll(".dots");

let isRunning = false;
let second = 0;
let minute = 0;
let hours = 0;
let milliSecond = 0;

function timer() {
    milliSecond++;
    if (milliSecond == 100) {
        second++;
        milliSecond = 0;
    }
    if (second == 60) {
        minute++;
        second = 0;
    }
    if (minute == 60) {
        hours++;
        minute == 0;
    }

    if (isRunning) {
        setTimeout(timer, 10);
        h.innerHTML = pad(hours);
        m.innerHTML = pad(minute);
        s.innerHTML = pad(second);
        ms.innerHTML = pad(milliSecond);
        start.classList.add("d-none");
        pause.classList.remove("d-none");
    }
}
function pad(number) {
    return number < 10 ? "0" + number : number.toString();
}
start.addEventListener("click", () => {
    isRunning = true;
    timer();
    dots.forEach((dot) => {
        dot.setAttribute("style", "animation: 2s animate ease-in-out infinite");
    });
});
pause.addEventListener("click", () => {
    pause.innerHTML = pause.innerHTML == "Pause" ? "Resume" : "Pause";
    isRunning = !isRunning;
    if (isRunning) {
        timer();
        dots.forEach((dot) => {
            dot.setAttribute("style", "animation: 2s animate ease-in-out infinite");
        });
    } else {
        dots.forEach((dot) => {
            dot.setAttribute("style", "animation: none");
        });
    }
});
reset.addEventListener("click", () => {
    isRunning = false;
    second = 0;
    minute = 0;
    hours = 0;
    milliSecond = 0;
    h.innerHTML = pad(0);
    m.innerHTML = pad(0);
    s.innerHTML = pad(0);
    ms.innerHTML = pad(0);
    pause.innerHTML = "Pause";
    start.classList.remove("d-none");
    pause.classList.add("d-none");
    container.innerHTML = "";
});

laps.addEventListener("click", () => {
    const p = document.createElement("p");
    p.classList.add("display-6");
    p.innerHTML = `${pad(hours)}:${pad(minute)}:${pad(second)}:${pad(milliSecond)}`;
    if (container.hasChildNodes()) {
        container.insertBefore(p, container.querySelectorAll("p")[0]);
    } else {
        container.appendChild(p);
    }
    if (container.childNodes.length > 5) {
        container.querySelectorAll("p")[5].remove();
    }
});
