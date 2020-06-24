let scores, roundScore, activePlayer;
const diceDOM = document.querySelector(".dice");
// start of game
initGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
    // random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // display dice result
    diceDOM.style.display = "block";
    diceDOM.src = "./assets/dices/dice-" + dice + ".png";

    // update round score only if round number is not 1

    if (dice !== 1) {
        // add to score
        roundScore += dice;
        document.getElementById("current-" + activePlayer).textContent = roundScore;
    } else {
        // next player
        nextPlayer();
        // hiding the dice with timeout so that result of 1 can be visible for a short time
        setTimeout(function () {
            diceDOM.style.display = "none";
        }, 500);
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
    // add current score to the global score
    scores[activePlayer] += roundScore;
    // update the ui
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

    // check if active player won the game
    if (scores[activePlayer] >= 10) {
        document.getElementById("name-" + activePlayer).textContent = "WINNER !!!";
        diceDOM.style.display = "none";
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    } else {
        // next player
        nextPlayer();
    }
});

document.querySelector(".btn-new").addEventListener("click", initGame);

function initGame() {
    // names of players
    let player1 = prompt("Please enter name for Player 1", "Player 1");
    let player2 = prompt("Please enter name for Player 2", "Player 2");
    if (player1 !== null && player2 !== null){
        document.getElementById("name-0").textContent = player1;
        document.getElementById("name-1").textContent = player2;
    }else {
        document.getElementById("name-0").textContent = "Player 1";
        document.getElementById("name-1").textContent = "Player 2";
    }

    // reset
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector(".dice").style.display = "none";
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
}

