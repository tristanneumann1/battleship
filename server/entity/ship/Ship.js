const { ShipCell, CellWithCoordinatesDTO } = require('../cell/Cell')
const { DIRECTIONS } = require('../cell/constants')
const {vectorOperation} = require('../cell/utils')
const { CellNotFound, DirectionNotFound } = require('../../exception/exceptions')

class Ship {
  orientation = 0
  rootCell
  cells = []

  constructor() {
    this.rootCell = new ShipCell()
    this.cells.push(this.rootCell)
  }

  addCell(attachCell, direction) {
    if (!this.cells.includes(attachCell)) {
      throw new CellNotFound()
    }
    if (!Object.values(DIRECTIONS).includes(direction)) {
      throw new DirectionNotFound()
    }
    const newCell = new ShipCell()
    attachCell[direction] = newCell
    this.cells.push(newCell)
    return newCell
  }

  rotate () {
    const shipCellIter = this.getCellIter()
    let cellWithCoords = shipCellIter.next()
    while(!cellWithCoords.done) {
      cellWithCoords.value.cell.rotate()
      cellWithCoords = shipCellIter.next()
    }
    this.orientation = (this.orientation + 1) % 4
  }

  * getCellIter (startI = 0, startJ = 0) {
    const cellQueue = [new CellWithCoordinatesDTO(this.rootCell, startI, startJ)]

    while(cellQueue.length) {
      const cell = cellQueue.shift()
      cellQueue.push(...this.getNeighbouringCells(cell))
      yield cell
    }
  }

  getNeighbouringCells({ cell, i, j }) {
    const newCells = []
    for (let direction of [ DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT, DIRECTIONS.UP ]) {
      if (!cell[direction]) {
        continue
      }
      newCells.push(new CellWithCoordinatesDTO(cell[direction], ...vectorOperation(i, j, direction)))
    }
    return newCells
  }

  isAlive() {
    return this.cells.filter(cell => !cell.isHit()).length !== 0
  }

  sink() {
    this.cells.forEach(cell => cell.target())
  }
}


class SingleCellShip extends Ship {
  constructor() {
    super()
  }
}

class NCellShip extends Ship {
  constructor(n) {
    super();
    let currentCell = this.rootCell
    for (let i = 1; i < n; i++) {
      this.addCell(currentCell, DIRECTIONS.RIGHT)
      currentCell = currentCell[DIRECTIONS.RIGHT]
    }
  }
}

module.exports = { Ship, SingleCellShip, NCellShip }
