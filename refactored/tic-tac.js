const events = require('events'),
	  TicTacBoard = require('./ticTacBoard'),
	  TicTacPlayer = require('./ticTacPlayer');

function TicTacGame() {
	this.player1 = new TicTacPlayer('Player 1', 'X');
	this.player2 = new TicTacPlayer('Player 2', 'O');
	this.board = new TicTacBoard();

	this.currentPlayer = this.player1;

	this.gridMap = {};
	this.winner = null;
	this.cellsCompleted = 0;
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
};

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
	return this.ticTacGrid[row][col] === null;
};

TicTacGame.prototype.setCell = function(row, col){
	this.ticTacGrid[row][col] = this.currentPlayer.letter;
	this.cellsCompleted++;
};

TicTacGame.prototype.switchPlayer = function() {
	if (this.currentPlayer.name === 'Player 1') {
		this.currentPlayer = this.player2;
	} else this.currentPlayer = this.player1;
};

TicTacGame.prototype.checkWin = function(row, col) {
	let r = 0;
	let c = 0; 
	let d = 0; 
	let bd = 0;
	let gridSize = this.ticTacGrid.length;
	
	for (let i =0; i < this.ticTacGrid.length; i++) {
		if (this.ticTacGrid[row][i] === this.currentPlayer.letter) r++;
		if (this.ticTacGrid[i][col] === this.currentPlayer.letter) c++;
		if (this.ticTacGrid[i][i] === this.currentPlayer.letter) d++;
		if (this.ticTacGrid[gridSize -1 - i][i] === this.currentPlayer.letter) bd++;
	}

	if (r === gridSize || c === gridSize || d === gridSize || bd === gridSize) {
		this.winner = this.currentPlayer;
		this.gameOver = true;
	}

};

TicTacGame.prototype.printGame = function(){

	process.stdout.write( '\n' + '\t' + '-'.repeat(25) + '\n' );

	for (let i = 0; i < this.ticTacGrid.length; i++) {

		process.stdout.write( '\t' + '|');

		for (let j = 0; j < this.ticTacGrid[i].length; j++) {
			process.stdout.write(' '.repeat(3) + (this.ticTacGrid[i][j] || ' ') + '\t' + '|');
		}

		process.stdout.write( '\n' + '\t' + '|');

		for (let j = 0; j < this.ticTacGrid[i].length; j++) {
			process.stdout.write(' '.repeat(2) + '(' + this.getCellNum(i, j) + ')' + '\t' + '|');
		}

		process.stdout.write( '\n' + '\t' + '-'.repeat(25) + '\n' );

	}

	process.stdout.write( '\n' );

};

TicTacGame.prototype.startGame = function(){
	
	var buffer = '',
		row, col;


	process.stdout.write( '\n'.repeat(2) + '\t' + '==========  GAME STARTED  ==========' + '\n'.repeat(2));

	myGame.printGame();

	process.stdout.write('Player 1 will be marked X. Player 2 will be marked O' + '\n');

	process.stdout.write('Please type the cell number(1-9):' + '\n' + this.currentPlayer.name + ': ');

	process.stdin.on( 'data', chunk => {
			
		buffer = chunk.toString()[0];

		if (this.gameOver) {
			console.log('Game over!');
			return;
		}
		
		if (!this.isValidCell(buffer)) {
			console.log('Invalid cell number ' + buffer + '. Please trye again.');
			process.stdout.write(this.currentPlayer.name + ': ');
			return;
		}

		row = this.getCellRow(buffer);
		col = this.getCellColumn(buffer);


		if (!this.isAvailable(row, col)) {
			console.log('Cell ' + buffer + ' has been marked! Please trye again.');
			process.stdout.write(this.currentPlayer.name + ': ');
			return;
		}
		
		this.setCell(row, col);

		this.checkWin(row, col);

		if (this.winner) {
			this.printGame();
			console.log('Congrats ' + this.currentPlayer.name + '+='.repeat(10) );
			process.stdin.end();
			return;
		}

		if (this.cellsCompleted === 9) {
			this.printGame();
			this.gameOver = true;
			console.log('Grid is full! No winner this round. ' + '-'.repeat(20) );
			process.stdin.unref();
			return;
		}

		this.switchPlayer();
		this.printGame();
		process.stdout.write(this.currentPlayer.name + ': ');
	});

};


// var myGame = new TicTacGame();

// myGame.startGame();

module.exports = TicTacGame;













