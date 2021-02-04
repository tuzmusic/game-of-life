console.log('Hello world!!! blah');

export function testFunc() {
  return 42;
}

interface Cell {
  isAlive: boolean;
  row: number;
  column: number;
}

type Board = Cell[][]

class Game {
  constructor(board: Board) {
    this.board = board
  }
  
  board: Board;
  
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
    /*
    const neighborW = this.findCellAt(row, column - 1);
    const neighborE = this.findCellAt(row, column + 1);
    const neighborN = this.findCellAt(row - 1, column);
    const neighborS = this.findCellAt(row + 1, column);
    const neighborNW = this.findCellAt(row - 1, column - 1);
    const neighborNE = this.findCellAt(row - 1, column + 1);
    const neighborSW = this.findCellAt(row + 1, column - 1);
    const neighborSE = this.findCellAt(row + 1, column + 1);
*/
    
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
  
  rules(cell: Cell) {
    const neighbors = this.neighborsFor(cell);
    const liveNeighborsCt = neighbors.filter((c: Cell) => c.isAlive).length;
    
    if (liveNeighborsCt < 2
    || cell.isAlive && liveNeighborsCt === 2 || liveNeighborsCt === 3
    || cell.isAlive && liveNeighborsCt > 3)
      this.kill(cell);
    
    if (!cell.isAlive && liveNeighborsCt === 3)
      this.regenerate(cell);
  }
  
  kill(cell: Cell) {
    cell.isAlive = false;
  }
  
  regenerate(cell: Cell) {
    cell.isAlive = true;
  }
}
