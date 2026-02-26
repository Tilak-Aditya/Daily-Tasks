const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const studentId = document.getElementById("studentId").value.trim();
        const password = document.getElementById("password").value.trim();

        if (studentId === "STU176" && password === "1234") {
            window.location.href = "index.html";
        } else {
            alert("Invalid Credentials");
        }
    });
}

//logout function
function logoutBtn(){
    window.location.href="login.html";
}

const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
        answer: 0
    },
    {
        question: "Which language is used for styling?",
        options: ["HTML", "CSS", "Python", "C++"],
        answer: 1
    },
    {
        question: "Which is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: 0
    },
    {
        question: "Which tag is used for image?",
        options: ["<img>", "<image>", "<src>", "<pic>"],
        answer: 0
    },
    {
        question: "Which is backend language?",
        options: ["CSS", "HTML", "Node.js", "Bootstrap"],
        answer: 2
    },
    {
        question: "Inside which tag we write JS?",
        options: ["<javascript>", "<js>", "<script>", "<code>"],
        answer: 2
    },
    {
        question: "Which property changes text color?",
        options: ["font-color", "text-style", "color", "background"],
        answer: 2
    },
    {
        question: "Which symbol is used for id selector?",
        options: ["#", ".", "*", "&"],
        answer: 0
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Google", "Netscape", "Microsoft", "Apple"],
        answer: 1
    },
    {
        question: "Which method selects element by id?",
        options: ["querySelector", "getElementById", "getElements", "selectId"],
        answer: 1
    }
];


const questionEl = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const progress = document.getElementById("progress");
const currentQuestionEl = document.getElementById("currentQuestion");
const timerEl = document.getElementById("timer");

const reportCard = document.getElementById("reportCard");
const finalScore = document.getElementById("finalScore");
const retryBtn = document.getElementById("retryBtn");

let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let timeLeft = 60;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `00:${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;

        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function loadQuestion() {
    const current = questions[currentIndex];
    questionEl.textContent = current.question;
    currentQuestionEl.textContent = currentIndex + 1;

    options.forEach((btn, index) => {
        btn.textContent = current.options[index];
        btn.style.background = "white";
        btn.style.color = "#06011c";
    });

    selectedAnswer = null;
}

options.forEach(button => {
    button.addEventListener("click", () => {
        selectedAnswer = parseInt(button.dataset.index);

        options.forEach(btn => {
            btn.style.background = "white";
            btn.style.color = "#06011c";
        });

        button.style.background = "#06011c";
        button.style.color = "white";
    });
});

nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) {
        alert("Please select an answer!");
        return;
    }

    if (selectedAnswer === questions[currentIndex].answer) {
        score++;
    }

    currentIndex++;

    progress.style.width = (currentIndex / questions.length) * 100 + "%";

    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
});

submitBtn.addEventListener("click", () => {
    endQuiz();
});

function endQuiz() {
    stopTimer();

    document.querySelector(".questionContainer").style.display = "none";
    document.querySelector(".optionsContainer").style.display = "none";
    document.querySelector(".buttonSection").style.display = "none";

    reportCard.classList.remove("hidden");
    finalScore.textContent = `${score} / ${questions.length}`;
}

retryBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    timeLeft = 60;
    progress.style.width = "0%";
    timerEl.textContent = "01:00";

    document.querySelector(".questionContainer").style.display = "block";
    document.querySelector(".optionsContainer").style.display = "grid";
    document.querySelector(".buttonSection").style.display = "flex";

    reportCard.classList.add("hidden");

    loadQuestion();
    startTimer();
});

loadQuestion();
startTimer();