const { v4 } = require('uuid')
const { NO_ACTION } = require('./constants').ACTION_TYPES

class Action {
  id
  grid
  type = NO_ACTION

  constructor(grid) {
    this.id = v4()
    this.grid = grid
  }

  execute () {}

  dto() {
    return {
      type: this.type,
      id: this.id
    }
  }
}

module.exports = Action
