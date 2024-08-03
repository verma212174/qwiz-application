let quizData = [
    {
        question: "What is the capital of Italy?",
        options: ["Rome", "Berlin", "Madrid", "Paris"],
        answer: "Rome"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    },
    {
        question: "In which year did Christopher Columbus reach the Americas?",
        options: ["1492", "1520", "1607", "1620"],
        answer: "1492"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austin", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerdisplay=document.getElementById('timer');

let currentQuestionIndex = 0; 
let userAswer=[]
let timeLeft=59;
let timer;
submitButton.addEventListener('click', showQwizResult )
function nextQuestion() {
    
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
    else{
        clearInterval(timer);
        showQwizResult();
        timerdisplay.textContent="!!!"
    }
}

nextButton.addEventListener('click', nextQuestion);
startTimer();
displayQuestion();
function evaluateUserAnswer(){
 let score=0;
 quizData.forEach((question,index)=>{
    if(userAswer[index]===question.answer){
        score+=10;
    }
 })
 return score;
}
function updateTimer(){
    if(timeLeft>0){
        const seconds=timeLeft;
        const displaySecond=seconds<10 ? `0${seconds}`: seconds;
        timerdisplay.textContent=displaySecond;
        timeLeft--;
    }else{
        clearInterval(timer);
        timerdisplay.textContent='0'
        showQwizResult();
    }
}

function startTimer(){
    updateTimer()
    timer=setInterval(updateTimer,1000);
}


function showQwizResult(){
    clearInterval(timer)
    const userscore=evaluateUserAnswer();
    timerdisplay.textContent="!!!"
    scoreContainer.textContent=`Your Score: ${userscore} out of ${quizData.length*10}`;
}

function selectOption(answer) {
    const optionButtons = document.querySelectorAll('.quiz-option');
    optionButtons.forEach((button) => button.classList.remove("selected"));
    const selectedOption = optionsContainer.querySelector(`.quiz-option[data-option="${answer}"]`);
    selectedOption.classList.add('selected');
    userAswer[currentQuestionIndex]=answer;
}

function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    const optionLetters = ["A", "B", "C", "D"];
    currentQuestion.options.forEach((option, index) => {
        const optionContainer = document.createElement("div");

        optionContainer.classList.add("quiz-card");
        const optionLabel = document.createElement("span");
        optionLabel.textContent = optionLetters[index];
        optionLabel.classList.add("option-label");
        optionContainer.appendChild(optionLabel);

        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("quiz-option");
        optionContainer.appendChild(optionButton);
        optionsContainer.appendChild(optionContainer);

        optionButton.setAttribute("data-option", option);
        optionContainer.addEventListener('click', () => selectOption(option));
    });
}
