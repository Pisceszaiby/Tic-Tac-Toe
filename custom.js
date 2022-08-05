for (var i = 0; i < 9; i++) {
    document.getElementById(i).innerHTML = "?";
}
let buttonArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
document.getElementById("turn").innerHTML = "Current Turn: O";
let turn = true;
let symbol = "O"
function changeTurn(turn) {
    if (turn === true) {
        symbol = "O"
        document.getElementById("turn").innerHTML = "Current Turn: O";
    }
    else {
        symbol = "X"
        document.getElementById("turn").innerHTML = "Current Turn: X";
    }
}
var tie = false;
function checkTie() {
    if (buttonArray.includes(0)) {
        tie = false;
    }
    else {
        tie = true;
    }
}
function solutionCheck(turn) {
    if ((buttonArray[0] === turn && buttonArray[1] === turn && buttonArray[2] === turn)
        || (buttonArray[3] === turn && buttonArray[4] === turn && buttonArray[5] === turn)
        || (buttonArray[6] === turn && buttonArray[7] === turn && buttonArray[8] === turn)
        || (buttonArray[0] === turn && buttonArray[3] === turn && buttonArray[6] === turn)
        || (buttonArray[1] === turn && buttonArray[4] === turn && buttonArray[7] === turn)
        || (buttonArray[2] === turn && buttonArray[5] === turn && buttonArray[8] === turn)
        || (buttonArray[0] === turn && buttonArray[4] === turn && buttonArray[8] === turn)
        || (buttonArray[2] === turn && buttonArray[4] === turn && buttonArray[6] === turn)
    ) {
        changeTurn(turn)
        document.getElementById("turn").innerHTML = symbol + " Won!!";
        for (var i = 0; i < 9; i++) {
            if (document.getElementById(i).innerHTML === "?") {
                document.getElementById(i).disabled = true;
                document.getElementById(i).style.color = '#8041BF';
            }
        }
    }
    else if (tie) {

        document.getElementById("turn").innerHTML = "Game Tied";
    }
}
function changeText(id) {
    document.getElementById(id).innerHTML = symbol;
    document.getElementById(id).disabled = true
    buttonArray[id] = turn
    turn = !turn;
    changeTurn(turn)
    checkTie()
    solutionCheck(!turn)

}