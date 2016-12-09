/*************************
MODEL / GAME DATA
*************************/


/** determines if it is the players turn
  * true: human player's turn
  * false: AI's turn
  */
var isPlayersTurn = false;
var playerGoesFirst = true;
var gameInProgress = false;

// determines whether the game should still be played
var victory = false;

// determines the markers for player and ai, player should determine
var playerMarker = 'x';
var AIMarker = 'o';

var playerMarkerNextTurn = 'x';

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
var board = [];
function createInitialBoard() {
  board = [
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
}

createInitialBoard();

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

function AITurn() {

    /** AI algorithm:
      1) Prevent player win with center square
      2) Find AI winning move
      3) Block player's win next turn
      4) Find move that results in greatest number of lines that have
         2 AI markers and no human markers
      5) Make random selection
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

    /**
      This statement prevents a win by the player when a center square
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

    /**
      The AI will take the center squre on the first move or on the
      second move if the player has not yet taken it
      */
    // if ( board[0].marker === null &&
    //      board[1].marker === null &&
    //      board[2].marker === null &&
    //      board[3].marker === null &&
    //      board[4].marker === null &&
    //      board[5].marker === null &&
    //      board[6].marker === null &&
    //      board[7].marker === null &&
    //      board[8].marker === null ) {
    //       return 4;
    //     }

    // AI will select the center square on the second move if available
    for (var i = 0, playerMarkerCount = 0, nullCount = 0; i < board.length; i++) {
      if (board[i].marker === playerMarker) {
        playerMarkerCount++;
      }
      if (board[i].marker === null) {
        nullCount++
      }
    }
    if (playerMarkerCount === 1 && nullCount === 8) {
      return 4;
    }


    bestMoves = findWinningMoves(AIMarker, board);
    if (bestMoves.length > 0) {
      return selectRandomElement(bestMoves);
    }

    bestMoves = preventPlayerWin();
    if (bestMoves.length > 0) {
      return selectRandomElement(bestMoves);
    }

    bestMoves = findWinInTwoMoves(board);
    if (bestMoves > -1) {
      return bestMoves;
    }

    return makeRandomMove();

}

/** accepts placement
  * updates the board and all of the lines
  *
  * accepts number as argument, indicating the space on the board
  */
function placeMarker(space) {

  function countEmptySpaces() {
    for (var i = 0, nullCount = 0; i < board.length; i++) {
      if (board[i].marker === null) {
        nullCount++;
      }
    }
    return nullCount;
  }

  var lines = new Lines(board);

    // update the space with the appropriate marker, determined by who is
    // the current player

    // determines what the current marker is, 'x' or 'o', depending on
    // whose turn it is
    var currentMarker = isPlayersTurn ? playerMarker : AIMarker;

    board[space].marker = currentMarker;

    // var rowNum =  board[space].row,
    //     colNum = board[space].col,
    //     diag1 = board[space].diag1,
    //     diag2 = board[space].diag2;


    var victoryArray;


    victoryArray = checkForWin(currentMarker);

    if (victoryArray.length > 0) {

      showMessage(isPlayersTurn ? "You Won!" : "You Lost!", 3000);

      setTimeout(function() {
        resetGame();
      }, 4000);

      victory = true;
      gameInProgress = true;

      // TODO: send to view to show winning lines
      drawWinningLines(victoryArray);
      // run victory functions -> show winning lines, message to player, etc
    } else if (countEmptySpaces() === 0) {

    // DRAW condition: shows message and resets game
      victory = true; // change to gameInProgress
      // TODO: write draw conditions
      gameInProgress = true;

      showMessage('DRAW!', 3000);
      setTimeout(function() {
        resetGame();
      }, 4000);

    }
}

// will test for win
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
function startGameButton() {

  if (!gameInProgress) {
    if (playerGoesFirst) {
      isPlayersTurn = true;
    } else {
      isPlayersTurn = false;
    }


    var settingsBox = document.getElementById('settings-box');
    var settingsOverlay = document.getElementById('settings-overlay');
    var settingsButton = document.getElementById('settings-btn');


    addClass(settingsButton, 'visible');
    if (playerMarkerNextTurn === 'x') {
      playerMarker = 'x';
      AIMarker = 'o';
    } else {
      playerMarker = 'o';
      AIMarker = 'x';
    }

    gameInProgress = true;
    gameTurn();
  } else {
    // this code will cause the game to reset if the game is running
    resetGame();
  }

}



// game turn outline:

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

  // var currentMarker = isPlayersTurn ? playerMarker : AIMarker;
  var AISpaceSelection;

  /** this will hold the retured value from checkForWin(), which is an
      array of all the winning lines
    */


  if (victory === false) {
    if (isPlayersTurn) {
      // TODO: possibly message to player informing player of turn
    } else {
      // gives time buffer between player and AI moves

      window.setTimeout(function() {
        AISpaceSelection = AITurn();
        placeMarker(AISpaceSelection);
        drawMarker(AISpaceSelection, AIMarker)
        isPlayersTurn = true;
      }, 750);
    }


  }

}

