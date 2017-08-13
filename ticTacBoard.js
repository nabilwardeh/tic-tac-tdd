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

	this.checkWin(char);

	if (this.cellsCompleted === 9) this.emit('gridFull');

	return true;
};

TicTacBoard.prototype.checkRows = function (char) {
	return this.ticTacGrid.reduce((arrayAcc, subArray, idx) => {
		arrayAcc.push(subArray.reduce((subArrayAcc, curr) => {
			if (curr === char) ++subArrayAcc;
			return subArrayAcc;
		}, 0));
		return arrayAcc;
	}, []).filter(item => (item === 3)).length;
};

TicTacBoard.prototype.checkCols = function (char) {
	return this.ticTacGrid[0].map((col, idx) => {
		return this.ticTacGrid.reduce((acc, subArray) => {
			if (subArray[idx] === char) return ++acc;
			return acc;
		}, 0);
	}).filter(item => (item === 3)).length;
};

TicTacBoard.prototype.checkDiags = function (char) {
	const diags = [0, 0];
	this.ticTacGrid[0].map((col, idx) => {
		return this.ticTacGrid.map( subArray => {
			if (subArray[idx] === char) diags[0]++;
			if (subArray[subArray.length - 1 - idx] === char) diags[1]++;
		});
	});
	return diags.filter(item => (item === 3)).length;
};

TicTacBoard.prototype.checkWin = function(char) {
	if (this.checkRows(char) || this.checkCols(char) || this.checkDiags(char)) this.emit('win', char);
};



module.exports = TicTacBoard;
