const {isUuid} = require('../../test/utils')
const Action = require('./Action')

describe('Action', () => {
  it('initialises as a NO_ACTION action', () => {
    // GIVEN
    const grid = {}
    // WHEN
    const action = new Action(grid)
    // THEN
    expect(action.grid).toBe(grid)
    expect(action.id).toBeUuid
    expect(isUuid(action.id))
  })
})
