/** NOTES

    posibly make updateBoard() into a method of board?

  */


/*************************
MODEL / GAME DATA
*************************/


/** determines if it is the players turn
  * true: human player's turn
  * false: AI's turn
  */
var isPlayersTurn = false;

// determines whether the game should still be played
var victory = false;

// determines the markers for player and ai, player should determine
var playerMarker;
var AIMarker;



// for testing: logs whose turn it is
function whoseTurn() {
  var currentTurn = isPlayersTurn ? "player's" : "AI's";
  console.log('It is the ' + currentTurn + ' turn');
}


/** Create board
  * An array of objects
  * boardLoc: corresponds to the square on the boardLoc
  * row: indicates which row the space belongs to
  * col: indicates which col the space belongs to
  * diag1: bool indicating that space belongs to first diag
  *   top left towards bottom right
  * diag2:
  *   top right towards bottom left
  * marker: indicates whether the player or ai controls the square
  */

  // IDEA: make board into an object that contains the space object, which
  //       would be an array of objects and the line object, which would contain
  //       rows, cols, diags, which would be arrays
var board = [
  {
    boardLoc: 0,
    row: 0,
    col: 0,
    diag1: true,
    diag2: false,
    marker: null
  },
  {
    boardLoc: 1,
    row: 0,
    col: 1,
    diag1: false,
    diag2: false,
    marker: null
  },
  {
    boardLoc: 2,
    row: 0,
    col: 2,
    diag1: false,
    diag2: true,
    marker: null
  },
  {
    boardLoc: 3,
    row: 1,
    col: 0,
    diag1: false,
    diag2: false,
    marker: null
  },
  {
    boardLoc: 4,
    row: 1,
    col: 1,
    diag1: true,
    diag2: true,
    marker: null
  },
  {
    boardLoc: 5,
    row: 1,
    col: 2,
    diag1: false,
    diag2: false,
    marker: null
  },
  {
    boardLoc: 6,
    row: 2,
    col: 0,
    diag1: false,
    diag2: true,
    marker: null
  },
  {
    boardLoc: 7,
    row: 2,
    col: 1,
    diag1: false,
    diag2: false,
    marker: null
  },
  {
    boardLoc: 8,
    row: 2,
    col: 2,
    diag1: true,
    diag2: false,
    marker: null
  }
];

/** create rows, cols, diags
  *
  * organizes board into:
  *   rows, lines, diagonals for easier analysis
  *   would only contain player markers
  */

// ensures user selection is a legal move
// returns true if legal move, false otherwise
function verifyPlayerMove(space) {
  if (board[space].marker === null) {
    return true;
  } else {
    return false;
  }
}

// this function accepts a board, and returns a copy without references
function createCopyOfBoard(board) {
  var newBoard = [];
  var spaceObject;
  for (var i = 0; i < board.length; i++) {
    spaceObject = {};
    for (prop in board[i]) {
        spaceObject[prop] = board[i][prop];
    }
    newBoard.push(spaceObject);
  }
  return newBoard;
}

// this function creates the lines object based on a passed-in board array
function Lines(board) {
  return {
    rows: [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]]
    ],

    cols: [
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]]
    ],

    diags: [
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ]
  };
}

// accepts parameter: upper range.
// returns a random number from 0 - upperRange
function selectRandomElement(arr) {
  var randomIndex;

  randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];

}
// switch which player is the current player
function togglePlayer() {
    if (isPlayersTurn) {
      isPlayersTurn = false;
    } else {
      isPlayersTurn = true;
    }
}

