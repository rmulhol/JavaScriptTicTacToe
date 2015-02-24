var assert = require('assert');
var Board = require('../board.js');

describe('Board', function() {

  describe('board', function() {
    it('returns an array with 9 spaces for a 3x3 board', function() {
      assert.equal(new Board(3).board.length, 9);
    })

    it('returns an array with 16 spaces for a 4x4 board', function() {
      assert.equal(new Board(4).board.length, 16);
    })
  })

  describe('placeMove()', function() {
    var testBoard = new Board(3);
    
    it('occupies a space on the board', function() {  
      assert.equal(testBoard.board[0], undefined);
      testBoard.placeMove(0, "X");
      assert.equal(testBoard.board[0], "X");
    })

    it('can clear a space on the board', function() {
      assert.equal(testBoard.board[0], "X");
      testBoard.placeMove(0, undefined);
      assert.equal(testBoard.board[0], undefined);
    })
  })

  describe('openSpaces()', function() {
    it('returns indexes for all spaces if the board is empty', function() {
      assert.deepEqual(new Board(3).openSpaces(), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
    })

    it('returns only indexes for open spaces when some are claimed', function() { 
      var testBoard = new Board(3);

      testBoard.placeMove(0, "X");
      testBoard.placeMove(1, "O");
      testBoard.placeMove(2, "X");
     
      assert.deepEqual(testBoard.openSpaces(), [3, 4, 5, 6, 7, 8]);
    })
  })

  describe('rows()', function() {
    it('returns indexes for rows on a 3x3 board', function() {
      var rows3x3 = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

      assert.deepEqual(new Board(3).rows(), rows3x3);
    })

    it('returns indexes for rows on a 4x4 board', function() {
      var rows4x4 = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];

      assert.deepEqual(new Board(4).rows(), rows4x4);
    })
  })

  describe('columns()', function() {
    it('returns indexes for columns on a 3x3 board', function() {
      var columns3x3 = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];

      assert.deepEqual(new Board(3).columns(), columns3x3);
    })

    it('returns indexes for columns on a 4x4 board', function() {
      var columns4x4 = [[0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15]];

      assert.deepEqual(new Board(4).columns(), columns4x4);
    })
  })

  describe('diagonals()', function() {
    it('returns indexes for diagonals on a 3x3 board', function() {
      var diagonals3x3 = [[0, 4, 8], [2, 4, 6]];

      assert.deepEqual(new Board(3).diagonals(), diagonals3x3);
    })

    it('returns indexes for diagonals on a 4x4 board', function() {
      var diagonals4x4 = [[0, 5, 10, 15], [3, 6, 9, 12]];

      assert.deepEqual(new Board(4).diagonals(), diagonals4x4)
    })
  })

});