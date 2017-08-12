const TicTac = require('./tic-tac');

describe('tic-tac Game should', () => {
  let game;

  beforeEach(() => {
    game = new TicTac(); 
  });

  test('create a 3x3 grid and and initialize it to null', () => {
    const grid = [[null, null, null],
    			  [null, null, null],
    			  [null, null, null]];
    expect(game.ticTacGrid).toEqual(grid);
  });

  test('create an array and populate it with the grid corresponding indexes', () => {
    const map = {
    	1: [0, 0],
    	2: [0, 1],
		3: [0, 2],
    	4: [1, 0],
    	5: [1, 1],
		6: [1, 2],
    	7: [2, 0],
    	8: [2, 1],
		9: [2, 2]
    };
    expect(game.gridMap).toEqual(map);
  });

  test('create two players and set player1 to start', () => {
	const player1 = { name: 'Player 1', letter: 'X'},
		  player2 = { name: 'Player 2', letter: 'O'};
    expect(game.player1).toEqual(player1);
    expect(game.player2).toEqual(player2);    
    expect(game.currentPlayer).toEqual(player1);    
  });



});