function AITurn() {


    /** AI algorithm:

      1) Find winning move
      2) Block player's win
      3) Find move that results in greatest number of lines that have
         2 AI markers and no human markers
    */

    /** This function iterates over every row, col, diags
        * looks for any possible space that will result in a win for the AI

        * accepts marker parameter: determines whether it looks for player or AI
          markers
        * returns an array of all possible board locations
      */


    function findWinningMoves(marker, board) {
      var possibleSpaces = [];
      var lines = new Lines(board);

      for (prop in lines) {
        for (var i = 0; i < lines[prop].length; i++) {
          for (var j = 0, markerCount = 0, nullCount = 0, locationOfNull; j < lines[prop][i].length; j++) {
            if (lines[prop][i][j].marker === marker) {
              markerCount++;
            }
            if (lines[prop][i][j].marker === null) {
              nullCount++;
              locationOfOpenSpace = lines[prop][i][j].boardLoc;
            }
            if (markerCount === 2 && nullCount === 1) {
              possibleSpaces.push(locationOfOpenSpace);
            }
          }
        }
      }
      return possibleSpaces;
    }

    /** This funuction is the second AI step
      * function will look for the space that will give the player victory
        on the next turn
      */
    function preventPlayerWin() {
      var possibleSpaces = findWinningMoves(playerMarker, board);

      // TODO: replace with actual move placement
      return possibleSpaces;

    }

    /** This function will look for all possible spaces that will give the AI a
        win in two moves (ie one AI marker with no player markers)
      * It should only run if the previous two functions do not return any
        possibilities
      * It should test place a temp marker on each candidate space and then run
        findWinningMoves().
      * Space should be selected based on which array is largest returned from
        findWinningMoves(), ie, which move will result in the most opportunities
        to win for the AI next turn. (if there are more than 1, then the player
        can't win)
      */
    function findWinInTwoMoves(board) {
      /**
        * make a copy of the board, place marker temporarily and then run
          findWinningMoves(), the space that has the most results, ie
          ( findWinningMoves.length) should be the place the AI selects
        * for each length number, push onto array.
        * Iterate over array, find the largest number and record index.
        * index with largest number is the best move
        */


      var tempBoard,
          lines = new Lines(board),
          numberOfMoves = [];



      // iterate over board look for empty space
      for (var i = 0; i < board.length; i++) {
        tempBoard = createCopyOfBoard(board);
        if (board[i].marker === null) {
          tempBoard[i].marker = AIMarker;
          numberOfMoves.push(findWinningMoves(AIMarker, tempBoard).length);
        } else {
          numberOfMoves.push(0);
        }
      }

      // find index that contains the largest number of possible wins
      // in two moves
      var indexOfLargestNum = 0;
      for (var i = 0; i < numberOfMoves.length; i++) {
        if (numberOfMoves[indexOfLargestNum] < numberOfMoves[i]) {
          indexOfLargestNum = i;
        }
      }

      // if there are no good moves, ie, the numberOfMoves array is
      // all 0's, return -1
      if (numberOfMoves[indexOfLargestNum] === 0) {
        return -1;
      } else {
        return indexOfLargestNum;
      }
    }

    // the AI will select a random square if it does not already have a
    // marker on the board
    function makeRandomMove() {
      // create array of all possible spaces
      var possibleMoves = [];
      var spaceSelection;
      var randomIndex;

      for (var i = 0; i < board.length; i++) {
        if (board[i].marker === null) {
          possibleMoves.push(i);
        }

      }

      // return -1 if the board is full
      if (possibleMoves.length === 0) {
        return -1;
      }
      // select a random number from 0-length of possibleMoves
      randomIndex = Math.floor(Math.random() * possibleMoves.length);

      spaceSelection = possibleMoves[randomIndex];

      return spaceSelection;
    }

    /*
    console.log(findWinningMoves(AIMarker, board));
    console.log('preventPlayerWin(): ' + preventPlayerWin());
    console.log('findWinInTwoMoves(): ' + findWinInTwoMoves(board));
    console.log('makeRandomMove(): ' + makeRandomMove());
    */
    // create cascade starting from best possible move


    /**
      This function prevents a win by the player when a center square
      is played first. In order to prevent the player from winning,
      the AI must must play on the diagonal, either 0, 2, 6, 8
      check to see if all squares are null except for square 4,
      check if square 4 is occupied by playerMarker
      */
    if ( board[0].marker === null &&
         board[1].marker === null &&
         board[2].marker === null &&
         board[3].marker === null &&
         board[5].marker === null &&
         board[6].marker === null &&
         board[7].marker === null &&
         board[8].marker === null &&
         board[4].marker === playerMarker
        ) {
          return selectRandomElement([0, 2, 6, 8]);
        }


    bestMoves = findWinningMoves(AIMarker, board);
    if (bestMoves.length > 0) {
      console.log('Computer chose move from findWinningMoves()');
      return selectRandomElement(bestMoves);
    }

    bestMoves = preventPlayerWin();
    if (bestMoves.length > 0) {
      console.log('Computer chose move from preventPlayerWin()');
      return selectRandomElement(bestMoves);
    }

    bestMoves = findWinInTwoMoves(board);
    if (bestMoves > -1) {
      console.log('Computer chose move from findWinInTwoMoves()');
      return bestMoves;
    }

    console.log('Computer chose move from makeRandomMove()');
    return makeRandomMove();

}

