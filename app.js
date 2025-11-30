let display = document.getElementById("display");

// Append value
function appendValue(val) {
    display.innerText += val;
}

// Clear display
function clearDisplay() {
    display.innerText = "";
}

// Backspace
function backspace() {
    display.innerText = display.innerText.slice(0, -1);
}

/* ------------------- CALC ENGINE ------------------- */

function calculate() {
    try {
        let expr = display.innerText;

        expr = expr
            .replace(/sin\(/g, "Math.sin(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/log\(/g, "Math.log10(")
            .replace(/ln\(/g, "Math.log(")
            .replace(/\^/g, "**");

        let result = eval(expr);

        addToHistory(display.innerText, result);
        display.innerText = result;
    } catch {
        display.innerText = "Error";
    }
}

/* ------------------- HISTORY ------------------- */

function addToHistory(expr, result) {
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    history.unshift({ expr, result });
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("history") || "[]");
    let container = document.getElementById("history-list");
    container.innerHTML = "";

    history.forEach(item => {
        let div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `<p>${item.expr} = <b>${item.result}</b></p>`;
        container.appendChild(div);
    });
}

function clearHistory() {
    localStorage.removeItem("history");
    loadHistory();
}

loadHistory();

/* ------------------- SIDEBAR ------------------- */

document.getElementById("toggle-history").onclick = () => {
    document.getElementById("history-panel").classList.toggle("open");
};

/* ------------------- COPY RESULT ------------------- */

function copyResult() {
    navigator.clipboard.writeText(display.innerText);
    alert("Copied!");
}

/* ------------------- BMI ------------------- */

function openBMIPopup() {
    document.getElementById("bmi-popup").style.display = "flex";
}
function closeBMIPopup() {
    document.getElementById("bmi-popup").style.display = "none";
}
function calculateBMI() {
    let w = parseFloat(document.getElementById("bmi-weight").value);
    let h = parseFloat(document.getElementById("bmi-height").value) / 100;

    if (!w || !h) {
        document.getElementById("bmi-result").innerText = "Enter valid values.";
        return;
    }

    let bmi = (w / (h * h)).toFixed(2);
    document.getElementById("bmi-result").innerText = "BMI: " + bmi;
}

/* ------------------- AGE ------------------- */

function openAgeCalculator() {
    document.getElementById("age-popup").style.display = "flex";
}

function closeAgeCalculator() {
    document.getElementById("age-popup").style.display = "none";
}

function calculateAge() {
    let dob = document.getElementById("dob").value;
    if (!dob) {
        document.getElementById("age-result").innerText = "Enter DOB.";
        return;
    }

    let birth = new Date(dob);
    let today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    let mdiff = today.getMonth() - birth.getMonth();
    let ddiff = today.getDate() - birth.getDate();

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) age--;

    document.getElementById("age-result").innerText = "Age: " + age;
}
