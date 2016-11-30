/** determines if it is the players turn
  * true: human player's turn
  * false: AI's turn
  */
var isPlayersTurn = true;

/** Create board
  * An array of objects
  * boardLoc: corresponds to the square on the boardLoc
  * row: indicates which row the space belongs to
  * col: indicates which col the space belongs to
  * diag: indicates which diagonal the space belongs to
  *       0: top left to bottom right
  *       1: top right to bottom left
  *       2: center, belongs to both diagonals
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
    diag, 0,
    marker: null
  },
  {
    boardLoc: 1,
    row: 0,
    col: 1,
    diag: null,
    marker: null
  }
  {
    boardLoc: 2,
    row: 0,
    col: 2,
    diag: 1,
    marker: null
  },
  {
    boardLoc: 3,
    row: 1,
    col: 0,
    diag: 0,
    marker: null
  },
  {
    boardLoc: 4,
    row: 1,
    col: 1,
    diag: 2,
    marker: null
  },
  {
    boardLoc: 5,
    row: 1,
    col: 2,
    diag: 0,
    marker: null
  },
  {
    boardLoc: 6,
    row: 2,
    col: 0,
    diag: 1,
    marker: null
  },
  {
    boardLoc: 7,
    row: 2,
    col: 1,
    diag: 0,
    marker: null
  },
  {
    boardLoc: 8,
    row: 2,
    col: 2,
    diag: 0,
    marker: null
  }
];

/** creates rows, cols, diags
  *
  * organizes board into:
  *   rows, lines, diagonals for easier analysis
  *   would only contain player markers
  *
  * takes board as argument
  * returns lines{}
  */
function createLines(b) {
  // b is current board passed in as paramater
  var lines = {

    rows: [
      [b[0], b[1], b[2]],
      [b[3], b[4], b[5]],
      [b[6], b[7], b[8]]
    ],

    cols: [
      [b[0], b[3], b[6]],
      [b[1], b[4], b[7]],
      [b[2], b[5], b[8]]
    ],

    // TODO: figure out how to handle the center square, it occupies both diags
    diags: [
      [b[0], b[4], b[8]],
      [b[2], b[4], b[6]],
      // ???
      []
    ]
  };
  return lines;
}

// switch which player is the current player
function togglePlayer() {
    if (isPlayersTurn) {
      isPlayersTurn = false;
    } else {
      isPlayersTurn = true;
    }
}


/** accepts placement
  * updates the board and all of the lines
  *
  * accepts number as argument, indicating the space on the board
  */
function updateBoard(space) {
    // update the space with the appropriate marker, determined by who is
    // the current player


}
