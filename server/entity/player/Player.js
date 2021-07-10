const ShipPlacement = require('./ShipPlacement')
const { NCellShip } = require('../ship/Ship')
const { v4 } = require('uuid')

class Player {
  shipPlacements = []
  markedReady = false
  constructor(id = v4()) {
    this.id = id
  }

  buildShips() {}

  isReady () {
    return this.markedReady && this.shipsAreReady()
  }

  shipsAreReady() {
    return this.shipPlacements.filter(shipPlacement => !shipPlacement.isPlaced).length === 0
  }

  toggleReady() {
    this.markedReady = ! this.markedReady
  }

  isAlive() {
    return this.ships().filter(ship => ship.isAlive()).length !== 0
  }

  ships () {
    return this.shipPlacements.map(shipPlacement => shipPlacement.ship)
  }
}

class PlayerNCellShips extends Player {
  constructor(grid, shipSizes) {
    super();
    this.grid = grid
    this.shipSizes = shipSizes
    this.buildShips()
  }
  buildShips() {
    for (let size of this.shipSizes) {
      this.shipPlacements.push(new ShipPlacement(this.grid, new NCellShip(size)))
    }
  }
}

class Player2223345 extends Player {
  constructor(grid) {
    super(grid);
    this.buildShips()
  }
  buildShips() {
    this.shipPlacements.push(...[
      new ShipPlacement(this.grid, new NCellShip(2)),
      new ShipPlacement(this.grid, new NCellShip(2)),
      new ShipPlacement(this.grid, new NCellShip(2)),
      new ShipPlacement(this.grid, new NCellShip(3)),
      new ShipPlacement(this.grid, new NCellShip(3)),
      new ShipPlacement(this.grid, new NCellShip(4)),
      new ShipPlacement(this.grid, new NCellShip(5))
    ])
  }
}

module.exports = { Player, Player2223345, PlayerNCellShips }
