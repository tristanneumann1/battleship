const { InvalidShipPlacement, UnauthorizedShipManipulation } = require('../exception/exceptions')
const { CELL_TYPES } = require('../cell/constants')
const { v4 } = require('uuid')
const { ROTATE, MOVE } = require('./constants')

class ShipPlacement {
  id
  isPlaced = false

  constructor(grid, ship, rootI = 0, rootJ = 0) {
    this.id = v4()
    this.grid = grid
    this.ship = ship
    this.rootI = rootI
    this.rootJ = rootJ
  }

  position ({ type, options = {} }) {
    switch (type) {
      case(ROTATE):
        this.rotate(options.times)
        break
      case(MOVE):
        this.moveByOptions(options)
    }
  }

  moveByOptions(options) {
    this.move(options.i, options.j)
  }

  move(i, j) {
    if (this.isPlaced) {
      throw new UnauthorizedShipManipulation()
    }
    this.rootI = i
    this.rootJ = j
    return this
  }

  rotate(times = 1) {
    if (this.isPlaced) {
      throw new UnauthorizedShipManipulation()
    }
    for (let i = 0; i < times; i++) {
      this.ship.rotate()
    }
    return this
  }

  place() {
    if (!this.canPlace(this.grid)) {
      throw new InvalidShipPlacement()
    }
    const shipCells = this.getShipCells(this.grid)
    shipCells.forEach(cell => {
      this.grid.putCell(cell.i, cell.j, cell.cell)
    })
    this.isPlaced = true
  }

  canPlace() {
    const shipCells = this.getShipCells()
    const occupiedCells = shipCells.filter(cell => {
      const gridCell = this.grid.getCell(cell.i, cell.j)
      return gridCell.type !== CELL_TYPES.EMPTY
    })
    return occupiedCells.length === 0
  }

  unplace() {
    const shipCells = this.getShipCells(this.grid)
    shipCells.forEach(cell => {
      this.grid.putEmptyCell(cell.i, cell.j)
    })
    this.isPlaced = false
  }

  getShipCells() {
    const shipCells = []
    const shipIterable = this.ship.getCellIter(this.rootI, this.rootJ)
    let cell = shipIterable.next()
    while (!cell.done) {
      shipCells.push(cell.value)
      cell = shipIterable.next()
    }
    return shipCells
  }

  dto() {
    return {
      id: this.id,
      isPlaced: this.isPlaced,
      shipOrientation: this.ship.orientation,
      rootI: this.rootI,
      rootJ: this.rootJ
    }
  }
}

module.exports = ShipPlacement
