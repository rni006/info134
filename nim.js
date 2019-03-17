/**
 * 
 * 1. #player1 atrodi šo id
 * 2.izveido mainīgo un document.createElement("input");
 * 3. uzstādi pareizās vērtības (disabled, value, onClick funkcionalitāte)
 * 4.
 */

class Nim {
    constructor(player1, player2, victory, total, maxGrab = 3) {
        this.validateValues(player1, player2, total, maxGrab);
        this.player1 = this.generateFirstPlayer(player1, maxGrab)

        this.player2 = this.generateSecondPlayer(player2, maxGrab)
        this.currentPlayer = this.player1

        this.victory = victory

        this.total = total

        this.maxGrab = maxGrab
    }

    generateFirstPlayer(player, maxGrab) {
        let playerValue = player
        let playerOneField = document.getElementById("player1");
        let h3 = document.createElement("h3");

        h3.className = "firstPlayer"
        h3.innerHTML = playerValue.name;
        playerOneField.appendChild(h3)

        let i;
        for (i = 0; i < maxGrab; i++) {
            let input = document.createElement("button");
            input.onclick = (e) => {
                this.total -= i;
            }
            input.innerHTML = i+1;
            playerOneField.appendChild(input)
            playerValue.buttons.push(input);
        }

        return playerValue;
    }

    generateSecondPlayer(player, maxGrab) {
        let playerValue = player
        let playerTwoField = document.getElementById("player2");
        let h3 = document.createElement("h3");

        h3.className = "secondPlayer"
        h3.innerHTML = playerValue.name;
        playerTwoField.appendChild(h3)

        let i;
        for (i = 0; i < maxGrab; i++) {
            let input = document.createElement("button");
            input.onclick = (e) => {
                this.total -= i;
                this.flipUsers()
            }
            input.innerHTML = i+1;
            input.disabled = true;
            playerTwoField.appendChild(input)
            playerValue.buttons.push(input);
        }

        return playerValue;
    }

    flipUsers(){
        if(this.player1.buttons[0].disabled === true){
            this.currentPlayer = this.player1
        } else {
            this.currentPlayer = this.player2
        }

        this.player1.button.forEach(button => button.disabled = !button.disabled);
        this.player2.button.forEach(button => button.disabled = !button.disabled);
    }

    game(removeValue, cb) {
        console.log(removeValue);
        this.total -= removeValue
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2
        } else {
            this.currentPlayer = this.player1
        }

        if (this.total < 1) {
            this.victory(this.currentPlayer.name)
        } else {
            cb(this.currentPlayer, this.total)
        }
    }

    validateValues(player1, player2, total, maxGrab) {
        if (!(player1.hasOwnProperty("name") && player2.hasOwnProperty("name"))) {
            throw "missing key 'name'"
        }
        if (!(player1.hasOwnProperty("human") && player2.hasOwnProperty("human"))) {
            throw "missing key 'human'"
        }
        if (!(player1.human || player2.human)) {
            throw "no human players"
        }
        if (total < 12) {
            throw "'total' must be greater than 11"
        }
        if (maxGrab < 2) {
            throw "'maxGrab' must be greater than 1"
        }
    }
}

// game = new Nim({name: "Stian", human: true}, {name: "Renate", human: true}, ({name}) => console.log(name), 20, 3)

// game.take(3, ({name}, total) => console.log(name + total))

// game.take(2, ({name}, total) => console.log(name + total))