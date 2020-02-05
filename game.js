var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
var buttonColors=["red","green","blue","yellow"];
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+ level);
        nextSequence();
        started=true;
    }
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
      if(gamePattern.length===userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
      }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("game over,Press any key to restart");
        startOver();
    } 
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+ level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" +randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#" +currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" +currentColor).removeClass("pressed");
    }, 100);
}
