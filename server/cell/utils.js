const { RIGHT, LEFT, UP, DOWN } = require('./constants').DIRECTIONS

function vectorOperation (i, j, direction) {
  if (direction === RIGHT) {
    return [i + 1, j]
  }
  if (direction === LEFT) {
    return [i - 1, j]
  }
  if (direction === UP) {
    return [i, j + 1]
  }
  if (direction === DOWN) {
    return [i, j - 1]
  }
  return []
}

module.exports = { vectorOperation }
