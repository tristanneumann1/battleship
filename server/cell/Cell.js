const { DIRECTIONS, CELL_TYPES } = require('./constants')

class Cell {
  type = CELL_TYPES.CELL
  wasTargetted = false
  constructor() {
    for (let direction of Object.values(DIRECTIONS)) {
      this[direction] = null
    }
  }
  rotate () {
    [
      this[DIRECTIONS.RIGHT],
      this[DIRECTIONS.DOWN],
      this[DIRECTIONS.LEFT],
      this[DIRECTIONS.UP]
    ] = [
      this[DIRECTIONS.UP],
      this[DIRECTIONS.RIGHT],
      this[DIRECTIONS.DOWN],
      this[DIRECTIONS.LEFT]
    ]
  }
  target () {
    this.wasTargetted = true
  }
}
class OutOfBoundsCell extends Cell {
  type = CELL_TYPES.OUT_OF_BOUNDS
}

class EmptyCell extends Cell {
  type = CELL_TYPES.EMPTY
  hasMissed () {
    return this.wasTargetted
  }
}

class ShipCell extends Cell {
  type = CELL_TYPES.SHIP
  isHit () {
    return this.wasTargetted
  }
}

class CellWithCoordinatesDTO {
  constructor(cell, i, j) {
    this.cell = cell
    this.i = i
    this.j = j
  }
}

module.exports = { Cell, EmptyCell, ShipCell, OutOfBoundsCell, CellWithCoordinatesDTO }
