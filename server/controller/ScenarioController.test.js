const ScenarioController = require('./ScenarioController')
const Scenario = require('../entity/scenario/Scenario')
const {isUuid} = require('../../test/utils')
const { State } = require('../State')


describe('Scenario Controller', () => {
  let state, mockScenario, mockScenarioId
  beforeEach(() => {
    state = new State()
    mockScenario = new Scenario({
      gridOptions: {}
    })
    state.liveScenarios.push(mockScenario)
    mockScenarioId = mockScenario.id
  })

  it('creates a scenario', () => {
    // GIVEN
    const gridOptions = {}
    const controller = new ScenarioController()
    // WHEN
    const scenario = controller.call('scenario/create', { gridOptions })
    // const scenario = controller.createScenario({ gridOptions })
    // THEN
    const dto = controller.getDTO(scenario)
    expect(isUuid(dto.id)).toBe(true)
    expect(dto.options).toBe(gridOptions)
  })

  it('registers a new player', () => {
    // GIVEN
    const playerOptions = {}
    const controller = new ScenarioController(state)
    // WHEN
    const scenario = controller.registerPlayer({ scenarioId: mockScenarioId, playerOptions })
    // THEN
    const dto = controller.getDTO(scenario)
    expect(dto.players.length).toBe(1)
    expect(isUuid(dto.players[0].id)).toBe(true)
  })
})
