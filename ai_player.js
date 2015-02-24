function AiPlayer(moveSignature) {
  this.moveSignature = moveSignature;
};

AiPlayer.prototype = (function() {
  function getMove(rules) {
    var opponentMoveSignature = getOpponent(rules.board.board, this.moveSignature);
    if(opponentMoveSignature == null) {
      return 0;
    }

    var bestMove = -1;
    var bestScore = -100;
    var thisScore;
    var key;

    var openSpaces = rules.board.openSpaces();
    
    for(key in openSpaces) {
      rules.board.placeMove(openSpaces[key], this.moveSignature);
      thisScore = minimax(rules, this.moveSignature, opponentMoveSignature, false, 1);
      if(thisScore > bestScore) {
        bestScore = thisScore;
        bestMove = openSpaces[key];
      }
      rules.board.placeMove(openSpaces[key], undefined);
    }

    return bestMove;
  }

  // private
  function minimax(rules, myMoveSignature, opponentMoveSignature, myTurn, depth) {
    if(rules.gameOver(myMoveSignature, opponentMoveSignature)) {
      return scoreBoard(rules, myMoveSignature, opponentMoveSignature) / depth;
    }
    
    var openSpaces = rules.board.openSpaces();
    var thisScore;

    if(myTurn) {
      var bestScore = -100;

      for(var key in openSpaces) {
        rules.board.placeMove(openSpaces[key], myMoveSignature);
        thisScore = minimax(rules, myMoveSignature, opponentMoveSignature, false, depth + 1);
        if(thisScore > bestScore) {
          bestScore = thisScore;
        }
        rules.board.placeMove(openSpaces[key], undefined); 
      }
      
      return bestScore;
    } else {
      var worstScore = 100;

      for(var key in openSpaces) {
        rules.board.placeMove(openSpaces[key], opponentMoveSignature);
        thisScore = minimax(rules, myMoveSignature, opponentMoveSignature, true, depth + 1);
        if(thisScore < worstScore) {
          worstScore = thisScore;
        }
        rules.board.placeMove(openSpaces[key], undefined);
      }

      return worstScore;
    }
  }

  // private
  function scoreBoard(rules, myMoveSignature, opponentMoveSignature) {
    if(rules.playerWin(myMoveSignature)) {
      return 10;
    } else if(rules.playerWin(opponentMoveSignature)) {
      return -10;
    } else {
      return 0;
    }
  }

  // private
  function getOpponent(board, moveSignature) {
    for(var i=0, j=board.length; i<j; i++) {
      if(board[i] != moveSignature && board[i] != undefined) {
        return board[i];
      }
    }
    return null; 
  }

  return {
    getMove: getMove,
  }
})();

module.exports = AiPlayer;