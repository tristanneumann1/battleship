const Game= require('./Game')
const { Player } = require('../player/Player')
const Action = require('../action/Action')
const ShipPlacement = require('../player/ShipPlacement')
const {Ship} = require('../ship/Ship')
const {isUuid} = require('../../test/utils')

function getPlayers() {
  const player1 = new Player()
  player1.shipPlacements.push(new ShipPlacement(null, new Ship()))
  const player2 = new Player()
  player2.shipPlacements.push(new ShipPlacement(null, new Ship()))
  return [player1, player2]
}

describe('Game', () => {
  it('initializes a game', () => {
    // GIVEN
    const players = getPlayers()
    // WHEN
    const game = new Game(players)
    // THEN
    expect(game.turn).toBe(0)
    expect(game.players).toBe(players)
    expect(isUuid(game.id)).toBe(true)
    expect(game.hasWinner()).toBe(false)
  })

  it('let\s players take turns', () => {
    // GIVEN
    const game = new Game(getPlayers())
    const action = new Action()
    // WHEN
    game.takeTurn(action)
    // THEN
    expect(game.turn).toBe(1)
  })

  it('let\'s a player win', () => {
    // GIVEN
    const players = getPlayers()
    const game = new Game(players)
    // WHEN
    players[0].shipPlacements[0].ship.sink()
    // THEN
    expect(game.hasWinner()).toBe(true)
    expect(game.getWinner()).toBe(players[1])
  })
})
