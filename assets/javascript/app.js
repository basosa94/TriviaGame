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

// Define variables for that will be used for trivia game 
var numberCorrect =0; 
var numberIncorrect=0;
var numberUnanswered=0;
var currentQuestion=0;
var timeRemaining;
var timerId;
var answered;
var userPick;

// Start Button Function
// 1. When start button is pressed questions with corresponding answer choices appear on the screen.
$("#start").on("click", function () {
    $(this).hide();
    askQuestions();
});

// Initialize Game Function
// 1. Resets variable values and div tags.
// 2. Calls upon askQuestions function to begin the quiz.
function InitializeGame() {
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
};

// Ask Questions Function
// 1. Empties the divs and asks current question with corresponding choices in the object array.
// 2. 30 second timer is running when question is asked. Variable answered is true as long as a choice is 
// chosen before the 30 seconds run out.
// 3. Timer is stopped when an answer is clicked.
// 4. Page immediately changes to the Solutions Page Function
function askQuestions() {

    $("#results").empty();
    $("#gif").empty();
    $("#correct-answer").empty();
    answered = true;

    $("#questionbox").text('Question ' +(currentQuestion + 1) +' of '+ questionsAndAnswers.length);
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

};

// Run Function
// 1. Run Function runs with the Decrement function to set a 30 second countdown timer on the current question page.
function run() {
    answered = true;
    timeRemaining=30;
    $("#time").html("<h3> Time Remaining: " + timeRemaining + " seconds </h3>");
    timerId=setInterval(decrement, 1000);
};

// Decrement Function
// 1. Working with the Run Function, the time remaining goes down by one.
// 2. If the time runs out, answered becomes false, the timer is cleared, and the solutions page is ran.
function decrement() {
    timeRemaining--;
    $("#time").html("<h3> Time Remaining: " + timeRemaining + " seconds </h3>");

    if (timeRemaining === 0) {
        answered = false;
        clearInterval(timerId);
        solutionsPage();
    }
};

// Solution Page Function
// 1. Divs containing text from askQuestions function are cleared
// 2. Function records number of correct, incorrect and unanswered using conditional statements.
// 3. Calls upon finalScore function if no more questions left
// 4. Calls upon askQuestions function if there are questions that haven't be answered.
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
    
};

// Final Score Function
// 1. Clears out the divs used for the solutionsPage function.
// 2. Records the number of correct, incorrect and unanswered questions.
// 3. Total-score is recorded by dividing numberCorrect by the length of the object array.
// 4. Shows a restart button so that it can be clicked and restart the quiz.
function finalScore() {
    $("#results").empty();
    $("#correct-answer").empty();
    $("#gif").empty();

    $("#results").text("All done, here's how you did!");
    $("#correct-answer").text("Correct Answers: " + numberCorrect);
    $("#incorrect-answer").text("Incorrect Answers: " + numberIncorrect);
    $("#unanswered").text("Unanswered: " + numberUnanswered);
    $("#total-score").text("Total Score: " + numberCorrect + "/" + questionsAndAnswers.length);
    $("#gif").html("<img src='assets/images/end.gif' width='300px'/>");
    $("#restartButton").addClass("btn btn-primary btn-lg")
	$('#restartButton').show();
	$('#restartButton').html('Restart');
};

// Restart Button Function
// 1. When restart is clicked, game is reset and trivia game starts back at question 1.
$("#restartButton").on("click", function() {
    $(this).hide();
    InitializeGame();
});