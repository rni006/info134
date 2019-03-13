function newGame() {
    game = new Nim({name: "Player 1", human: true},
        {name: "Player 2", human: true}, victory, 20, 3)

     
}

function victory({name}) { // return winner name
    
}

function update({name}, total) { // update who is the active player and total

}
// game.take(n, update) button event