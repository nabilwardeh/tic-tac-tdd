const TicTacBoard = require('./ticTacBoard');

describe('ticTacBoard should', () => {
  let board;

  beforeEach(() => {
    board = new TicTacBoard(); 
  });

  afterEach(() => {
    board = null;
  });

  test('create a 3x3 grid and and initialize it to null', () => {
    const grid = [[null, null, null],
    			  [null, null, null],
    			  [null, null, null]];
    expect(board.ticTacGrid).toEqual(grid);
  });

  test('set a cell to value \'X\'', () => {
    board.setCell(0, 0, 'X');
    expect(board.ticTacGrid[0][0]).toBe('X');
  });

  test('fire \'cellSet\' event when cell set', done => {
    board.on('cellSet', data => {
      expect.anything();
      done();
    });

    board.setCell(0, 0, 'X');
  });

  test('fire \'cellSet\' event when cell set and report cell and setter', done => {
    board.on('cellSet', data => {
      expect(data).toEqual([0, 0, 'X']);
      done();
    });

    board.setCell(0, 0, 'X');
  });

  test('fire \'gridFull\' event when all cells set', done => {
    board.on('grid', data => {
      expect(data).toBe(9);
      done();
    });

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board.setCell(i, j, 'X');
      }
    }
  });


});
