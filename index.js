const questions = [
    {
        question: "What is the fundamental unit of Quantum information",
        answers: [
            { text: "Qubit", correct: true},
            { text: "Quantum Byte", correct: false},
            { text: "Quanta", correct: false},
            { text: "Quantum Bit", correct: false},

        ]
    },
    {
        question: "What is the name of smallest country in the world",
        answers: [
            {text: "Nepal" , correct: false},
            {text: "Veticun city" , correct: true},
            {text: "pakistan" , correct: false},
            {text: "India" , correct: false},

        ]
    },
    {
        question: "how many days in a week",
        answers: [
            {text: "6" , correct: false},
            {text: "5" , correct: false},
            {text: "7" , correct: true},
            {text: "8" , correct: false},

        ]
    },
    {
        question: "What is the largest ocean on Earth",
        answers: [
            {text: "Pacific Ocean" , correct: true},
            {text: "Indian Ocean" , correct: false},
            {text: "Atlantic Ocean" , correct: false},
            {text: "Arctic Ocean" , correct: false},

        ]
    },
    {
        question: "Who is the father of computer science",
        answers: [
            {text: "Albert" , correct: false},
            {text: "Charles babbage" , correct: true},
            {text: "Openhiemer" , correct: false},
            {text: "Jagdish c. bose" , correct: false},

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ".  " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
        button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
   nextButton.style.display = "none";
   while (answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
   }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("inCorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore() {
   resetState();
   questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
   nextButton.innerHTML = "Play Again";
   nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
     showQuestion();
    }
    else {showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();
