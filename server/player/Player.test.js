const Grid = require('../grid/Grid')
const ShipPlacement = require('./ShipPlacement')
const {NCellShip, SingleCellShip} = require('../ship/Ship')
const {isUuid} = require('../../test/utils')
const {Player, PlayerNCellShips} = require('./Player')

describe('Player', () => {
  it('builds a player', () => {
    // GIVEN
    // WHEN
    const player = new Player()
    // THEN
    expect(player.markedReady).toBe(false)
    expect(isUuid(player.id)).toBe(true)
    expect(player.isReady()).toBe(false)
  })

  it('can place ships', () => {
    // GIVEN
    const ship = new SingleCellShip()
    const shipPlacement = new ShipPlacement(new Grid(), ship)
    const player = new Player()
    // WHEN
    player.shipPlacements.push(shipPlacement)
    // THEN
    expect(player.ships()).toEqual([ship])
    expect(player.isAlive()).toBe(true)
    expect(player.shipsAreReady()).toBe(false)
  })

  it('can mark as ready', () => {
    // GIVEN
    const player = new Player()
    // WHEN
    player.toggleReady()
    // THEN
    expect(player.markedReady).toBe(true)
    expect(player.isReady()).toBe(true)
  })

  it('can make ready', () => {
    // GIVEN
    const shipPlacement = new ShipPlacement(new Grid(), new SingleCellShip())
    const player = new Player()
    player.shipPlacements.push(shipPlacement)
    // WHEN
    shipPlacement.place()
    player.toggleReady()
    // THEN
    expect(player.shipsAreReady()).toBe(true)
    expect(player.isReady()).toBe(true)
  })

  it('monitors player life', () => {
    // GIVEN
    const ship = new SingleCellShip()
    const shipPlacement = new ShipPlacement(new Grid(), ship)
    const player = new Player()
    player.shipPlacements.push(shipPlacement)
    // WHEN
    ship.sink()
    // THEN
    expect(ship.isAlive()).toBe(false)
  })
})

describe('PlayerNCellShips', () => {
  it('creates player N-sized straight ships', () => {
    // GIVEN
    const shipSizes = [1, 2, 3]
    const grid = new Grid()
    // WHEN
    const player = new PlayerNCellShips(grid, shipSizes)
    // THEN
    expect(player.shipPlacements.length).toBe(shipSizes.length)
    for (let i = 0; i < shipSizes.length; i++) {
      expect(player.shipPlacements[i].ship).toEqual(new NCellShip(shipSizes[i]))
    }
  })
})
