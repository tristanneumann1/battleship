const Grid = require('../grid/Grid')
const ShipPlacement = require('./ShipPlacement')
const {MOVE, ROTATE} = require('./constants')
const { InvalidShipPlacement, UnauthorizedShipManipulation } = require('../exception/exceptions')
const { ShipCell, EmptyCell } = require('../cell/Cell')
const { NCellShip } = require('../ship/Ship')

describe('Ship placement', () => {
  let ship
  let grid

  beforeEach(() => {
    ship = new NCellShip(3)
    grid = new Grid(5)
  })

  describe('ship manipulation', () => {
    it('can move a ship', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 0, 0)
      // WHEN
      shipPlacement.move(4, 4)
      // THEN
      expect(shipPlacement.rootI).toBe(4)
      expect(shipPlacement.rootJ).toBe(4)
    })
    it('can rotate a ship', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 0, 0)
      // WHEN
      shipPlacement.rotate()
      // THEN
      expect(ship.orientation).toBe(1)
    })
    it('can not manipulate a ship that has been placed', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 0, 0)
      shipPlacement.place()
      // WHEN
      // THEN
      expect(() => shipPlacement.move(3, 3)).toThrow(UnauthorizedShipManipulation)
      expect(() => shipPlacement.rotate()).toThrow(UnauthorizedShipManipulation)

    })
    it('can be manipulated through positioning options', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 0, 0)
      // WHEN
      shipPlacement.position({ type: MOVE, options: { i: 4, j: 4} })
      shipPlacement.position({ type: ROTATE })
      // THEN
      expect(shipPlacement.rootI).toBe(4)
      expect(shipPlacement.rootJ).toBe(4)
      expect(ship.orientation).toBe(1)
    })
  })
  describe('ship placing', () => {
    it('verifies ship can be placed', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship)
      // WHEN
      const canPlaceShip = shipPlacement.canPlace()
      // THEN
      expect(canPlaceShip).toBe(true)
    })

    it('can\'t place ship off edge of map', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 4, 4)
      // WHEN
      const canPlaceShip = shipPlacement.canPlace()
      // THEN
      expect(canPlaceShip).toBe(false)
    })

    it('can\'t place ship over another ship', () => {
      // GIVEN
      grid.putCell(3, 3, new ShipCell())
      const shipPlacement = new ShipPlacement(grid, ship, 2, 3)
      // WHEN
      const canPlaceShip = shipPlacement.canPlace()
      // THEN
      expect(canPlaceShip).toBe(false)
    })

    it('places ship', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 0, 0)
      // WHEN
      shipPlacement.place()
      // THEN
      expect(grid.getCell(0, 0)).toBeInstanceOf(ShipCell)
      expect(grid.getCell(0, 0)).toBe(ship.rootCell)
      expect(grid.getCell(1, 0)).toBe(ship.cells[1])
      expect(shipPlacement.isPlaced).toBe(true)
    })

    it('throws error placing incorrect ship', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 4, 4)
      // WHEN
      // THEN
      expect(() => shipPlacement.place(grid)).toThrow(InvalidShipPlacement)
    })

    it('unplaces ship', () => {
      // GIVEN
      const shipPlacement = new ShipPlacement(grid, ship, 0, 0)
      shipPlacement.place()
      // WHEN
      shipPlacement.unplace()
      // THEN
      expect(grid.getCell(0, 0)).toBeInstanceOf(EmptyCell)
      expect(grid.getCell(1, 0)).toBeInstanceOf(EmptyCell)
      expect(shipPlacement.isPlaced).toBe(false)
    })
  })
})
