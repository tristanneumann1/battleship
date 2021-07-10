const { DIRECTIONS } = require('./constants')
const { Cell, EmptyCell, ShipCell, CellWithCoordinatesDTO } = require('./Cell')

describe('Cell', () => {
  it('creates a cell', () => {
    // GIVEN
    // WHEN
    const cell = new Cell()
    // THEN
    expect(cell[DIRECTIONS.RIGHT]).toBe(null)
    expect(cell[DIRECTIONS.LEFT]).toBe(null)
    expect(cell[DIRECTIONS.UP]).toBe(null)
    expect(cell[DIRECTIONS.DOWN]).toBe(null)
    expect(cell.wasTargetted).toBe(false)
  })

  it('can rotate cell', () => {
    // GIVEN
    const cell = new Cell()
    cell[DIRECTIONS.RIGHT] = 'initially RIGHT'
    cell[DIRECTIONS.LEFT] = 'initially LEFT'
    cell[DIRECTIONS.UP] = 'initially UP'
    cell[DIRECTIONS.DOWN] = 'initially DOWN'
    // WHEN
    cell.rotate()
    // THEN
    expect(cell[DIRECTIONS.RIGHT]).toBe('initially UP')
    expect(cell[DIRECTIONS.LEFT]).toBe('initially DOWN')
    expect(cell[DIRECTIONS.UP]).toBe('initially LEFT')
    expect(cell[DIRECTIONS.DOWN]).toBe('initially RIGHT')
  })

  it('can be targeted', () => {
    // GIVEN
    const cell = new Cell()
    // WHEN
    cell.target()
    // THEN
    expect(cell.wasTargetted).toBe(true)
  })

  describe('Empty cell', () => {
    it('get\'s marked as miissed', () => {
      // GIVEN
      const emptyCell = new EmptyCell()
      // WHEN
      emptyCell.target()
      // THEN
      expect(emptyCell.hasMissed()).toBe(true)
    })
  })

  describe('Ship cell', () => {
    it('get\'s marked as hit', () => {
      // GIVEN
      const shipCell = new ShipCell()
      // WHEN
      shipCell.target()
      // THEN
      expect(shipCell.isHit()).toBe(true)
    })
  })

  describe('Cell With Coordinates', () => {
    it('knows about it\'s coordinates', () => {
      // GIVEN
      const cell = new Cell()
      const i = 1
      const j = 2
      // WHEN
      const cellWithCoords = new CellWithCoordinatesDTO(cell, i, j)
      // THEN
      expect(cellWithCoords.i).toBe(i)
      expect(cellWithCoords.j).toBe(j)
    })
  })
})
