const { EmptyCell, OutOfBoundsCell } = require('../cell/Cell')

class Grid {
  grid = {}
  constructor(size = 10) {
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        this.putCell(i, j, new EmptyCell())
      }
    }
  }

  getCell(i, j) {
    if (!this.grid[this.buildIndex(i, j)]) {
      return new OutOfBoundsCell()
    }
    return this.grid[this.buildIndex(i, j)]
  }

  putEmptyCell(i, j) {
    this.putCell(i, j, new EmptyCell())
  }

  putCell(i, j, cell) {
    this.grid[this.buildIndex(i, j)] = cell
  }

  buildIndex(i, j) {
    return `${i}__${j}`
  }
}

module.exports = Grid
