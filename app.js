/** NOTES

    posibly make updateBoard() into a method of board?

  */


/** determines if it is the players turn
  * true: human player's turn
  * false: AI's turn
  */
var isPlayersTurn = true;

// determines the markers for player and ai, player should determine
var playerMarker = 'x';
var AIMarker = 'o';

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

  var lines = {

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

    // TODO: figure out how to handle the center square, it occupies both diags
    diags: [
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
      // ???
      []
    ]
  };


// switch which player is the current player
function togglePlayer() {
    if (isPlayersTurn) {
      isPlayersTurn = false;
    } else {
      isPlayersTurn = true;
    }
}

function gameTurn() {
  /** function outline

    1. get player/ai input
    2. update board
    3. check for win
      a. if win:
        - highlight winning rows, cols, diags
        - if game won: notify play

      b. no win:
        - toggle to next player
        - if player's turn:
            -inform player to go
  */

}

/** accepts placement
  * updates the board and all of the lines
  *
  * accepts number as argument, indicating the space on the board
  */
function updateBoard(space) {

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


    // TODO: move this to gameTurn()
    // check for win
    // check each affected line for win
    if (checkForWin(lines.rows[rowNum], lines.cols[colNum], diag1, diag2).gameWon) {
      console.log('win!');
    }
}

function checkForWin(row, col, diag1, diag2) {


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
