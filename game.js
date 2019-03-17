let Nim;


// function newGame() {
//     game = new Nim({name: "Player 1", human: true},
//         {name: "Player 2", human: true}, victory, 36, 3)
// }

function assignButtons(n){

}

function startGame(){
    var player1 = document.getElementById("player1name").value // gets the input name of the first player
    document.getElementById('first').innerHTML = player1
    var player2 = document.getElementById("player2name").value // gets the input name of the second player
    document.getElementById('second').innerHTML = player2

    var total = document.getElementById("total").value // get the total number of marbles 
    document.getElementById("totalScore").innerHTML = total;

    document.getElementById("settings").hidden = true // after the button START is clicked, the game is no longer hidden
    document.getElementById("game").hidden = false
    spill = new Nim(player1, player2, victory, total, maxGrab)
}

function victory({name}) { // return winner name
    
}

// function firstName() {
//     var x = document.getElementById("player1name").value;
//     document.getElementById("first").innerHTML = x;
//   }
 

function updateText(total){
    total.innerText = Nim.total;
}

function update({name}, total) { // update who is the active player and total
    Nim.take(firstButton.value());
    updateText(total);
}

// tests
// game.take(n, update) button event