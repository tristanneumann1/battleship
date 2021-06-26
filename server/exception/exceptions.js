class CellNotFound extends Error {
  constructor() {
    super('Cell could not be found')
    this.name = "CellNotFound"
  }
}

class DirectionNotFound extends Error {
  constructor() {
    super('Direction could not be found')
    this.name = "DirectionNotFound"
  }
}

class InvalidShipPlacement extends Error {
  constructor() {
    super('Can not place ship here')
    this.name = "InvalidShipPlacement"
  }
}

class UnauthorizedShipManipulation extends Error {
  constructor() {
    super('Can not manipulate a ship that has been placed')
    this.name = "UnauthorizedShipManipulation"
  }
}

module.exports = { DirectionNotFound, CellNotFound, InvalidShipPlacement, UnauthorizedShipManipulation }
