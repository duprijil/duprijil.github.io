bot = 'O'
player = 'X'
usedElements = 0
game_over = false
board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''], 
];

function getRandomElem()
{
    for(var i = 0; i < 3; i++)
    {
        for(var j = 0; j < 3; j++)
        {
            if(board[i][j] == '')
            {
                return [i,j];
            }
        }
    }
}

function getBestMove()
{
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                board[i][j] = bot;
                usedElements++;
                let score = minimax(board, 0, false);
                board[i][j] = '';
                usedElements--;
                if (score > bestScore) {
                    bestScore = score;
                    move = [ i, j ];
                }
            }
        }
    }
    return move;
}

function onClickEvent(elem_id, row, column) {
    if(game_over || board[row][column] != '') return;
    document.getElementById(elem_id).innerHTML=player;

    board[row][column] = player;
    usedElements++;
    let progress = evaluateProcess();
    if(progress[0] == true)
    {
        document.getElementById('winner').innerHTML='Winner: ' + progress[1];
        game_over = true;
        return;
    }
    algorithm_results = getBestMove();
    document.getElementById('sq'+algorithm_results[0]+algorithm_results[1]).innerHTML=bot;
    board[algorithm_results[0]][algorithm_results[1]] = bot;
    usedElements++;

    progress = evaluateProcess();
    if(progress[0] == true)
    {
        document.getElementById('winner').innerHTML='Winner: ' + progress[1];
        game_over = true;
    }
}

function isEqual(a, b, c) {
    return (a == b) && (b == c) && (a != '');
}

function evaluateProcess()
{
    let winner = [false, null];
    if(usedElements == 9)
    {
        return [true, '-'];
    }
    for (let i = 0; i < 3; i++) {
        if (isEqual(board[i][0], board[i][1], board[i][2])) {
            winner = [true, board[i][0]];
        }
        if (isEqual(board[0][i], board[1][i], board[2][i])) {
            winner = [true, board[0][i]];
        }
    }
    if (isEqual(board[0][0], board[1][1], board[2][2])) {
        winner = [true, board[0][0]];
    }
    if (isEqual(board[0][2], board[1][1], board[2][0])) {
        winner = [true, board[0][2]];
    }
    return winner;
}

function minimax(board, depth, isMaximizing) {
    let result = evaluateProcess();
    if (result[0] == true) {
        if(result[1] == bot) return 1;
        else if(result[1] == player) return -1;
        else return 0;
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
            board[i][j] = bot;
            usedElements++;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            usedElements--;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
            board[i][j] = player;
            usedElements++;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            usedElements--;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }