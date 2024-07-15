const questions = [
    {
        question: "what is the capital of UP?",
        answers: [
            { text: "Agra" , correct: false},
            { text: "Delhi" , correct: false },
            { text: "Lucknow" , correct: true},
            { text: "Odissa" , correct: false},
        ]
    },

    {
        question: "what is the full form of BTS?",
        answers: [
            { text: "Behind The Scene" , correct: false},
            { text: "Bangtan Sonyeondan" , correct: true },
            { text: "Better Than Sister" , correct: false},
            { text: "Beyond The Scene" , correct: false},
        ]
        
    },

    {
        question: "Which is the national bird od India?",
        answers: [
            { text: "Sparrow" , correct: false},
            { text: "Crow" , correct: false },
            { text: "Parrot" , correct: false},
            { text: "Peacock" , correct: true},
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
    questionElement.innerHTML = questionNo + ". "  + currentQuestion.
    question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener ("click", selectAnswer);
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

    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextButton.style.display ="block";
}



function showScore(){
    resetState();
    questionElement.innerHTML = `You Got ${score} from ${questions.length}!`;
    nextButton.innerHTML = " Let's try again";
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
})

startQuiz();