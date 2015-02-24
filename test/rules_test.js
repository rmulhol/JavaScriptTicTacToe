var assert = require('assert');
var Rules = require('../rules.js');
var Board = require('../board.js');

describe('Rules', function() {

  describe('gameOver()', function() {
    it('returns false if the board is empty', function() {
      assert(!new Rules(new Board(3)).gameOver('X', 'O'));
    })

    it('returns true if playerOne wins', function() {
      var playerOneWinBoard = new Board(3);

      playerOneWinBoard.placeMove(0, 'X');
      playerOneWinBoard.placeMove(1, 'X');
      playerOneWinBoard.placeMove(2, 'X');

      assert(new Rules(playerOneWinBoard).gameOver('X', 'O'));
    })

    it('returns true if playerTwo wins', function() {
      var playerTwoWinBoard = new Board(3);
      
      playerTwoWinBoard.placeMove(0, 'O');
      playerTwoWinBoard.placeMove(1, 'O');
      playerTwoWinBoard.placeMove(2, 'O');

      assert(new Rules(playerTwoWinBoard).gameOver('X', 'O'));
    })

    it('returns true for a tie game', function() {
      var tieGameBoard = new Board(3);

      tieGameBoard.placeMove(0, 'X');
      tieGameBoard.placeMove(1, 'O');
      tieGameBoard.placeMove(2, 'X');
      tieGameBoard.placeMove(3, 'O');
      tieGameBoard.placeMove(4, 'X');
      tieGameBoard.placeMove(5, 'O');
      tieGameBoard.placeMove(6, 'O');
      tieGameBoard.placeMove(7, 'X');
      tieGameBoard.placeMove(8, 'O');
      
      assert(new Rules(tieGameBoard).gameOver('X', 'O'));
    })
  })

  describe('playerWin()', function() {
    it('returns false for an empty board', function() {
      assert(!new Rules(new Board(3)).playerWin('X'));
    })

    it('returns false for a tie game', function() {
      var tieGameBoard = new Board(3);

      tieGameBoard.placeMove(0, 'X');
      tieGameBoard.placeMove(1, 'O');
      tieGameBoard.placeMove(2, 'X');
      tieGameBoard.placeMove(3, 'O');
      tieGameBoard.placeMove(4, 'X');
      tieGameBoard.placeMove(5, 'O');
      tieGameBoard.placeMove(6, 'O');
      tieGameBoard.placeMove(7, 'X');
      tieGameBoard.placeMove(8, 'O');

      assert(!new Rules(tieGameBoard).playerWin('X'));
    })

    it('returns true if player has won', function() {  
      var xWinBoard = new Board(3);
      
      xWinBoard.placeMove(0, 'X');
      xWinBoard.placeMove(1, 'X');
      xWinBoard.placeMove(2, 'X');
      
      assert(new Rules(xWinBoard).playerWin('X'));
    })
  })
});