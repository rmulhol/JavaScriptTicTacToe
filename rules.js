function Rules(board) {
  this.board = board;
};

Rules.prototype = (function() {
  function gameOver(playerOne, playerTwo) {
    return  this.playerWin(playerOne) || 
            this.playerWin(playerTwo) || 
            noSpacesAvailable(this.board);
  }

  function playerWin(player) {
    var winningCombos = winningCombinations(this.board);
    for(var comboIndex=0, totalCombos=winningCombos.length; comboIndex<totalCombos; comboIndex++) {
      var winningCombo = winningCombos[comboIndex];
      var consecutiveSpaces = 0;
      for(var spaceIndex=0, totalSpaces = winningCombo.length; spaceIndex<totalSpaces; spaceIndex++) {
        if(this.board.board[winningCombo[spaceIndex]] === player) {
          consecutiveSpaces += 1;
        }
      }
      if(consecutiveSpaces === winningCombo.length) {
        return true;
      }
    }
    return false;
  }
  
  // private
  function winningCombinations(board) {
    var rows = board.rows();
    var columns = board.columns();
    var diagonals = board.diagonals();
    return rows.concat(columns, diagonals);
  }

  // private
  function noSpacesAvailable(board) {
    return board.openSpaces().length == 0;
  }

  return {
    gameOver: gameOver,
    playerWin: playerWin
  };
}());

module.exports = Rules;