// this function resets board and UI to initial state
function resetGame() {
  createInitialBoard();

  var tableCells = document.getElementsByTagName('td');
  for (var i = 0; i < tableCells.length; i++) {
    tableCells[i].innerHTML = '';
  }

  var winningLines = document.getElementsByClassName('winning-line');

  for (var i = 0; i < winningLines.length; i++) {
    winningLines[i].parentElement.removeChild(winningLines[i]);
  }
  if (playerGoesFirst) {
    isPlayersTurn = true;
  } else {
    isPlayersTurn = false;
  }

  if (playerMarkerNextTurn === 'x') {
    playerMarker = 'x';
    AIMarker = 'o';
  } else {
    playerMarker = 'o';
    AIMarker = 'x';
  }


  gameInProgress = true;
  victory = false;
  gameTurn();

}


/*************************
VIEW
*************************/



/** This function will display a message to the user.
    msg: a string that will be the message
    time: the amount of time in ms to display the message, if undefined
      message will stay indefinitely
  */
function showMessage(msg, time) {

  // TODO: add messageDisplaying bool to stop play when a message is displayed

  var messageBox = document.getElementById('message-box');
  messageBox.innerHTML = msg;

  addClass(messageBox, 'show-message');
  window.setTimeout(function() {
    removeClass(messageBox, 'show-message');
  }, time);

}

// function that adds a class
function addClass(elem, style) {
  elem.className += ' ' + style;
}

// function that removes a class
function removeClass(elem, style) {
  var elemClassList = elem.className;
  var startIndex = elemClassList.indexOf(' ' + style);
  if (startIndex > -1) {
    var revertedClassList = elemClassList.slice(0, startIndex);
    elem.className = revertedClassList;
  }
}

function drawMarker(space, marker) {
  var space = document.getElementById(space);
  var divElem = document.createElement('div');
  divElem.className = 'div-square';

  space.appendChild(divElem);

  if (marker === 'x') {
    // draws an animated 'x' marker onto the board

    var line1 = document.createElement('div');
    line1.className = 'x-line1';
    var line2 = document.createElement('div');
    line2.className = 'x-line2';
    divElem.appendChild(line1);
    divElem.appendChild(line2);

    window.setTimeout(function() {
      line1.className += ' line1-end';
      line2.className += ' line2-end';

    }, 100);

  } else {
    // draws an animated 'o' marker onto the board

    var circle = document.createElement('div');
    circle.className = 'circle-small-size';
    divElem.appendChild(circle);

    window.setTimeout(function() {
      circle.className += ' circle-full-size';
    }, 10);



  }

}

/** this function will draw lines through the winning lines
    accepts an array of the winning lines
  */
