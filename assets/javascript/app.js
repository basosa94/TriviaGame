// Define questions and answers in an array of Objects

var questionsAndAnswers = [{
    question: "How many children does Bob have?",
    answer:["1","2","3","4"],
    answerIndex:2
    },{ 
    question:"What type of restaurant does Bob run?",
    answer:["Thai restaurant", "Hamburger restaurant", "Sushi restaurant", "Italian restaurant"],
    answerIndex:1
    },{
    question: "What is the name of Bob's wife?",
    answer: ["Laura", "Tina", "Nancy", "Linda"],
    answerIndex:3
    },{
    question: "What is the name of the permanent business next door to the restaurant?",
    answer:["It's Your Funeral Home & Crematorium", "The Krabby Patty", "Jimmy Pesto's Pizzeria", "Falafel on a Waffle"],
    answerIndex:0
    },{
    question: "What is the name of the organization that Tina and Louise were once a part of?",
    answer: ["Girl Scouts", "Lightning Scouts", "Thundergirls", "Lightning Girls"],
    answerIndex:2
    },{
    question: "Which of these characters is not a Pesto child?",
    answer: ["Ollie","Tammy", "Jimmy Jr.", "Andy"],
    answerIndex:1
    },{
    question: "What is the name of Linda's sister?",
    answer: ["Gayle","Cindy", "Martha","Jamie"],
    answerIndex:0
    },{
    question:"What is the name of school that the Belcher children attend?",
    answer:["Logan", "Ridgecrest", "Wagstaff", "Berkeley"],
    answerIndex:2
    }];

// Define variables for game 
var numberCorrect =0; 
var numberIncorrect=0;
var numberUnanswered=0;
var currentQuestion=0;
var timeRemaining;
var timerId;
var answered;
var userPick;


//Start function for button so that questions appear
$("#start").on("click", function () {
    $(this).hide();
    askQuestions();
});

function InitializeGame(){;
// Reset variables and load first question
numberCorrect=0; 
numberIncorrect=0;
numberUnanswered=0;
currentQuestion=0;
$("#results").empty();
$("#correct-answer").empty();
$("#incorrect-answer").empty();
$("#unanswered").empty();
$("#total-score").empty();
$("#gif").empty();
askQuestions();
}

function askQuestions(){
    $("#results").empty();
    $("#gif").empty();
    $("#correct-answer").empty();
    answered = true;
    $("#questionbox").html('<h3> Question ' +(currentQuestion + 1) +' of '+ questionsAndAnswers.length + '</h3>');
    $("#question").html('<h2>' + questionsAndAnswers[currentQuestion].question + '</h2>')
    for(var i=0; i<questionsAndAnswers[currentQuestion].answer.length; i++){
        var answerChoice =$('<div>');
        answerChoice.text(questionsAndAnswers[currentQuestion].answer[i]);
        answerChoice.attr({'data-index': i });
		answerChoice.addClass('possibleChoice');
		$('#choices').append(answerChoice);
    }

    run();

    $(".possibleChoice").on("click" , function() {
        clearInterval(timerId);
        userPick=$(this).data('index');
        solutionsPage();
    });

}

// Set up timer for each question
function run() {
    answered = true;
    timeRemaining=30;
    $("#time").html("<h2> Time Remaining:" + timeRemaining + "</h2>");
    timerId=setInterval(decrement, 1000);
};

function decrement(){
    timeRemaining--;
    $("#time").html("<h2> Time Remaining:" + timeRemaining + "</h2>");

    if (timeRemaining === 0) {
        answered = false;
        //  ...run the stop function.
        clearInterval(timerId);

        solutionsPage();
    }
}

function solutionsPage() {

    $("#questionbox").empty();    
    $("#question").empty();
    $("#choices").empty();

    if ((userPick === questionsAndAnswers[currentQuestion].answerIndex) && (answered === true)) {
        numberCorrect++;
        $("#results").text("Correct!")
        $("#gif").html("<img src='assets/images/giphy.webp' width='300px'/>")
    } else if ((userPick !== questionsAndAnswers[currentQuestion].answerIndex) && (answered === true)){
        numberIncorrect++;
        $("#results").text("Incorrect!")
        $("#correct-answer").text("Correct answer was " + questionsAndAnswers[currentQuestion].answer[questionsAndAnswers[currentQuestion].answerIndex] + "!");
        $("#gif").html("<img src='assets/images/bobs-omg.gif' width='300px'/>")
    } else {
        numberUnanswered++;
        $("#results").text("Ran out of time!")
        $("#correct-answer").text("Correct answer was " + questionsAndAnswers[currentQuestion].answer[questionsAndAnswers[currentQuestion].answerIndex] + "!");
        answered=true;
        $("#gif").html("<img src='assets/images/tenor.gif' width='300px'/>")
    }

    if (currentQuestion === (questionsAndAnswers.length-1)){
        setTimeout(finalScore, 3000);

    } else {
        currentQuestion++;
        setTimeout(askQuestions, 3000);
    }
    
}

function finalScore(){
    $("#results").empty();
    $("#correct-answer").empty();
    $("#gif").empty();

    $("#results").text("All done, here's how you did!");
    $("#correct-answer").text("Correct Answers: " + numberCorrect);
    $("#incorrect-answer").text("Incorrect Answers: " + numberIncorrect);
    $("#unanswered").text("Unanswered: " + numberUnanswered);
    $("#total-score").text("Total Score: " + numberCorrect + "/" + questionsAndAnswers.length);
    $("#gif").html("<img src='assets/images/end.gif' width='300px'/>");
	$('#restartButton').show();
	$('#restartButton').html('Restart');
}

// restartButton
$("#restartButton").on("click", function(){
    $(this).hide();
    InitializeGame();
});