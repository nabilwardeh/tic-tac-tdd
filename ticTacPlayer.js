const TicTacBoard = require('./ticTacBoard');
const util = require('util');
const EventEmitter = require('events').EventEmitter;

function TicTacPlayer(name, letter) {
  this.name = name;
  this.letter = letter;
  this.canPlay = false;
}

util.inherits(TicTacPlayer, EventEmitter);

TicTacPlayer.prototype.changeStatus = function () {
  if (this.canPlay) this.canPlay = false;
  else this.canPlay = true;
};

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
