const Action = require('./Action')
const { MISSILE } = require('./constants').ACTION_TYPES

class MissileAction extends Action {
  type = MISSILE
  i
  j
  constructor(grid, { i, j }) {
    super(grid);
    this.i  = i
    this.j = j
  }
  execute() {
    const cell = this.grid.getCell(this.i, this.j)
    cell.target()
  }
}

module.exports = MissileAction
