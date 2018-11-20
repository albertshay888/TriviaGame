// Initialize variables
var correct = 0;
var incorrect = 0;
var skipped = 0;
var index = 0;
var time = 12;
var currentQuestion = '';
var currentChoices = [];
var clock;
var timeoutVar;
var waitBetweenQuestions = 4000; // make this smaller for debugging/testing purposes

// Questions and answers
var questions = [
    {
        question: "Which unicorn is trying to allow its hosts to also own equity in the company?",
        choices: ['Uber', 'Airbnb', 'Lyft', 'Udemy'],
        correct: 1,
        pic: "assets/images/airbnb.gif"
    },
    {
        question: "Which tech giant owns the live video game streaming platform, Twitch?",
        choices: ['Amazon', 'Google', 'Apple', 'Facebook'],
        correct: 0,
        pic: "assets/images/amazon.gif"
    },
    {
        question: "Which company IPOed first?",
        choices: ["Google", "Microsoft", "Amazon", "Apple"],
        correct: 3,
        pic: "assets/images/apple.gif"
    },
    {
        question: "Which JS framework did Google first create?",
        choices: ['React', 'Angular', 'Node', 'Vue'],
        correct: 1,
        pic: "assets/images/angular.gif"
    },
    {
        question: 'Which tech giant is the youngest?',
        choices: ['Amazon', 'Google', 'Apple', 'Facebook'],
        correct: 3,
        pic: "assets/images/facebook.gif"
    },
    {
        question: "Which company owns github?",
        choices: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
        correct: 2,
        pic: "assets/images/microsoft.gif"
    },
    {
        question: "Which US unicorn has the highest valuation as of 2018?",
        choices: ['Uber', 'Lyft', 'Airbnb', 'Pinterest'],
        correct: 0,
        pic: "assets/images/uber.gif"
    },
    {
        question: "Which social network platform does Elon Musk most use?",
        choices: ["Reddit", "Twitter", "Facebook", "Linkedin"],
        correct: 1,
        pic: "assets/images/twitter.gif"
    }
];

// Hide certain elements until game starts
$("#question-area").hide();
$("#answer-area").hide();
$("#stats").hide();
$("#end-area").hide();

// Timer function that handles the countdown
function timer() {
    time = 12;
    $("#timer").html(time + " seconds");
    clock = setInterval(countdown, 1000);
    function countdown() {

        if (time > 1) {
            time--;
        } else {
            clearInterval(clock);
            checkAnswer("timeout");
        };
        $("#timer").html(time + " seconds");
    };
};


// Updates the question area
function updateQuestion() {
    timer();

    $("#answer-area").hide();
    $("#question-area").show();

    if (index === questions.length) {
        endGame();
        return;
    } else {
        currentQuestion = questions[index].question;
        for (var i = 0; i < 4; i++) {
            currentChoices[i] = questions[index].choices[i];
        }
    };

    var questionNumber = index + 1;
    $("#index").text(questionNumber);
    $("#current-question").text(currentQuestion);

    $("#0").text(currentChoices[0]);
    $("#1").text(currentChoices[1]);
    $("#2").text(currentChoices[2]);
    $("#3").text(currentChoices[3]);

    console.log("Question #" + questionNumber);
};

// Updates the answer area (correct answer text and pic)
function updateAnswer(x) {

    // In 4 seconds, go to next question. If last question, show results
    if (index === questions.length) {
        endGame();
    } else {
        timeoutVar = setTimeout(updateQuestion, waitBetweenQuestions);
    };


    $("#question-area").hide();
    $("#answer-area").show();

    var correctIndex = questions[index].correct;
    var correctPic = questions[index].pic;

    if (x == questions[index].correct) {
        $("#right-or-wrong").html("<h2 style='font-weight: bold;'>CORRECT!</h2>");
    } else if (x == "timeout") {
        $("#right-or-wrong").html("<h2 style='font-weight: bold;'>Out of time</h2>")
    } else {
        $("#right-or-wrong").html("<h2 style='font-weight: bold;'>Wrong...</h2>");
    }

    $("#pic").attr("src", correctPic);

    $(".correct-sofar").text(correct);
    $(".incorrect-sofar").text(incorrect);
    $(".skipped-sofar").text(skipped);

    $("#correct-answer-id").text(questions[index].choices[correctIndex]);
    console.log("Correct answer was: " + questions[index].choices[correctIndex]);

    time = 0;

}

// Checks user input if right or wrong
function checkAnswer(answer) {

    // Test if game is over, and do not keep executing this function
    if (index == questions.length) {
        return;
    }

    if (answer === questions[index].correct) {
        console.log("Clicked the correct answer!");
        correct++;
    } else if (answer == "timeout") {
        console.log("Times out...");
        skipped++;
    } else {
        console.log("Clicked the wrong answer...");
        incorrect++;
    }
    clearInterval(clock);
    time = 12;
    updateAnswer(answer);
    index++;
    $("#question-area").hide();

};

// Start game function
function startGame() {
    // gameStarted = true;
    $("#click-to-start").hide();
    updateQuestion();
};

function endGame() {
    $("#question-area").hide();
    $("#answer-area").hide();
    $("#stats").hide();
    $("#end-area").show();
}


$(document).ready(function () {

    $("#click-to-start").on("click", function () {
        startGame();
        $("#question-area").show();
        $("#stats").show();
    });

    $(".choices").on("click", function () {
        var userChoice = parseInt($(this).attr("id"));
        console.log("Clicked choice: " + userChoice);
        checkAnswer(userChoice);
    });

    $("#play-again").on("click", function () {
        correct = 0;
        incorrect = 0;
        skipped = 0;
        index = 0;
        currentQuestion = '';
        currentChoices = [];

        clearInterval(clock);
        clearTimeout(timeoutVar);

        $(".correct-sofar").text(correct);
        $(".incorrect-sofar").text(incorrect);
        $(".skipped-sofar").text(skipped);

        $("#end-area").hide();

        updateQuestion();

        $("#question-area").show();
        $("#stats").show();
    });

});