// find out who is the current player playing (either player 1 or 2)
// assign buttons to the actual values
// update total when a button is clicked
// function for victory - when total<1 - winner "current-player-name"
// when current player has his/her turn, other player buttons are disabled 

function startGame() {
    player1 = {
        name: document.getElementById("playerOne").value,
        human: true,
        buttons: []
    };

    // document.getElementById('firstPlayer').innerHTML = player1.name

    player2 = {
        name: document.getElementById("playerTwo").value,
        human: true,
        buttons: []
    };

    // document.getElementById('secondPlayer').innerHTML = player2.name
    
    var total = document.getElementById("marbleCount").value // get the total number of marbles 

    document.getElementById("totalScore").innerHTML = total
    marbleCount = parseInt(total);

    document.getElementById("settings").hidden = true // after the button START is clicked, the game is no longer hidden
    document.getElementById("game").style.visibility = "visible";
    game = new Nim(player1, player2, victory, total, 3)
}

victory = (player) => {
    alert("victory! player who won:"+ player);
    return true;
}

