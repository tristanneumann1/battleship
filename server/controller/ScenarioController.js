const Scenario = require('../entity/scenario/Scenario')
const {Controller} = require('./index')

class ScenarioController extends Controller {
  ROUTE_PREFIX = 'scenario'

  constructor(state) {
    super(state);
    this.addRoute('/create', this.createScenario)
    this.addRoute('/:id/register', this.registerPlayer())
  }

  createScenario(options) {
    return new Scenario(options)
  }

  registerPlayer(scenarioId, { playerOptions }) {
    const scenario = this.state.liveScenarios.find(scenario => scenario.id === scenarioId)
    scenario.register(playerOptions)
    return scenario
  }

  getDTO(scenario) {
    return {
      id: scenario.id,
      options: scenario.gridOptions,
      players: scenario.players
    }
  }
}

module.exports = ScenarioController
