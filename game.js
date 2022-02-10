
var gamePattern = []; //The color that is randomly chosen is stored in here.
var userClickedPattern = []; //The color pattern that the user playing game is stored here.
var level = 0; //Game level
var started = false;

// This function is to trigger the game to start when any key in the keyboard is pressed by thr user.
$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence(); //This function is called to choose another random number for the next level.
    }
})

var buttonColors = ["red", "blue", "yellow", "green"]; //This where the colors of the button is stored in an array.

// This function is used to call the next sequence of the game level and it'll update and display the game level as well.
function nextSequence() {
    userClickedPattern = []; //The user clicked pattern will be updated to null here for every next sequence of the level
    level++
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

// This function is used to track the buttons clicked by the user
$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    // console.log(userClickedPattern);
})

// This function is for to play the particular sound for the particular color button
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
// This function is to animated the button that got pressed by the user.
// It'll add a shadow to the button and it'll make it's back-ground color as grey for 200 ms and it'll turn back to normal
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 300);
}

// This function is to check that, if the user is clicking in the same sequence or not
// If not means the game will be over and again wa can start by clicking any button in the keyboard
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]) {

        console.log("Success");

        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game over, Press any key to restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// This function is to reset the game to the level 1 to start over the game again
function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
}