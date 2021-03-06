let gridContainer = document.getElementsByClassName('grid-container-square')[0];
let DOMGrid = document.getElementsByClassName('grid')[0];
let line = document.getElementsByClassName('line')[0];
let playerName = document.getElementsByClassName('player-name')[0];
let detail1 = document.getElementsByClassName('p1-detail')[0];
let detail2 = document.getElementsByClassName('p2-detail')[0];
let switchLine = document.getElementsByClassName('switch-line')[0];
let computer = document.getElementsByClassName('p2-name')[0];
let p1Win = document.getElementsByClassName('p1-win')[0];
let p2Win = document.getElementsByClassName('p2-win')[0];
let winContainer = document.getElementsByClassName('win-container')[0];
let winInnerContainer = document.getElementsByClassName('win-inner-container')[0];
let winName = document.getElementById('win-name');
let winSymbol = document.getElementById('win-symbol');
let winBtn1 = document.getElementById('win-btn-1');
let winBtn2 = document.getElementById('win-btn-2');
let restartBtn = document.getElementById('restart');
let restartWinBtn = document.getElementsByClassName('restart-win')[0];
let alignSymbolNo = document.getElementsByClassName('align-symbol-count')[0];
let totalWidth = gridContainer.clientWidth;
let noSymbol = parseInt(localStorage.getItem('symbol')), p1WinNo = localStorage.getItem('p1WinNo'), p2WinNo = localStorage.getItem('p2WinNo');
alignSymbolNo.innerHTML = 'aligned symbol : ' + localStorage.getItem('symbol');
window.onload = () => {
    p1Win.innerHTML = p1WinNo;
    p2Win.innerHTML = p2WinNo;
}

if (localStorage.getItem('multi') === 'multi')
    computer.innerHTML = "Player2";
else
    computer.innerHTML = "Computer";

let grid = localStorage.getItem('grid');
grid = parseInt(grid.charAt(0));

let gridMatrix = new Array(grid);
for (let i = 0; i < grid; i++) {
    gridMatrix[i] = new Array(grid);
}

let visited = new Array(grid);
for (let i = 0; i < grid; i++) {
    visited[i] = new Array(grid);
}
for (let i = 0; i < grid; i++)
    for (let j = 0; j < grid; j++)
        visited[i][j] = 0;

let h = totalWidth / grid;
let fSize = h;
let symbol = 'O';
let i, j;

switchLine.style.left = ((detail1.clientWidth / 4.5) + detail1.offsetLeft) + "px";
switchLine.style.top = ((detail1.clientHeight / 1.4)) + "px";
switchLine.classList.add('left');


setLineHeightWidth = () => {
    line.style.width = (gridMatrix[0][0].clientWidth / 10) + "px";
    line.style.height = (gridMatrix[0][0].clientWidth / 10) + "px";
}

bottomTop = (max1) => {
    setLineHeightWidth();
    let bottomTopArray = [(max1[0] * h) + (h / 3.3), ((max1[1] * h) + (h / 2) - (line.clientWidth / 2.2)), (noSymbol - 0.6) * h];
    line.style.top = bottomTopArray[0] + "px";
    line.style.left = bottomTopArray[1] + "px";
    line.style.height = bottomTopArray[2] + "px";
    if (visited[max1[0]][max1[1]] === 1) {
        line.classList.add('blue');
        p1WinNo++;
    }
    else {
        line.classList.add('red');
        p2WinNo++;
    }
    line.classList.add('bottom-top');
}

rightLeft = (max1) => {
    setLineHeightWidth();
    let bottomTopArray = [(max1[0] * h) + (h / 2.2), (max1[1] * h) + (h / 3), (noSymbol - 0.6) * h];
    line.style.top = bottomTopArray[0] + "px";
    line.style.left = bottomTopArray[1] + "px";
    line.style.width = bottomTopArray[2] + "px";
    if (visited[max1[0]][max1[1]] === 1) {
        line.classList.add('blue');
        p1WinNo++;
    }
    else {
        line.classList.add('red');
        p2WinNo++;
    }
    line.classList.add('right-left');
}

backwordSlashTopBottom = (max1) => {
    setLineHeightWidth();
    let bottomTopArray = [(max1[0] * h) + (h / 2.6), (max1[1] * h) + (h / 2), noSymbol * h];
    line.style.top = bottomTopArray[0] + "px";
    line.style.left = bottomTopArray[1] + "px";
    line.style.width = bottomTopArray[2] + "px";
    if (visited[max1[0]][max1[1]] === 1) {
        line.classList.add('blue');
        p1WinNo++;
    }
    else {
        line.classList.add('red');
        p2WinNo++;
    }
    line.classList.add('backword-top-bottom');
}

