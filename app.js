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
var isPlayersTurn;

// determines whether the game should still be played
var victory = false;

// determines the markers for player and ai, player should determine
var playerMarker;
var AIMarker;

// this will control whether the game is currently being played
var gameOn = false;


// for testing: logs whose turn it is
function whoseTurn() {
  var currentTurn = isPlayersTurn ? "player's" : "AI's";
  console.log('It is the ' + currentTurn + ' turn');
}


/* TODO: remove when unneccesary
(function setMarkers() {
  playerMarker = 'x'
  AIMarker = 'o';
})();
*/

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
    // TODO: make this function accept the board and lines
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

      // create copy of board


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

      // find index that contains the greatest highest number of possible wins
      // in two moves
      var indexOfLargestNum = 0;
      for (var i = 0; i < numberOfMoves.length; i++) {
        if (numberOfMoves[indexOfLargestNum] < numberOfMoves[i]) {
          indexOfLargestNum = i;
        }
      }
      bestSpace = indexOfLargestNum;
      return bestSpace;
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
      console.log(possibleMoves);
      // select a random number from 0-length of possibleMoves
      randomIndex = Math.floor(Math.random() * possibleMoves.length);
      console.log(randomIndex);
      spaceSelection = possibleMoves[randomIndex];

      return spaceSelection;
    }
    console.log('findWinningMoves(): ' + findWinningMoves(AIMarker, board));
    console.log('preventPlayerWin(): ' + preventPlayerWin());
    console.log('findWinInTwoMoves(): ' + findWinInTwoMoves(board));
    console.log('makeRandomMove(): ' + makeRandomMove());

    // create cascade starting from best possible move
    findWinningMoves(AIMarker, board);
    console.log(possibleMoves.length);

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
}

// TODO: rewrite this function
// accept newly placed space object
// will test for win against all lines the space belongs
function checkForWin(row, col, diag1, diag2) {
  var lines = new Lines(board);


  var rowMarkerArr = [],
      colMarkerArr = [],
      diag1MarkerArr = [],
      diag2MarkerArr = [];

  var victoryObject = {};
  var currentMarker = isPlayersTurn ? playerMarker : AIMarker;

  var checkElems = function(item) {
    return item === currentMarker;
  };

  // create an array of markers for the passed in row
  for (var i = 0; i < row.length; i++) {
    rowMarkerArr.push(row[i].marker);
  }

  for (var i = 0; i < col.length; i++) {
    colMarkerArr.push(col[i].marker);
  }

  // only create array of diags if the selection lies within a diagonal
  if (diag1) {
    for (var i = 0; i < lines.diags[0].length; i++) {
      diag1MarkerArr.push(lines.diags[0][i].marker);
    }
    // check to see if diag1 is full, ie no null values present
    if (diag1MarkerArr.indexOf(null) < 0) {
      if (diag1MarkerArr.every(checkElems)) {
        console.log('diag1 is full of the same marker!');
        victoryObject.diag1 = true;
      }
    }

  }

  if (diag2) {
    for (var i = 0; i < lines.diags[1].length; i++) {
      diag2MarkerArr.push(lines.diags[1][i].marker);
    }
    // check to see if diag2 is full, ie no null values present
    if (diag2MarkerArr.indexOf(null) < 0) {
      if (diag2MarkerArr.every(checkElems)) {
        console.log('diag2 is full of the same marker!');
        victoryObject.diag2 = true;
      }
    }
  }

  // check to see if row is full, ie no null values present
  if (rowMarkerArr.indexOf(null) < 0) {
    if (rowMarkerArr.every(checkElems)) {
      console.log('row is full of the same marker!');
      victoryObject.row = true;
    }
  }

  // check to see if col is full, ie no null values present
  if (colMarkerArr.indexOf(null) < 0) {
    if (colMarkerArr.every(checkElems)) {
      console.log('col is full of the same marker!');
      victoryObject.col = true;
    }
  }


  // function will return an object if the last move resulted in a working
  // will return undefined if no win is detected

  // victory object will pass back an object
  /*
  var victoryObject = {
    row: winning row
    col: winning column
    diag1: bool
    diag2: bool
  }
  */
  if (victoryObject.row || victoryObject.col ||
      victoryObject.diag1 || victoryObject.diag2) {
        victoryObject.gameWon = true;
  }

  return victoryObject
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



function playerTurn() {
// send message to message screen: you're turn, Human



  //isPlayersTurn = false;
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

  if (victory === false) {
    if (isPlayersTurn) {
      playerTurn();
    } else {
      AITurn();
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
    // TODO: add code for click space handler

    // removes the number from the table cell id (space-'1')
    var spaceSelection = e.target.id.slice(-1);
    // if (verifyPlayerMove(spaceSelection)) {
    //   // TODO: add code here
    // }

    placeMarker(spaceSelection);
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
