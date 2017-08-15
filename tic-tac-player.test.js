const TicTacPlayer = require('./TicTacPlayer');

describe('TicTacPlayer should', () => {
  let player;

  beforeEach(() => {
    player = new TicTacPlayer('Player 1', 'X');
  });

  afterEach(() => {
    player = null;
  });

  test('create a plyer object', () => {
    expect(player).toExist;
  });

  test('set the player name to the constructor\'s first arg', () => {
    expect(player.name).toBe('Player 1');
  });

  test('set the player letter to the constructor\'s second arg', () => {
    expect(player.letter).toBe('X');
  });

  test('set the player\'s cnaPlay property to \'false\'', () => {
    expect(player.canPlay).toBe(false);
  });

  test('should throw an error if makeMove was invoked while the player\'s canPlay is \'false\'', () => {
    expect(player.makeMove).toThrow('Not allowed to play');
  });

  test('should change its canPlay status', () => {
    player.changeStatus()
    expect(player.canPlay).toBe(true);
    player.changeStatus()
    expect(player.canPlay).toBe(false);
  });

});
