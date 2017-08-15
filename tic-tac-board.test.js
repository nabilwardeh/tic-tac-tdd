const TicTacBoard = require('./ticTacBoard');

describe('ticTacBoard should', () => {
  let board;

  beforeEach(() => {
    board = new TicTacBoard();
  });

  afterEach(() => {
    board.removeAllListeners('cellSet');
    board.removeAllListeners('gridFull');
    board = null;
  });

  test('create a 3x3 grid and and initialize it to null', () => {
    const grid = Array.from({length: 3}, () => [null, null, null]);
    expect(board.ticTacGrid).toEqual(grid);
  });

  test('can report the contnt of a cell', () => {
    board.setCell(0, 0, 'X');
    expect(board.getCell(0, 0)).toBe('X');
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

  test('fire \'cellSet\' event when cell set and report cell and setter', done => {
    board.on('cellSet', data => {
      expect(data).toEqual([1, 2, 'O']);
      done();
    });

    board.setCell(1, 2, 'O');
  });

  test('fire \'gridFull\' event when all cells set', done => {
    board.on('gridFull', () => {
      done();
    });

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board.setCell(i, j, 'X');
      }
    }
  });

  test('fire \'win\' event when row cells are set', done => {
    board.on('win', data => {
      expect(data).toBe('X');
      done();
    });

    for (let j = 0; j < 3; j++) {
      board.setCell(0, j, 'X');
    }
  });

  test('fire \'win\' event when column cells are set', done => {
    board.on('win', data => {
      expect(data).toBe('X');
      done();
    });

    for (let j = 0; j < 3; j++) {
      board.setCell(j, 0, 'X');
    }
  });

  test('fire \'win\' event when diagonal cells are set', done => {
    board.on('win', data => {
      expect(data).toBe('O');
      done();
    });

    for (let j = 0; j < 3; j++) {
      board.setCell(j, j, 'O');
    }
  });

  test('fire \'win\' event when cross diagonal cells are set', done => {
    board.on('win', data => {
      expect(data).toBe('O');
      done();
    });

    for (let j = 0; j < 3; j++) {
      board.setCell(j, 2 - j, 'O');
    }
  });

  test('to throw \'Cell assigned\' error if cell was assigned', () => {
    function assignFullCell (){
      board.setCell(0, 0, 'X');
      board.setCell(0, 0, 'X');
    }

    expect(assignFullCell).toThrowError('Cell assigned');
  });

});
