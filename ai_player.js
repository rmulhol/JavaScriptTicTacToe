function AiPlayer(moveSignature) {
  this.moveSignature = moveSignature;
};

AiPlayer.prototype = (function() {
  function getMove(rules) {
    var opponent = this.getOpponent(rules.board.board);
    if(opponent == null) {
      return 0;
    }

    var bestMove = -1;
    var bestScore = -100;
    var thisScore;
    var key;

    var openSpaces = rules.board.openSpaces();
    
    for(key in openSpaces) {
      rules.board.placeMove(openSpaces[key], this.moveSignature);
      thisScore = this.minimax(rules, opponent, false, 1);
      if(thisScore > bestScore) {
        bestScore = thisScore;
        bestMove = openSpaces[key];
      }
      rules.board.placeMove(openSpaces[key], undefined);
    }

    return bestMove;
  }

  function minimax(rules, opponent, myTurn, depth) {
    if(rules.gameOver(this.moveSignature, opponent)) {
      return scoreBoard(rules, opponent) / depth;
    }
    
    var openSpaces = rules.board.openSpaces();
    var thisScore;

    if(myTurn) {
      var bestScore = -100;

      for(var key in openSpaces) {
        rules.board.placeMove(openSpaces[key], this.moveSignature);
        thisScore = this.minimax(rules, opponent, false, depth + 1);
        if(thisScore > bestScore) {
          bestScore = thisScore;
        }
        rules.board.placeMove(openSpaces[key], undefined); 
      }
      
      return bestScore;
    } else {
      var worstScore = 100;

      for(var key in openSpaces) {
        rules.board.placeMove(openSpaces[key], opponent);
        thisScore = this.minimax(rules, opponent, true, depth + 1);
        if(thisScore < worstScore) {
          worstScore = thisScore;
        }
        rules.board.placeMove(openSpaces[key], undefined);
      }

      return worstScore;
    }
  }

  function scoreBoard(rules, opponent) {
    if(rules.playerWin(this.moveSignature)) {
      return 10;
    } else if(rules.playerWin(opponent)) {
      return -10;
    } else {
      return 0;
    }
  }

  function getOpponent(board) {
    for(var i=0, j=board.length; i<j; i++) {
      if(board[i] != this.moveSignature && board[i] != undefined) {
        return board[i];
      }
    }
    return null; 
  }

  return {
    getMove: getMove,
    minimax: minimax,
    scoreBoard: scoreBoard,
    getOpponent: getOpponent
  }
})();

module.exports = AiPlayer;