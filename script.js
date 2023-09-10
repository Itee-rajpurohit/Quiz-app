const questions = [
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Creative Style Sheets", correct: false},
            {text: "Colorful Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Computer Style Sheets", correct: false},
        ]
    },
    {
        question: "In CSS, h1 can be called as?",
        answers: [
            {text: "Selector", correct: true},
            {text: "Value", correct: false},
            {text: "Attribute", correct: false},
            {text: "Tag", correct: false},
        ]
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        answers: [
            {text: "css", correct: false},
            {text: "text/style", correct: false},
            {text: "style", correct: true},
            {text: "script", correct: false},
        ]  
    },
    {
        question: " ____ has introduced text, list, box, margin, border, color, and background properties.",
        answers: [
            {text: "css", correct: true},
            {text: "html", correct: false},
            {text: "ajax", correct: false},
            {text: "php", correct: false},
        ]
    },
    {
        question: "Which is the correct CSS syntax?",
        answers: [
            {text: "{body;color:black}", correct: false},
            {text: "{body:color=black(body}", correct: false},
            {text: "body {color: black}", correct: true},
            {text: "body:color=black", correct: false},
        ]
    }
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

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "block";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();