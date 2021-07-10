const { Action, ActionFactory, MissileAction, SearchAction }= require('./index')
const { ACTION_TYPES } = require('./constants')

describe('ActionFactory', () => {
  it('builds a no action by default', () => {
    // GIVEN
    const grid = {}
    // WHEN
    const action = new ActionFactory(grid).build()
    // THEN
    expect(action).toBeInstanceOf(Action)
    expect(action.grid).toBe(grid)
  })

  it('builds a missile action', () => {
    // GIVEN
    const actionOptions = { i: 1, j: 2 }
    const grid = {}
    // WHEN
    const action = new ActionFactory(grid, ACTION_TYPES.MISSILE).build(actionOptions)
    // THEN
    expect(action).toBeInstanceOf(MissileAction)
    expect(action.grid).toBe(grid)
    expect(action.i).toBe(actionOptions.i)
    expect(action.j).toBe(actionOptions.j)
  })

  it('builds a search action', () => {
    // GIVEN
    const actionOptions = { i: 1, j: 2 }
    const grid = {}
    // WHEN
    const action = new ActionFactory(grid, ACTION_TYPES.SEARCH).build(actionOptions)
    // THEN
    expect(action).toBeInstanceOf(SearchAction)
    expect(action.grid).toBe(grid)
    expect(action.i).toBe(actionOptions.i)
    expect(action.j).toBe(actionOptions.j)
  })
})
