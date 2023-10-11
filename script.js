
// Define an array of quiz questions, each question has a number, text, correct answer, and options.
const questions = [
    {
        numb: 1,
        question: "1.) What does CPU stand for in computer engineering?",
        answer: "a) Central Processing Unit",
        options: [
            "a) Central Processing Unit",
            "b) Computer Personal Unit",
            "c) Central Peripheral Unit",
            "d) Computer Power Unit",
            "e) Central Programming Unit"
        ]
    },
    {
        numb: 2,
        question: "2.) Which of the following is not a programming language used in computer engineering?",
        answer: "c) HTML",
        options: [
            "a) Python",
            "b) Java",
            "c) HTML",
            "d) C++",
            "e) Ruby"
        ]
    },
    {
        numb: 3,
        question: "3.) True or False: RAM (Random Access Memory) is a type of volatile memory used in computers.",
        answer: "a) True",
        options: [
            "a) True",
            "b) False"
        ]
    },
    {
        numb: 4,
        question: "4.) In digital electronics, the basic building block of all digital circuits is the _______.",
        answer: "a) Transistor",
        options: [
            "a) Transistor",
            "b) Capacitor",
            "c) Resistor",
            "d) Diode",
            "e) Inverter"
        ]
    },
    {
        numb: 5,
        question: "5.) Solve the following binary addition problem: 1101 and 1010",
        answer: "a) 10111",
        options: [
            "a) 10111",
            "b) 10011",
            "c) 11101",
            "d) 10101",
            "e) 11000"
        ]
    }
];


// Get references to various HTML elements using DOM manipulation.
const interfaceContainer = document.querySelector(".interface");
const ruleBox = document.querySelector(".rule_box");
const startButton = document.getElementById("start-button");
const quitButton = document.getElementById("quit-button");
const quizContainer = document.querySelector(".quiz-container");
const startQuizButton = document.getElementById("start-quiz");
const restartButton = document.getElementById("restart-quiz");
const exitButton = document.getElementById("exit-quiz");

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const countdownElement = document.getElementById("countdown");
const submitButton = document.getElementById("submit-button");
const iconElement = document.getElementById("icon");
const greetElement = document.getElementById("greet");
const resultElement = document.getElementById("result");
const restartExitButtons = document.getElementById("restart-exit-buttons");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let quizStarted = false;

// Function to start the quiz.
function startQuiz() {
     // Reset variables and hide/show elements to start a new quiz.
    currentQuestionIndex = 0;
    score = 0;
    submitButton.style.display = "block";
    iconElement.style.display = "none";
    greetElement.style.display = "none";
    resultElement.style.display = "none";
    restartExitButtons.style.display = "none";
    showQuestion();
    quizStarted = true;
}

// Function to display a question.
function showQuestion() {
    clearInterval(timer); // Clear the previous timer

    // Get the current question.
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;

    // Populate the answer options for the question.
    optionsElement.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.innerHTML = `<input type="radio" name="answer" value="${option}">${option}`;
        optionsElement.appendChild(optionElement);
    });

     // Reset the timer and display it.
    timeLeft = 15; 
    timerElement.style.display = "block"; // Show the timer
    startTimer();
}

// Function to calculate the score for the current question.
function calculateScore() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestionIndex].answer) {
            score++;
        }
    }
}

// Function to display the final quiz result.
function showResult() {
    questionContainer.style.display = "none";
    submitButton.style.display = "none"; // Corrected the typo here
    timerElement.style.display = "none"; // Hide the timer
    iconElement.style.display = "block";
    greetElement.style.display = "block";
    greetElement.innerHTML = 'Congratulations! You have completed the challenge!'
    resultElement.style.display = "block";
    resultElement.innerText = `You scored ${score} out of ${questions.length} questions.`;
    restartExitButtons.style.display = "block";
}

// Function to start the timer.
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        countdownElement.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            submitButton.click(); // Auto-submit if time is up
        }
    }, 1000);
}


// Event listeners for buttons and user interactions.
// Start the quiz when the start button is clicked.
startButton.addEventListener("click", () => {
    interfaceContainer.style.display = "none";
    ruleBox.style.display = "block";
});

// Start the quiz challenge when the start quiz button is clicked.
startQuizButton.addEventListener("click", () => {
    ruleBox.style.display = "none";
    quizContainer.style.display = "block";
    startQuiz();
});

// Restart the quiz when the restart button is clicked.
restartButton.addEventListener("click", () => {
    startQuiz(); // Call the startQuiz function to reset the quiz
    if (quizStarted) {
        questionContainer.style.display = "block"; // Display the question container
        submitButton.style.display = "block"; // Display the submit button
        showQuestion(); // Call showQuestion() if quizStarted is true
        iconElement.style.display = "none";
        greetElement.style.display = "none";
        resultElement.style.display = "none"; // Hide the result element
        restartExitButtons.style.display = "none"; // Hide the restart-exit buttons
    }
});

// Reload the page when the exit button is clicked.
exitButton.addEventListener("click", () => {
    window.location.reload();
});

// Quit the challenge and return to the start screen.
quitButton.addEventListener("click", () => {
    ruleBox.style.display = "none";
    interfaceContainer.style.display = "block";
});

// Handle the submit button click event.
submitButton.addEventListener("click", () => {
    calculateScore();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});