const { EmptyCell } = require('../cell/Cell')
const Grid = require('./Grid')

describe('Grid', () => {
  it('creates a grid', () => {
    // GIVEN
    const size = 10
    // WHEN
    const grid = new Grid(size)
    // THEN
    for(let i = 0; i < size; i++) {
      for(let j = 0; j < size; j++) {
        expect(grid.getCell(i, j)).toEqual(new EmptyCell())
      }
    }
  })
  it('can place empty cells', () => {
    // GIVEN
    const i = 15
    const j = 15
    const grid = new Grid(10)
    // WHEN
    grid.putEmptyCell(i, j)
    // THEN
    expect(grid.getCell(i, j)).toEqual(new EmptyCell())
  })
})
