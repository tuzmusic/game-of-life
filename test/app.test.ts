import { Board, Cell, Game } from '../src/app';

describe('game of life', () => {
  test('a turn', () => {
    const boardStates = [
      [false, false, false],
      [true, true, true],
      [false, false, false]
    ];
    
    const board: Board = [];
    for (let rowIndex = 0; rowIndex < boardStates.length; rowIndex++) {
      const thisRow = boardStates[rowIndex];
      const newRow: Cell[] = [];
      for (let colIndex = 0; colIndex < thisRow.length; colIndex++) {
        newRow.push({
          row: rowIndex,
          column: colIndex,
          isAlive: thisRow[colIndex]
        });
      }
      board.push(newRow);
    }
    
    const game = new Game(board);
    game.printCurrentBoard()
    game.playTurn();
    game.printCurrentBoard()
    
    const afterStates = [
      [false, true, false],
      [false, true, false],
      [false, true, false]
    ];
    
    for (let rowIndex = 0; rowIndex < boardStates.length; rowIndex++) {
      const thisRow = board[rowIndex];
      for (let colIndex = 0; colIndex < thisRow.length; colIndex++) {
        const thisCell = thisRow[colIndex];
        expect(thisCell.isAlive).toEqual(afterStates[rowIndex][colIndex]);
      }
    }
    
  });
});
