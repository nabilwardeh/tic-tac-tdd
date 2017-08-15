const TicTacGame = require('./ticTacGame');

describe('TicTacGame should', () => {
  let game;

  beforeEach(() => {
    game = new TicTacGame();
  });

  afterEach(() => {
    game = null;
  });

  test('create two player instances', () => {
    expect(game.player1).toExist;
    expect(game.player2).toExist;
  });

  test('create a grid map to facilitate accessing the game board', () => {
    expect(game.gridMap).toExist;
  });

  test('create a grid map to facilitate accessing the game board', () => {
    expect(game.gridMap).toExist;
    expect(game.getCellRow(6)).toBe(1);
    expect(game.getCellColumn(6)).toBe(2);
  });

  test('check if a cell is valid', () => {
    expect(game.isValidCell(6)).toBe(true);
    expect(game.isValidCell(0)).toBe(false);
    expect(game.isValidCell(11)).toBe(false);
    expect(game.isValidCell(1.5)).toBe(false);
  });

  test('switdh players', () => {
    game.currentPlayer = game.player1;
    expect(game.currentPlayer).toBe(game.player1);
    game.switchPlayer();
    expect(game.currentPlayer).toBe(game.player2);
    game.switchPlayer();
    expect(game.currentPlayer).toBe(game.player1);
  });

});
