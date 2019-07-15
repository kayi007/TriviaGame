// List of Variable Declaration
let timer = 30;
let correct = 0;
let incorrect = 0;
let unanswered = 0;
let clockRunning = false;
let correctAns;
let intervalId;
let index = 0;
// Computer Random Generated Number
// let qaIndex = Math.floor(Math.random() * questionsBank.length);
// A list of Questions & Answers
let questionsBank = [
    // 1
    {
        question: "Who is the only Disney princess with a tattoo?",
        answers: [
            {
                answer:"Moana",
                correct: false,
            },
            {
                answer:"Pocahontas",
                correct: true,
            },
            {
                answer:"Jasmine",
                correct: false,
            },
            {
                answer:"Merida",
                correct: false,
            }
        ]
    },
    // 2
    {
        question: "Which Disney movie was the first animated film in history to be nominated for a Best Picture at the Academy Awards?",
        answers:[
            {
                answer:"Beauty and the Beast",
                correct: true,
            },
            {
                answer:"Frozen",
                correct: false,
            },
            {
                answer:"Cinderella",
                correct: false,
            },
            {
                answer:"Hercules",
                correct: false,
            }
        ]
    },
    // 3
    {
        question:"Who is the youngest Disney villain?",
        answers:[
            {
                answer:"Mulan: Shan Yu",
                correct: false,
            },
            {
                answer:"Beauty and the Beast: Gaston",
                correct: false,
            },
            {
                answer:"The Lion King: Scar",
                correct: false,
            },
            {
                answer:"Frozen: Hans",
                correct: true,
            }
        ]
    },
    // 4
    {
        question:"Who visited Arendelle from another movie to be guests at Elsa's coronation in Frozen?",
        answers:[
            {
                answer:"Princess Fiona & Shrek",
                correct: false,
            },
            {
                answer:"King Fergus & Queen Elinor",
                correct: false,
            },
            {
                answer:"Rapunzel & Flynn",
                correct: true,
            },
            {
                answer:"Kristoff & Hans",
                correct: false,
            }
        ]
    },
    // 5
    {
        question:"Who was considered to play the role of Princess Tiana in the The Princess and the Frog?",
        answers:[
            {
                answer:"Beyoncé",
                correct: true,
            },
            {
                answer:"Alicia Keys",
                correct: false,
            },
            {
                answer:"Mariah Carey",
                correct: false,
            },
            {
                answer:"Leona Lewis",
                correct: false,
            }
        ]
    },
    // 6
    {
        question:"What was Walter Elias Disney's (the pioneer of Disney) favorite piece of animation?",
        answers: [
            {
                answer:"Hercules' rescue Meg from the Underworld",
                correct: false,
            },
            {
                answer:"Ariel's tail transformation",
                correct: false,
            },
            {
                answer:"Cinderella's dress transformation",
                correct: true,
            },
            {
                answer:"Peter Pan's Flying Scene",
                correct: false,
            }
        ]
    }
]
// MAIN PROCESS
// ==============================================================================
// This code will run as soon as the page loads
window.onload = function() {
    $("#main-content").hide();
    $("#gameOver").hide();
    $("#start").on("click", startGame);
    $("#answer1").on("click", checkAns);
    $("#answer2").on("click", checkAns);
    $("#answer3").on("click", checkAns);
    $("#answer4").on("click", checkAns);
};

// Start Game
function startGame() {
    $("header").hide();
    $("#gameOver").hide();
    $("#main-content").show();
    questionDisplay();
}

// miscellaneous functions
// Start count down and set clock to running
function run(){
    if(!clockRunning){
        intervalId = setInterval(decrement, 1000);
        clockRunning = true;
    }
}

function decrement(){
    timer--;
    $("#time").text(timer);
    if(timer === 0){
        stop();
        unansweredMsg();
        unanswered++;
    }
}

function stop() {
    clearInterval(intervalId);
    clockRunning = false;
}

function setCorrectAns(question){
    for(let i = 0; i < question.answers.length; i++){
        if(question.answers[i].correct === true)
        {
            correctAns = question.answers[i].answer;
        }
    }
}

function checkAns(){
    console.log(this);
    stop();
    let userAns = $(this).text();
    if(userAns === correctAns){
        correct++
        correctMsg();
    }else{
        incorrect++;
        incorrectMsg();
    }
}

function questionDisplay(){
    timer = 30;
    $("#time").text(timer);
    run();
    $("#answerDisplay").hide();
    $("#answer1").show();
    $("#answer2").show();
    $("#answer3").show();
    $("#answer4").show();
    if(index < questionsBank.length){
        let currentQuestion = questionsBank[index];
        $("#question").text(currentQuestion.question);
        $("#answer1").text(currentQuestion.answers[0].answer);
        $("#answer2").text(currentQuestion.answers[1].answer);
        $("#answer3").text(currentQuestion.answers[2].answer);
        $("#answer4").text(currentQuestion.answers[3].answer);
        setCorrectAns(currentQuestion);
    }
    else{
        gameOver();
    }
}

// Result Messages
function correctMsg(){
    $(".a-box").hide();
    $("#question").text("Yay! That's Correct!");
    $("#answerDisplay").show();
    $("#answerDisplay").text(correctAns);
    index++;
    setTimeout(questionDisplay, 3000);
}

function unansweredMsg(){
    $(".a-box").hide();
    $("#question").text("Awww... You Missed it! Here's the correct answer!");
    $("#answerDisplay").show();
    $("#answerDisplay").text(correctAns);
    index++;
    setTimeout(questionDisplay, 3000);
}

function incorrectMsg(){
    $(".a-box").hide();
    $("#question").html("Yikes! Wrong Answer! <br /> Correct Answer is: ");
    $("#answerDisplay").show();
    $("#answerDisplay").text(correctAns);
    index++;
    setTimeout(questionDisplay, 3000);
}

// Game Over
function gameOver(){
    stop();
    $("#main-content").hide();
    $("#gameOver").show();
    $("#correctAns").text(correct);
    $("#incorrectAns").text(incorrect);
    $("#unanswered").text(unanswered);
    $("#replay").on("click", resetGame);
}

function resetGame(){
    timer = 30;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    index = 0;
    startGame();
}