/** accepts placement
  * updates the board and all of the lines
  *
  * accepts number as argument, indicating the space on the board
  */
function placeMarker(space) {

  var lines = new Lines(board);

    // update the space with the appropriate marker, determined by who is
    // the current player

    // determines what the current marker is, 'x' or 'o', depending on
    // whose turn it is
    var currentMarker = isPlayersTurn ? playerMarker : AIMarker;

    board[space].marker = currentMarker;

    var rowNum =  board[space].row,
        colNum = board[space].col,
        diag1 = board[space].diag1,
        diag2 = board[space].diag2;

    document.getElementById('space-' + space).innerHTML = currentMarker;
    // TODO: move this to gameTurn()
    // check for win
    // check each affected line for win

    // if (checkForWin(lines.rows[rowNum], lines.cols[colNum], diag1, diag2).gameWon) {
    //   console.log('win!');
    // }
    var victoryArray;


    victoryArray = checkForWin(currentMarker);
    console.log(victoryArray);
    console.log(currentMarker);
    if (victoryArray.length > 0) {
      victory = true;
      isPlayersTurn = false;
      console.log('win detected!');
      // run victory functions -> show winning lines, message to player, etc
    }
}

// TODO: rewrite this function
// accept newly placed space object
// will test for win against all lines the space belongs
function checkForWin(marker) {
  var lines = new Lines(board);

  /** this array will be returned from function
      if array is empty, calling code will know
      no win has occured
    */
  var winningLines = [];

  for (prop in lines) {
    for (var i = 0; i < lines[prop].length; i++) {
      for (var j = 0, markerCount = 0, nullCount = 0, locationOfNull; j < lines[prop][i].length; j++) {
        if (lines[prop][i][j].marker === marker) {
          markerCount++;
        }
        if (markerCount === 3) {
          console.log('win on ' + prop + ' ' + i);
          winningLines.push(prop + i);
        }
      }
    }
  }

  return winningLines;
}

/*************************
CONTROLLER
*************************/

// when player presses start:
function startGame() {
  if (document.getElementById('xMarker').checked) {
    playerMarker = 'x';
    AIMarker = 'o';
  } else {
    playerMarker = 'o';
    AIMarker = 'x';
  }

  if (document.getElementById('human-turn').checked) {
    isPlayersTurn = true;
  } else {
    isPlayersTurn = false;
  }

  // collect name from name field on game setup form
  // default value is 'Human' if field is empty
  var playerNameInput = document.getElementById('nameField').value;
  var playerName = playerNameInput ? playerNameInput : 'Human';

  console.log('The game has begun, ' + playerName);

  gameOn = true;
  gameTurn();
}



// game turn:


/** function outline

WHILE (victory == false):

  1. If player's turn
    - ask player to make move


  2. If AI's move
    - inform player that the AI is making a move
    - have AI select the next best move

  3. get player/ai input
  4. update board
  5. check for win
    a. if win:
      - highlight winning rows, cols, diags
      - if game won: notify play

    b. no win:
      - toggle to next player

*/


// this function will control the overall flow of the game
function gameTurn() {

  var currentMarker = isPlayersTurn ? playerMarker : AIMarker;

  /** this will hold the retured value from checkForWin(), which is an
      array of all the winning lines
    */


  if (victory === false) {
    if (isPlayersTurn) {
      // TODO: possibly message to player informing player of turn
    } else {
      placeMarker(AITurn());
      isPlayersTurn = true;

    }


  // check for victory
  // if victory:
  //   gameOn = false
  //   victory() -> needs to be written

  } else {
    console.log('Game Over!');
  }


}


/*************************
VIEW
*************************/

window.onload = function() {
  function clickSpace(e) {
    if (isPlayersTurn && victory === false) {
      // removes the number from the table cell id (space-'1')
      var spaceSelection = e.target.id.slice(-1);

      if (verifyPlayerMove(spaceSelection)) {
        placeMarker(spaceSelection);
        isPlayersTurn = false;
        gameTurn();
      }
    }
  }

  function clickStartBtn() {
    // TODO: add code for start button handler
    startGame();
  }

  function initializeAllEventHandlers() {
    var boardSpaces = document.getElementsByTagName('td'),
        startButton = document.getElementById('begin-game-btn');
    for (var i = 0; i < boardSpaces.length; i++) {
      boardSpaces[i].addEventListener('click', clickSpace);
    }
    startButton.addEventListener('click', clickStartBtn);
  }

//////////////////////////

initializeAllEventHandlers();


};
