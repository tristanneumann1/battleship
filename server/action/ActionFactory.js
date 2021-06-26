const MissileAction = require('./MissileAction')
const SearchAction = require('./SearchAction')
const Action = require('./Action')
const {ACTION_TYPES} = require('./constants')

class ActionFactory {
  grid
  actionType

  constructor(grid, actionType) {
    this.grid = grid
    this.actionType = actionType
  }

  build(actionOptions) {
    switch (this.actionType) {
      case (ACTION_TYPES.MISSILE):
        return new MissileAction(this.grid, actionOptions)
      case (ACTION_TYPES.SEARCH):
        return new SearchAction(this.grid, actionOptions)
      default:
        return new Action(this.grid)
    }
  }
}

module.exports = ActionFactory
