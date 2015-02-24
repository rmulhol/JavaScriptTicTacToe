var assert = require('assert');
var AiPlayer = require('../ai_player.js');
var Rules = require('../rules.js');
var Board = require('../board.js');

describe('AiPlayer', function() {
  describe('moveSignature', function() {
    it('stores the players move signature', function() {
      assert.equal(new AiPlayer('X').moveSignature, 'X');
    })
  })

  describe('getMove()', function() {
    it('claims the top left corner if no opponent move', function() {
      var emptyBoard = new Board(3);
      var rules = new Rules(emptyBoard);

      assert.equal(new AiPlayer('X').getMove(rules), 0);
    })

    it('claims the middle if opponent takes the corner', function() {
      var boardWithCornerClaimed = new Board(3);
      boardWithCornerClaimed.placeMove(0, 'O');
      var rules = new Rules(boardWithCornerClaimed);

      assert.equal(new AiPlayer('X').getMove(rules), 4)
    })

    it('claims a winner if available', function() {
      var boardWithWinner = new Board(3);
      boardWithWinner.placeMove(0, 'X');
      boardWithWinner.placeMove(1, 'O');
      boardWithWinner.placeMove(8, 'X');
      boardWithWinner.placeMove(7, 'O');
      var rules = new Rules(boardWithWinner);

      assert.equal(new AiPlayer('X').getMove(rules), 4);
    })

    it('blocks a loser if no winner available', function() {
      var boardWithLoser = new Board(3);
      boardWithLoser.placeMove(0, 'O');
      boardWithLoser.placeMove(4, 'X');
      boardWithLoser.placeMove(8, 'O');
      boardWithLoser.placeMove(1, 'X');
      boardWithLoser.placeMove(7, 'O');
      var rules = new Rules(boardWithLoser);

      assert.equal(new AiPlayer('X').getMove(rules), 6);
    })

    it('blocks a fork', function() {
      var boardWithFork = new Board(3);
      boardWithFork.placeMove(0, 'O');
      boardWithFork.placeMove(4, 'X');
      boardWithFork.placeMove(8, 'O');
      var rules = new Rules(boardWithFork);

      assert.equal(new AiPlayer('X').getMove(rules), 1);
    })
  })

  describe('getOpponent()', function() {
    it('returns the opponent if an opponent move is on the board', function() {
      var boardWithOpponent = new Board(3);
      boardWithOpponent.placeMove(0, 'O');

      assert.equal(new AiPlayer('X').getOpponent(boardWithOpponent.board), 'O');
    })

    it('returns `null` if no opponent move on the board', function() {
      var boardWithoutOpponent = new Board(3);

      assert.equal(new AiPlayer('X').getOpponent(boardWithoutOpponent.board), null);
    })
  })
});