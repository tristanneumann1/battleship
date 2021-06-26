const Scenario = require('./Scenario')
const Grid = require('../grid/Grid')
const {Player, PlayerNCellShips} = require('../player/Player')
const {isUuid} = require('../../test/utils')

describe('Scenario', () => {
  it('builds a scenario', () => {
    // GIVEN
    const gridOptions = 5
    // WHEN
    const scenario = new Scenario({ gridOptions })
    // THEN
    expect(scenario.gridOptions).toBe(5)
    expect(isUuid(scenario.id)).toBe(true)
  })

  it('registers players', () => {
    // GIVEN
    const scenario = new Scenario()
    const player = new Player()
    const shipSizes = [1, 2, 3]
    // WHEN
    scenario.register({ player })
    scenario.register({ shipSizes })
    // THEN
    expect(scenario.players[0]).toBe(player)
    expect(scenario.players[1]).toBeInstanceOf(PlayerNCellShips)
    expect(scenario.players[1].shipSizes).toBe(shipSizes)
    expect(scenario.players[1].grid).toEqual(new Grid())
  })
})
