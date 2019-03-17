let Nim;

// find out who is the current player playing (either player 1 or 2)
// assign buttons to the actual values
// update total when a button is clicked
// function for victory - when total<1 - winner "current-player-name"
// when current player has his/her turn, other player buttons are disabled 


window.onload = function() {
    
    // we need to add events to all buttons and use this code so we dont have to rewrite it
        p1btn1 = document.getElementById("p1btn1");
        p1btn1.addEventListener("click", function(){
        var total = document.getElementById("total").value;
        newTotal = total - p1btn1.value;
        document.getElementById("totalScore").innerHTML = newTotal;
        }); 
}


function startGame() {
    var p1 = document.getElementById("player1name").value // gets the input name of the first player
    document.getElementById('first').innerHTML = p1
    var p2 = document.getElementById("player2name").value // gets the input name of the second player
    document.getElementById('second').innerHTML = p2

    var total = document.getElementById("total").value // get the total number of marbles 
    document.getElementById("totalScore").innerHTML = total;

    var maxGrab = 3;

    document.getElementById("settings").hidden = true // after the button START is clicked, the game is no longer hidden
    document.getElementById("game").hidden = false
    game = new Nim(p1, p2, victory, total, maxGrab)
}