forwardSlashTopBottom = (max1) => {
    setLineHeightWidth();
    let bottomTopArray = [(max1[0] * h) + (h / 2.6), (max1[1] * h) + (h / 1.4), (noSymbol + .2) * h];
    line.style.top = bottomTopArray[0] + "px";
    line.style.left = bottomTopArray[1] + "px";
    line.style.width = bottomTopArray[2] + "px";
    if (visited[max1[0]][max1[1]] === 1) {
        line.classList.add('blue');
        p1WinNo++;
    }
    else {
        line.classList.add('red');
        p2WinNo++;
    }
    line.classList.add('forward-top-bottom');
}


let translatePX = "translateX(" + (playerName.clientWidth - (detail2.clientWidth / 0.8) + 1) + "px)";
if (localStorage.getItem('single') === 'single')
    translatePX = "translateX(" + (playerName.clientWidth - (detail2.clientWidth / 0.94) + 1) + "px)";

switchSymbol = (no) => {
    if (no == 1) {
        switchLine.classList.remove('left');
        switchLine.classList.add('right');
        switchLine.style.transform = translatePX;
    }
    else {
        switchLine.classList.remove('right');
        switchLine.classList.add('left');
        switchLine.style.transform = "translateX(0px)";
    }
}

alignSymbol = (x, y) => {
    if (visited[x][y] == 0) {
        let s = gridMatrix[x][y];
        s.firstChild.classList.add('down-anim');
        if (symbol === 'O') {
            s.firstChild.innerHTML = "O";
            s.firstChild.classList.add('i1');
            symbol = 'X';
            visited[x][y] = 1;
            switchSymbol(visited[x][y]);
            if (checkWin(x, y, true)) {
                start();
                localStorage.setItem('p1WinNo', p1WinNo);
                localStorage.setItem('p2WinNo', p2WinNo);
                setTimeout(() => {
                    winContainer.classList.add('expand');
                    winInnerContainer.classList.add('expand');
                    winInnerContainer.classList.add('blue-line');
                    winSymbol.innerHTML = 'O';
                    winName.classList.add('blue');
                    winSymbol.classList.add('blue');
                    winBtn1.classList.add('btn-blue');
                    winBtn2.classList.add('btn-blue');
                }, 500);
            }
        }
        else {
            s.firstChild.innerHTML = "X";
            s.firstChild.classList.add('i2');
            symbol = 'O';
            visited[x][y] = 2;
            switchSymbol(visited[x][y]);
            if (checkWin(x, y, true)) {
                start();
                localStorage.setItem('p1WinNo', p1WinNo);
                localStorage.setItem('p2WinNo', p2WinNo);
                setTimeout(() => {
                    winContainer.classList.add('expand');
                    winInnerContainer.classList.add('expand');
                    winInnerContainer.classList.add('red-line');
                    winSymbol.innerHTML = 'X';
                    winName.classList.add('red');
                    winSymbol.classList.add('red');
                    winBtn1.classList.add('btn-red');
                    winBtn2.classList.add('btn-red');
                }, 500);
            }
        }
        if (s.firstChild.classList.contains('down-anim')) {
            s.firstChild.style.transform = 'translateY(' + 0 + 'px)';
        }
    }
};


function getScore(max1) {
    if (visited[max1[0]][max1[1]] == 1)
        return -10;
    else if (visited[max1[0]][max1[1]] == 2)
        return 10;
}

function isGameDraw() {
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            if (visited[i][j] == 0)
                return true;
        }
    }
    return false;
}

