
function validateValues(player1, player2, total, maxGrab){
    if (!(player1.hasOwnProperty("name") && player2.hasOwnProperty("name"))){
        throw "missing key 'name'"
    }
    if (!(player1.hasOwnProperty("human") && player2.hasOwnProperty("human"))){
        throw "missing key 'human'"
    }
    if (!(player1.human || player2.human)){
        throw "no human players"
    }
    if (total < 12){
        throw "'total' must be greater than 11"
    }
    if (maxGrab < 2){
        throw "'maxGrab' must be greater than 1"
    }
}

class Nim {
    constructor(player1, player2, victory, total, maxGrab = 3){
        validateValues(player1, player2, total, maxGrab);
        this.player1 = player1
        this.player2 = player2
        this.currentPlayer = this.player1

        this.victory = victory

        this.total = total

        this.maxGrab = maxGrab
    }

    take(n, cb){
         this.total -= n
        if (this.currentPlayer === this.player1){
            this.currentPlayer = this.player2
        } else {
            this.currentPlayer = this.player1
        }
        console.log(this.currentPlayer)
        if (this.total < 1) {
            this.victory(this.currentPlayer)
        } else {
            cb(this.currentPlayer, this.total)
        }
    }
}

//  game = new Nim({name: "Stian", human: true}, {name: "Renate", human: true}, ({name}) => console.log(name), 20, 3)

//  game.take(3, ({name}, total) => console.log(name + total))

//  game.take(2, ({name}, total) => console.log(name + total))



