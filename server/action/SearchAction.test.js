const Grid = require('../grid/Grid')
const SearchAction = require('./SearchAction')
const { ShipCell } = require('../cell/Cell')

describe('Search Action', () => {
  it('returns the cell at a given location', () => {
    // GIVEN
    const i = 5, j = 5
    const grid = new Grid(10)
    const shipCell = new ShipCell()
    grid.putCell(i, j, shipCell)
    const search = new SearchAction(grid, { i, j })
    // WHEN
    const actual = search.execute()
    // THEN
    expect(actual).toBe(shipCell)
  })
})
