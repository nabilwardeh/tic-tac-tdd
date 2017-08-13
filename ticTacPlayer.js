const TicTacBoard = require('./ticTacBoard');
const events = require('events');

function TicTacPlayer(name, letter) {
  this.name = name;
  this.letter = letter;
  this.canPlay = false;
}

TicTacPlayer.prototype = new events.EventEmitter;

TicTacPlayer.prototype.makeMove = function (row, col) {
	if (!this.canPlay) throw new Error('Not allowed to play');
  try {
    TicTacBoard.setCell(row, col, this.letter);
    this.emit('nadeNove', {row: row, col: col, letter: this.letter});
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = TicTacPlayer;
