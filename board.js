function Board (sideLength) {
  this.sideLength = sideLength;
  this.boardSize = sideLength * sideLength;
  this.board = generateEmptyBoard(this.boardSize);
  
  function generateEmptyBoard(boardSize) {
    var board = [];
    for(var i = 0; i < boardSize; i++) {
      board[i] = undefined;
    }
    return board;
  }
};

Board.prototype = (function (){
  function placeMove(space, moveSignature) {
    this.board[space] = moveSignature;
  }
  
  function openSpaces() {
    var openSpaces = [];
    for(var i = 0, j = this.board.length; i < j; i++) {
      if(this.board[i] === undefined) {
        openSpaces.push(i);
      }
    }
    return openSpaces;
  }

  function rows() {
    var rowIndex = 0;
    var rows = [];
    for(var i=0, j=this.sideLength; i<j; i++) {
      var row = [];
      for(var k=0; k<j; k++) {
        row.push(rowIndex);
        rowIndex++;
      }
      rows.push(row);
    }
    return rows;
  }

  function columns() {
    var columnStartingIndex = 0;
    var columns = []
    for(var i=0, j=this.sideLength; i<j; i++) {
      var column = [];
      var columnIndex = columnStartingIndex;
      for(var k=0; k<j; k++) {
        column.push(columnIndex);
        columnIndex += this.sideLength;
      }
      columns.push(column);
      columnStartingIndex++
    }
    return columns;
  }

  function diagonals() {
    var l2r = leftToRightDiagonal(this.sideLength); 
    var r2l = rightToLeftDiagonal(this.sideLength);
    return [l2r, r2l];
  }

  // private
  function leftToRightDiagonal(sideLength) {
    return diagonal(sideLength, 0, sideLength + 1);
  }

  // private
  function rightToLeftDiagonal(sideLength) {
    return diagonal(sideLength, sideLength - 1, sideLength - 1);
  }

  // private
  function diagonal(boardSideLength, startingIndex, incrementValue) {
    var indexToAdd = startingIndex;
    var diagonal = [];
    for(var i=0, j=boardSideLength; i<j; i++) {
      diagonal.push(indexToAdd);
      indexToAdd += incrementValue;
    }
    return diagonal;
  }

  return { 
    placeMove: placeMove,
    openSpaces: openSpaces,
    rows: rows,
    columns: columns,
    diagonals: diagonals
  }
}());

module.exports = Board;