function drawWinningLines(winningLines) {

  function drawLine(startRow, direction) {
    var line = document.createElement('div');

    // use class to collect and remove when game restarts
    addClass(line, 'winning-line');

    if (direction === 'horizontal') {
      addClass(line, 'begin-line-horizontal');
      addClass(line, 'begin-row' + startRow);

      document.getElementById('table-container').appendChild(line);
      setTimeout(function () {

        addClass(line, 'end-line-horizontal');
      }, 100);

    } else if (direction === 'vertical') {
      addClass(line, 'begin-line-vertical');
      addClass(line, 'begin-col' + startRow);

      document.getElementById('table-container').appendChild(line);
      setTimeout(function () {
        addClass(line, 'end-line-vertical');
      }, 100);

    } else if (direction === 'diagonal-to-right') {
      addClass(line, 'begin-diag-to-right');

      document.getElementById('table-container').appendChild(line);
      setTimeout(function () {

        addClass(line, 'end-diag-to-right');
      }, 100);

    } else if (direction === 'diagonal-to-left') {
      addClass(line, 'begin-diag-to-left');

      document.getElementById('table-container').appendChild(line);
      setTimeout(function () {

        addClass(line, 'end-diag-to-left');
      }, 100);
    }



  } // end drawLine


  for (var i = 0; i < winningLines.length; i++) {
    if (winningLines[i] === 'rows0') {
      drawLine(0, 'horizontal');
    } else if (winningLines[i] === 'rows1') {
      drawLine(1, 'horizontal');
    } else if (winningLines[i] === 'rows2') {
      drawLine(2, 'horizontal');
    }

    if (winningLines[i] === 'cols0') {
      drawLine(0, 'vertical');

    } else if (winningLines[i] === 'cols1') {
      drawLine(1, 'vertical');

    } else if (winningLines[i] === 'cols2') {
      drawLine(2, 'vertical');

    }

    if (winningLines[i] === 'diags0') {
      drawLine(0, 'diagonal-to-right');
    }

    if (winningLines[i] === 'diags1') {
      drawLine(0, 'diagonal-to-left');
    }
  }
} // end drawWinningLines


window.onload = function() {

  /** This function handles what happens when a user selects a button
      within the settings screen
    */
  function checkSettingBox(e) {


    switch (e.target.id) {

      case 'x-marker-btn':

        playerMarkerNextTurn = 'x';

        addClass(document.getElementById('x-marker-btn'), 'active-setting-btn');
        removeClass(document.getElementById('o-marker-btn'), 'active-setting-btn');
        break;

      case 'o-marker-btn':

        playerMarkerNextTurn = 'o';


        addClass(document.getElementById('o-marker-btn'), 'active-setting-btn');
        removeClass(document.getElementById('x-marker-btn'), 'active-setting-btn');
        break;

      case 'you-btn':
        playerGoesFirst = true;
        addClass(document.getElementById('you-btn'), 'active-setting-btn');
        removeClass(document.getElementById('ai-btn'), 'active-setting-btn');
        break;

      case 'ai-btn':
        playerGoesFirst = false;
        addClass(document.getElementById('ai-btn'), 'active-setting-btn');
        removeClass(document.getElementById('you-btn'), 'active-setting-btn');
        break;


    }


  }

  function clickSpace(e) {
    if (isPlayersTurn && victory === false) {
      var spaceSelection = e.target.id;

      // tests whether space on board is empty
      if (spaceSelection && verifyPlayerMove(spaceSelection)) {
        placeMarker(spaceSelection);
        drawMarker(spaceSelection, playerMarker)
        isPlayersTurn = false;
        gameTurn();
      }
    }
  }

  function clickStartBtn() {
    // TODO: add code for start button handler
    toggleSettings();
    startGameButton();
  }

  function toggleSettings() {
    var settingsButton = document.getElementById('settings-btn');
    var startButton = document.getElementById('begin-game-btn');
    if (gameInProgress) {
      startButton.innerHTML = 'Restart';
    }

    // if the settingsBox does not have the move-box class:
    if (settingsBox.className.indexOf('move') < 0) {
      addClass(settingsBox, 'move-settings');

      settingsButton.innerHTML = "Settings";

    } else {
      removeClass(settingsBox, 'move-settings');

      // change text of settings button
      settingsButton.innerHTML = "Resume";

    }
  }

  function initializeAllEventHandlers() {
    var boardSpaces = document.getElementsByTagName('td'),
        startButton = document.getElementById('begin-game-btn'),
        settingsButtons = document.getElementsByClassName('setting-btn');

    for (var i = 0; i < boardSpaces.length; i++) {
      boardSpaces[i].addEventListener('click', clickSpace);
    }
    startButton.addEventListener('click', clickStartBtn);
    settingsButton.addEventListener('click', toggleSettings);


    for (var i = 0; i < settingsButtons.length; i++) {
      settingsButtons[i].addEventListener('click', checkSettingBox);
    }
  }

  var settingsButton = document.getElementById('settings-btn');
  var startButton = document.getElementById('begin-game-btn');
  if (gameInProgress) {
    startButton.innerHTML = 'Restart';
  } else {
    startButton.innerHTML = 'Begin Game';
  }

  var settingsBox = document.getElementById('settings-box');


//////////////////////////

initializeAllEventHandlers();


};
