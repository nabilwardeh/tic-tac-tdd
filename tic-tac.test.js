const TicTac = require('./tic-tac');

describe('tic-tac Game should', () => {
  let game;

  beforeEach(() => {
    game = new TicTacGame(); 
  });

  test('create a 3x3 grid and and initialize it to numm', () => {
    const score = game.score();
    expect(score).toBe(0);
  });

});
