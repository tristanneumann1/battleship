const { ShipCell } = require('../cell/Cell')
const Grid = require('../grid/Grid')
const MissileAction = require('./MissileAction')
const {EmptyCell} = require('../cell/Cell')


describe('MissileAction', () => {
  let i, j
  let iEmpty, jEmpty
  let grid
  let shipCell
  let emptyCell

  beforeEach(() => {
    i = 5
    j = 5
    iEmpty = 6
    jEmpty = 6
    grid = new Grid(10)
    shipCell = new ShipCell()
    emptyCell = new EmptyCell()
    grid.putCell(i, j, shipCell)
    grid.putCell(iEmpty, jEmpty, emptyCell)
  })

  it('hit\'s a cell if it is a Ship Cell', () => {
    // GIVEN
    const missileAction = new MissileAction(grid, { i, j })
    // WHEN
    missileAction.execute()
    // THEN
    expect(shipCell.isHit()).toBe(true)
    expect(emptyCell.hasMissed()).toBe(false)
  })

  it('returns false when missing', () => {
    // GIVEN
    const missileAction = new MissileAction(grid, { i: iEmpty, j: jEmpty })
    // WHEN
    missileAction.execute()
    // THEN
    expect(shipCell.isHit()).toBe(false)
    expect(emptyCell.hasMissed()).toBe(true)
  })
})
