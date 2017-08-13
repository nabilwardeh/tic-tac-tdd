const events = require('events'); 

function TicTacBoard() {
	this.ticTacGrid = [];
	this.cellsCompleted = 0;
	this.boardGenerator();
	this.emit('boardReady');
}

TicTacBoard.prototype = new events.EventEmitter;

TicTacBoard.prototype.boardGenerator = function () {
	this.ticTacGrid = Array.from({length: 3}, () => [null, null, null]);
};

TicTacBoard.prototype.isAvailable = function(row, col) {
	return this.ticTacGrid[row][col] === null;
};

TicTacBoard.prototype.setCell = function(row, col, char){
	if (!this.isAvailable(row, col)) throw new Error('cellAssigned');

	this.ticTacGrid[row][col] = char;
	this.cellsCompleted++;
	
	this.emit('cellSet', [row, col, char]);

	if (this.cellsCompleted === 9) this.emit('gridFull');

	return true;
};

module.exports = TicTacBoard;
