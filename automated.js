let winMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
let turns = []
let userMoves = []
let compMoves = []
let movesLeft = []
let solution = false;
let move;
function leftMoves(array) {
    for (var i = 0; i < 9; i++)
        if (!(turns.includes(i)))
            array.push(i)
}
function genRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
let checker = (arr, target) => target.every(v => arr.includes(v));
function solutionCheck() {
    let checker = (arr, target) => target.every(v => arr.includes(v));
    for (let i = 0; i < 8; i++) {
        if (checker(userMoves, winMoves[i])) {
            document.getElementById("turn").innerHTML = "User Wins!!";
            solution = true;
        }
        else if (checker(compMoves, winMoves[i])) {
            document.getElementById("turn").innerHTML = "Computer Wins!!";
            solution = true;
        }
    }
    if (solution) {
        let movesLeft = []
        leftMoves(movesLeft)
        for (var p = 0; p < movesLeft.length; p++) {
            document.getElementById(movesLeft[p].toString()).disabled = true;
            document.getElementById(movesLeft[p].toString()).style.color = "#8041BF";
        }
    }
    else if (solution == false && turns.length === 9)
        document.getElementById("turn").innerHTML = "Game Tied"
}
function calMatchingValues(array1, array) {
    let matchingArray = []
    leftMoves(movesLeft)
    for (var i = 0; i < winMoves.length; i++) {
        matchingArray = winMoves[i].filter(value => array1.includes(value));
        array.push(matchingArray.length)
    }
}
function splicing(array1, possible, values) {
    for (var i = 0; i < 8; i++)
        if (values[i] === 2)
            possible.push(winMoves[i])
    for (var i = 0; i < possible.length; i++) {
        for (var j = 0; j < 3; j++) {
            if ((array1.includes(possible[i][j]))) {
                possible.splice(i, 1)
                i = i - 1
                break
            }
        }
    }
}
function checkCorner() {
    movesLeft = []
    leftMoves(movesLeft)
    let corners = []
    if (userMoves.includes(4))
        corners = [0, 2, 6, 8]
    else
        corners = [1, 3, 5, 7];
    let approvedCorners = []
    for (var j = 0; j < 4; j++)
        if (movesLeft.includes(corners[j]))
            approvedCorners.push(corners[j])
    move = genRandom(approvedCorners)
    if (approvedCorners.length === 0)
        move = genRandom(movesLeft)
}
function selection(newArray, possible, array1) {
    newArray = genRandom(possible);
    newArray = newArray.sort()
    array1 = array1.sort()
    move = newArray.filter(x => !array1.includes(x))[0]
}
function compMove() {
    movesLeft = []
    let possibleMoves = []
    let newMove = []
    let matchingValues = []
    if (turns.length == 1) {
        leftMoves(movesLeft);
        if (userMoves[0] !== 4 && userMoves.length === 1)
            move = 4;
        else
            move = genRandom([0, 2, 6, 8])
    }
    else if (turns.length === 3) {
        leftMoves(movesLeft)
        calMatchingValues(userMoves, matchingValues)
        if (matchingValues.includes(2)) {
            splicing(compMoves, possibleMoves, matchingValues)
            if (possibleMoves.length > 0)
                selection(newMove, possibleMoves, userMoves)
            else
                checkCorner()
        }
        else
            checkCorner()
    }
    else if (turns.length > 4) {
        leftMoves(movesLeft)
        calMatchingValues(compMoves, matchingValues)
        if (matchingValues.includes(2)) {
            splicing(userMoves, possibleMoves, matchingValues)
            if (possibleMoves.length > 0)
                selection(newMove, possibleMoves, compMoves)
            else {
                movesLeft = []
                matchingValues = []
                matchingArray = []
                possibleMoves = []
                newMove = []
                leftMoves(movesLeft)
                for (var i = 0; i < winMoves.length; i++) {
                    matchingArray = winMoves[i].filter(value => userMoves.includes(value));
                    matchingValues.push(matchingArray.length)
                }
                if (matchingValues.includes(2)) {
                    splicing(compMoves, possibleMoves, matchingValues)
                    if (possibleMoves.length > 0)
                        selection(newMove, possibleMoves, userMoves)
                    else
                        checkCorner()
                }
                else
                    checkCorner()
            }
        }
        else
            checkCorner()
    }
    compMoves.push(move)
    turns.push(move);
    compMoves = compMoves.sort()
    document.getElementById(move.toString()).innerHTML = "X";
    document.getElementById(move.toString()).disabled = true;
    solutionCheck()
}
function usersChoice(id) {
    document.getElementById(id).innerHTML = "O";
    document.getElementById(id).disabled = true;
    var strUserID = document.getElementById(id).id;
    var intUserID = parseInt(strUserID)
    userMoves.push(intUserID);
    userMoves = userMoves.sort()
    turns.push(intUserID)
    turns = turns.sort()
    solutionCheck()
    if (!solution && turns.length != 9) {
        compMove()
    }
}
