var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    $(".start").fadeOut("slow");
    userClickedPattern = [];
    level++;
    $("#level-title").html("Nível " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeTo(100, 0.1, function () {
        $(this).fadeTo(500, 1.0);
    });

    playSound(randomChosenColor);
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed")
    }, 150);
}

$("#start-button").click(function () {
    if (!started) {
        $("#level-title").text("Nível " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 700);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Fim de jogo, aperte no meio para recomeçar");
        $(".start").fadeIn("slow");
        restart();
    }
}

function restart() {
    level = 0;
    started = false;
    gamePattern = [];
}