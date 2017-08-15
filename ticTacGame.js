const TicTacBoard = require('./ticTacBoard'),
			TicTacPlayer = require('./ticTacPlayer'),
			EventEmitter =  require('events').EventEmitter;


function TicTacGame() {
	this.player1 = new TicTacPlayer('Player 1', 'X');
	this.player2 = new TicTacPlayer('Player 2', 'O');
	this.board = new TicTacBoard();

	this.currentPlayer = null;

	this.gridMap = {};

	this.winner = false;
	this.gameOver = false;

	this.mapGenerator();
}

TicTacGame.prototype.mapGenerator = function () {
	let gridCounter = 1;

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			this.gridMap[gridCounter] = [i, j];
			gridCounter++;
		}
	}
}

TicTacGame.prototype.getCellRow = function(cell) {
	return this.gridMap[cell][0];
};

TicTacGame.prototype.getCellColumn = function(cell) {
	return this.gridMap[cell][1];
};

TicTacGame.prototype.isValidCell = function(cell) {
	if (cell > 0 && cell < 10 && cell % 1 === 0) {
		return true;
	}
	return false;
};

TicTacGame.prototype.getCellNum = function (row, col) {
	return Object.keys(this.gridMap).filter(key => this.gridMap[key].toString() === [row, col].toString())[0];
}

TicTacGame.prototype.isAvailable = function(row, col) {
	return this.board.isAvailable(row, col);
};

TicTacGame.prototype.setCell = function(row, col){
	this.board.setCell(row, col, this.currentPlayer.letter);
};

TicTacGame.prototype.switchPlayer = function() {
	if (this.currentPlayer === this.player1) {
		this.currentPlayer = this.player2;
	} else this.currentPlayer = this.player1;
};


TicTacGame.prototype.printGame = function(){

	process.stdout.write( '\n' + '\t' + '-'.repeat(25) + '\n' );

	for (let i = 0; i < 3; i++) {

		process.stdout.write( '\t' + '|');

		for (let j = 0; j < 3; j++) {
			process.stdout.write(' '.repeat(3) + (this.board.getCell(i, j) || ' ') + '\t' + '|');
		}

		process.stdout.write( '\n' + '\t' + '|');

		for (let j = 0; j < 3; j++) {
			process.stdout.write(' '.repeat(2) + '(' + this.getCellNum(i, j) + ')' + '\t' + '|');
		}

		process.stdout.write( '\n' + '\t' + '-'.repeat(25) + '\n' );

	}

	process.stdout.write( '\n' );

};

TicTacGame.prototype.startGame = function(){
	
	let buffer = '',
		  row, col;

	this.currentPlayer = this.player1;
	this.currentPlayer.changeStatus();

	this.board.on('cellSet', () => {
		this.currentPlayer.changeStatus();
		this.switchPlayer();
		this.currentPlayer.changeStatus();
		this.printGame();
		process.stdout.write(this.currentPlayer.name + ': ');
	});

	this.board.on('win', (char) => {
		if (this.currentPlayer.letter !== char) this.switchPlayer();
		this.printGame();
		console.log('Congrats ' + this.currentPlayer.name + '+='.repeat(10) );			
		process.stdin.end();
	});

	
	this.board.on('gridFull', () =>{
		this.printGame();
		console.log('Grid is full! No winner this round. ' + '-'.repeat(20) );
		process.stdin.end();
	});

	process.stdout.write( '\n'.repeat(2) + '\t' + '==========  GAME STARTED  ==========' + '\n'.repeat(2));

	this.printGame();

	process.stdout.write('Player 1 will be marked X. Player 2 will be marked O' + '\n');

	process.stdout.write('Please type the cell number(1-9):' + '\n' + this.currentPlayer.name + ': ');

	process.stdin.on( 'data', chunk => {
			
		buffer = chunk.toString()[0];


		if (!this.isValidCell(buffer)) {
			console.log('Invalid cell number ' + buffer + '. Please trye again.');
			process.stdout.write(this.currentPlayer.name + ': ');
			return;
		}

		row = this.getCellRow(buffer);
		col = this.getCellColumn(buffer);

		try {
			this.setCell(row, col);
		} catch(e) {
			// statements
			console.log(e.message + '! Please trye again.');
			process.stdout.write(this.currentPlayer.name + ': ');
		}

	});
};

module.exports = TicTacGame;