function checkWin(x, y, isAI) {
    let count = 1;
    let max1;

    //up
    let xx = x - 1;
    let yy = y;
    for (let i = 1; i < noSymbol; i++) {
        if (xx < 0) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            xx--;
        }
        else {
            break;
        }
    }
    max1 = [xx + 1, y];
    if (count === noSymbol) {
        if (isAI)
            bottomTop(max1);
        // return 1;
        return getScore(max1);
    }

    // down
    xx = x + 1;
    yy = y;
    for (let i = 1; i < noSymbol; i++) {
        if (count == noSymbol || xx > grid - 1) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            xx++;
        }
        else {
            break;
        }
    }
    if (count === noSymbol) {
        if (isAI)
            bottomTop(max1);
        // return 1;
        return getScore(max1);
    }

    //left
    count = 1;
    xx = x;
    yy = y - 1;
    max1 = 0;
    for (let i = 1; i < noSymbol; i++) {
        if (yy < 0) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            yy--;
            count++;
        }
        else {
            break;
        }
    }
    max1 = [x, yy + 1];
    if (count == noSymbol) {
        if (isAI)
            rightLeft(max1);
        // return 1;
        return getScore(max1);
    }

    //right
    xx = x;
    yy = y + 1;
    for (let i = 1; i < noSymbol; i++) {
        if (count == noSymbol || yy > grid - 1) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            yy++;
        }
        else {
            break;
        }
    }
    if (count == noSymbol) {
        if (isAI)
            rightLeft(max1);
        // return 1;
        return getScore(max1);
    }

    //backword slash up win \ 
    count = 1;
    xx = x - 1;
    yy = y - 1;
    for (let i = 1; i < noSymbol; i++) {
        if (xx < 0 || yy < 0) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            xx--;
            yy--;
        }
        else {
            break;
        }
    }
    max1 = [xx + 1, yy + 1];
    if (count === noSymbol) {
        if (isAI)
            backwordSlashTopBottom(max1);
        // return 1;
        return getScore(max1);
    }

    //backword slash down win \ 
    xx = x + 1;
    yy = y + 1;
    for (let i = 1; i < noSymbol; i++) {
        if (count == noSymbol || xx > grid - 1 || yy > grid - 1) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            xx++;
            yy++;
        }
        else {
            break;
        }
    }
    if (count === noSymbol) {
        if (isAI)
            backwordSlashTopBottom(max1);
        // return 1;
        return getScore(max1);
    }

    //forward slash up win /
    count = 1;
    xx = x - 1;
    yy = y + 1;
    for (let i = 1; i < noSymbol; i++) {
        if (xx < 0 || yy > grid - 1) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            xx--;
            yy++;
        }
        else {
            break;
        }
    }
    max1 = [xx + 1, yy - 1];
    if (count === noSymbol) {
        if (isAI)
            forwardSlashTopBottom(max1);
        // return 1;
        return getScore(max1);
    }

    //forward slash down win /
    xx = x + 1;
    yy = y - 1;
    for (let i = 1; i < noSymbol; i++) {
        if (xx > grid - 1 || yy < 0) {
            break;
        }
        if (visited[xx][yy] === visited[x][y]) {
            count++;
            xx++;
            yy--;
        }
        else {
            break;
        }
    }
    if (count === noSymbol) {
        if (isAI)
            forwardSlashTopBottom(max1);
        // return 1;
        return getScore(max1);
    }
    return 0;
}

let x, y;
// player = O    1
// computer = X  2

function minimax(visited, depth, clickLoc, isMaximizing) {
    let isWin = checkWin(clickLoc.i, clickLoc.j, false);
    if (isWin == 10)
        return isWin;
    if (isWin == -10)
        return isWin;
    if (isGameDraw() == false)
        return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                if (visited[i][j] == 0) {
                    visited[i][j] = 2;
                    let clickLoc = { i, j };
                    let score = minimax(visited, depth + 1, clickLoc, false);
                    visited[i][j] = 0;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                if (visited[i][j] == 0) {
                    visited[i][j] = 1;
                    let clickLoc = { i, j };
                    let score = minimax(visited, depth + 1, clickLoc, true);
                    visited[i][j] = 0;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            if (visited[i][j] == 0) {
                visited[i][j] = 2;
                let clickLoc = { i, j };
                let score = minimax(visited, 0, clickLoc, false);
                visited[i][j] = 0;
                if (score > bestScore) {
                    bestScore = score;
                    move = { i, j };

                }
            }
        }
    }
    return move;
}


DOMGrid.style.width = (h * grid) + "px";
DOMGrid.style.height = (h * grid) + "px";
for (let i = 0; i < grid; i++) {
    for (let j = 0; j < grid; j++) {
        let span = document.createElement('span');
        let p = document.createElement('p');
        p.style.height = h + 'px';
        p.style.width = h + 'px';
        p.style.transform = 'translateY(' + (-h) + 'px)';
        p.classList.add('grid-p');
        span.style.width = h + 'px';
        span.style.height = h + 'px';
        span.classList.add('grid-square');
        span.style.fontSize = fSize + 'px';
        span.appendChild(p);
        gridMatrix[i][j] = span;
        gridMatrix[i][j].onclick = function () {
            if (visited[i][j] == 0) {
                if (localStorage.getItem('single') == 'single') {
                    x = i;
                    y = j;
                    alignSymbol(x, y);
                    let move = bestMove();
                    alignSymbol(move.i, move.j);
                } else {
                    x = i;
                    y = j;
                    alignSymbol(x, y);
                }
            }
        }
        DOMGrid.appendChild(gridMatrix[i][j]);
    }
}
// confetti
const start = () => {
    setTimeout(function () {
        confetti.start()
    }, 1000);
};

const stop = () => {
    setTimeout(function () {
        confetti.stop()
    }, 5000);
};

function reloadPage() {
    p1Win.innerHTML = localStorage.getItem('p1Win');
    p2Win.innerHTML = localStorage.getItem('p1Win');
    location.reload();
}

restartBtn.addEventListener('click', () => {
    window.reloadPage();
});

restartWinBtn.addEventListener('click', () => {
    window.reloadPage();
});
