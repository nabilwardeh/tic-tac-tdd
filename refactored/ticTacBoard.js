const events = require('events'); 

function TicTacBoard() {
	this.ticTacGrid = [];
	this.cellsCompleted = 0;
	this.boardGenerator();
	this.emit('boardReady');
}

TicTacBoard.prototype = new events.EventEmitter;

TicTacBoard.prototype.boardGenerator = function () {
	const tempArray = [];

	for (let i = 0; i < 3; i++) {
		tempArray.push(null);
	}

	for (let i = 0; i < 3; i++) {
		this.ticTacGrid.push(tempArray);
	}
};

TicTacBoard.prototype.isAvailable = function(row, col) {
	return this.ticTacGrid[row][col] === null;
};

TicTacBoard.prototype.setCell = function(row, col, char){
	if (!this.isAvailable(row, col)) throw new Error('cellAssigned');

	this.ticTacGrid[row][col] = char;
	this.cellsCompleted++;
	
	this.emit('cellSet', [row, col, char]);

	//if (this.cellsCompleted === 9) this.emit('gridFull', 9);

	return true;
};

TicTacBoard.prototype.checkRows = function (char) {
	return this.ticTacGrid.reduce((acc, subArray, idx) => {
		return acc.push(subArray.reduce((acc, curr) => {
			if (curr === char) return ++acc;
			return acc;
		}, 0));
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
	return this.checkRows(char) || this.checkCols(char) || this.checkDiags(char);
};

module.exports = TicTacBoard;
