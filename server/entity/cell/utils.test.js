const {vectorOperation} = require('./utils')
const {RIGHT, LEFT, UP, DOWN} = require('./constants').DIRECTIONS

describe('vector operation', () => {
  it ('finds the coordinates of the cell to the RIGHT', () => {
    // GIVEN
    const i = 5
    const j = 5
    // WHEN
    const actual = vectorOperation(i, j, RIGHT)
    // THEN
    expect(actual[0]).toBe(6)
    expect(actual[1]).toBe(5)
  })
  it ('finds the coordinates of the cell to the LEFT', () => {
    // GIVEN
    const i = 5
    const j = 5
    // WHEN
    const actual = vectorOperation(i, j, LEFT)
    // THEN
    expect(actual[0]).toBe(4)
    expect(actual[1]).toBe(5)
  })
  it ('finds the coordinates of the cell to the UP', () => {
    // GIVEN
    const i = 5
    const j = 5
    // WHEN
    const actual = vectorOperation(i, j, UP)
    // THEN
    expect(actual[0]).toBe(5)
    expect(actual[1]).toBe(6)
  })
  it ('finds the coordinates of the cell to the DOWN', () => {
    // GIVEN
    const i = 5
    const j = 5
    // WHEN
    const actual = vectorOperation(i, j, DOWN)
    // THEN
    expect(actual[0]).toBe(5)
    expect(actual[1]).toBe(4)
  })
})
