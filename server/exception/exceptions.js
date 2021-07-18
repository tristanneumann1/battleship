module.exports.CellNotFound = class extends Error {
  constructor() {
    super('Cell could not be found')
    this.name = "CellNotFound"
  }
}

module.exports.DirectionNotFound = class extends Error {
  constructor() {
    super('Direction could not be found')
    this.name = "DirectionNotFound"
  }
}

module.exports.InvalidShipPlacement = class extends Error {
  constructor() {
    super('Can not place ship here')
    this.name = "InvalidShipPlacement"
  }
}

module.exports.UnauthorizedShipManipulation = class extends Error {
  constructor() {
    super('Can not manipulate a ship that has been placed')
    this.name = "UnauthorizedShipManipulation"
  }
}
