const Grid = require('../grid/Grid')
const {PlayerNCellShips} = require('../player/Player')
const { v4 } = require('uuid')

class Scenario {
  id
  gridOptions
  players = []

  constructor({ gridOptions } = {}) {
    this.gridOptions = gridOptions
    this.id = v4()
  }

  register({ shipSizes = [], player = null }) {
    if (!player) {
      player = new PlayerNCellShips(new Grid(this.gridOptions), shipSizes)
    }
    this.players.push(player)
  }
}

module.exports = Scenario
