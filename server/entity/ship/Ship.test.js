const { RIGHT, UP, LEFT, DOWN } = require('../cell/constants').DIRECTIONS
const { ShipCell } = require('../cell/Cell')
const { Ship, SingleCellShip, NCellShip } = require('./Ship')
const { CellNotFound, DirectionNotFound } = require('../../exception/exceptions')


describe('Ships', () => {
  it('catches errors when building ships', () => {
    // GIVEN
    const ship = new Ship()
    // WHEN
    const invalidCell = new ShipCell()
    // THEN
    expect(() => ship.addCell(invalidCell, RIGHT)).toThrow(CellNotFound)
    expect(() => ship.addCell(ship.rootCell, 'INCORRECT DIRECTION')).toThrow(DirectionNotFound)
  })

  it('builds a ship with a single cell', () => {
    // GIVEN
    // WHEN
    const ship = new SingleCellShip()
    // THEN
    expect(ship.rootCell).toEqual(new ShipCell())
    expect(ship.rootCell).toBe(ship.cells[0])
    expect(ship.cells.length).toEqual(1)
    expect(ship.isAlive()).toBe(true)
  })

  it('builds a ship with n cells', () => {
    // GIVEN
    let n = 5
    // WHEN
    const ship = new NCellShip(n)
    // THEN
    expect(ship.rootCell).toBeInstanceOf(ShipCell)
    expect(ship.rootCell).toBe(ship.cells[0])
    expect(ship.rootCell[RIGHT]).toBeInstanceOf(ShipCell)
    expect(ship.rootCell[RIGHT]).toBe(ship.cells[1])
    expect(ship.cells.length).toEqual(n)
    expect(ship.isAlive()).toBe(true)
  })

  it('provides a cell iterable', () => {
    // GIVEN
    const ship = new Ship()
    const rightCell = ship.addCell(ship.rootCell, RIGHT)
    const upCell = ship.addCell(ship.rootCell, UP)
    const leftCell = ship.addCell(upCell, LEFT)
    // WHEN
    const iter = ship.getCellIter(5, 5)

    // THEN
    expect(iter.next().value.cell).toBe(ship.rootCell)
    expect(iter.next().value.cell).toBe(rightCell)
    expect(iter.next().value.cell).toBe(upCell)
    const leftCellWithCoords = iter.next().value
    expect(leftCellWithCoords.cell).toBe(leftCell)
    expect(leftCellWithCoords.i).toBe(4)
    expect(leftCellWithCoords.j).toBe(6)
    expect(iter.next().done).toBe(true)
  })

  it('rotates a ship', () => {
    // GIVEN
    const ship = new NCellShip(3)
    // WHEN
    ship.rotate()
    // THEN
    expect(ship.orientation).toBe(1)
    expect(ship.rootCell[RIGHT]).toBe(null)
    expect(ship.rootCell[DOWN]).toBe(ship.cells[1])
    expect(ship.rootCell[DOWN][DOWN]).toBe(ship.cells[2])
  })

  it('rotates a ship multiple times', () => {
    // GIVEN
    const ship = new NCellShip(3)
    // WHEN
    ship.rotate()
    ship.rotate()
    // THEN
    expect(ship.orientation).toBe(2)
    expect(ship.rootCell[RIGHT]).toBe(null)
    expect(ship.rootCell[DOWN]).toBe(null)
    expect(ship.rootCell[LEFT]).toBe(ship.cells[1])
    expect(ship.rootCell[LEFT][LEFT]).toBe(ship.cells[2])
  })

  it('rotates a ship 360', () => {
    // GIVEN
    const ship = new NCellShip(3)
    // WHEN
    ship.rotate()
    ship.rotate()
    ship.rotate()
    ship.rotate()
    // THEN
    expect(ship.orientation).toBe(0)
  })

  it('checks ship life', () => {
    // GIVEN
    const ship = new NCellShip(3)
    // WHEN
    ship.sink()
    // THEN
    expect(ship.cells.every(cell => cell.wasTargetted)).toBe(true)
    expect(ship.isAlive()).toBe(false)
  })
})
