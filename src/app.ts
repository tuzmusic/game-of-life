console.log('Hello world!!! blah');

export function testFunc() {
  return 42;
}

export interface Cell {
  isAlive: boolean;
  row: number;
  column: number;
}

export type Board = Cell[][]

export class Game {
  board: Board;
  
  constructor(board: Board) {
    this.board = board;
  }
  
  findCellAt(_row: number, _column: number): Cell {
    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      const thisRow = this.board[rowIndex];
      for (let colIndex = 0; colIndex < thisRow.length; colIndex++) {
        if (rowIndex === _row
          && colIndex === _column) {
          return thisRow[colIndex];
        }
      }
    }
  }
  
  neighborsFor(cell: Cell): Cell[] {
    const { row, column } = cell;
    const coords: [number, number][] = [
      [row, column - 1],
      [row, column + 1],
      [row - 1, column],
      [row + 1, column],
      [row - 1, column - 1],
      [row - 1, column + 1],
      [row + 1, column - 1],
      [row + 1, column + 1],
    ];
    
    const cells: Cell[] = [];
    coords.forEach(([r, c]) => {
      // for each neighbor coord, IF THE COORD IS VALID, add that cell
      if (r >= 0 // not in first row
        && c >= 0 // not in first column
        && r < this.board[0].length // not in last row
        && c > this.board.length) // not in last column
      {
        cells.push(this.findCellAt(r, c));
      }
    });
    
    return cells;
  }
  
  printCurrentBoard() {
    console.log('*******************');
    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      const thisRow = this.board[rowIndex];
      console.log(thisRow.map(row => row.isAlive ? 'T' : 'F'));
    }
    console.log('*******************');
  }
  
  playTurn() {
    const tempBoard: Board = [...this.board];
    
    // iterate each cell in the board
    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      const thisRow = this.board[rowIndex];
      for (let colIndex = 0; colIndex < thisRow.length; colIndex++) {
        const thisCell = thisRow[colIndex];
        this.processCell(thisCell); // MUTATES THE CELL
      }
    }
    
    this.board = [...tempBoard];
  }
  
  processCell(cell: Cell) {
    const neighbors = this.neighborsFor(cell);
    const liveNeighborsCt = neighbors.filter((c: Cell) => c.isAlive).length;
    
    if (liveNeighborsCt < 2)
      this.kill(cell);
    else if (cell.isAlive && (liveNeighborsCt === 2 || liveNeighborsCt === 3))
      this.regenerate(cell);
    else if (liveNeighborsCt > 3)
      this.kill(cell);
    else if (!cell.isAlive && liveNeighborsCt === 3)
      this.regenerate(cell);
  }
  
  kill(cell: Cell) {
    cell.isAlive = false;
  }
  
  regenerate(cell: Cell) {
    cell.isAlive = true;
  }
}

function playTheDamnGameAlready(board: Board, turnCount = 1) {
  const game = new Game(board);
  for (let turn = 0; turn < turnCount; turn++) {
    game.playTurn();
  }
}