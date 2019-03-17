let Nim;
let firstButton = document.getElementById("#btn1");
// let submitOne = document.getElementById("#submit1");
// let submitTwo = document.getElementById("#submit2");

function newGame() {
    game = new Nim({name: "Player 1", human: true},
        {name: "Player 2", human: true}, victory, 36, 3)
}

function victory({name}) { // return winner name

}

// function firstName() {
//     var x = document.getElementById("player1name").value;
//     document.getElementById("first").innerHTML = x;
//   }

// use button toggle 


function updateText(total){
    total.innerText = Nim.total;
}

function update({name}, total) { // update who is the active player and total
    Nim.take(firstButton.value());
    updateText(total);
}

// tests
// game.take(n, update) button event