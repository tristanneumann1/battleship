const Action = require('./Action')
const { SEARCH } = require('./constants').ACTION_TYPES

class SearchAction extends Action {
  type = SEARCH
  constructor(grid, { i, j }) {
    super(grid)
    this.i  = i
    this.j = j
  }

  execute() {
    return this.grid.getCell(this.i, this.j)
  }
}

module.exports = SearchAction
