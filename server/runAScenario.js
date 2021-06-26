const { PlayerNCellShips } = require('./player/Player')
const Grid = require('./grid/Grid')
const Game = require('./game/Game')
const MissileAction = require('./action/MissileAction')
const prompt = require('prompt-promise')

async function scenario1 () {
  const gridP1 = new Grid(5)
  const gridP2 = new Grid(5)
  const player1 = new PlayerNCellShips(gridP1, [3, 1])
  const player2 = new PlayerNCellShips(gridP2, [2, 2])

  const game = new Game([player1, player2])

  player1.shipPlacements[0].move(2, 4).place()
  player1.shipPlacements[1].move(1, 1).place()
  // _______
  // |..XXX|
  // |.....|
  // |.....|
  // |.X...|
  // |.....|
  // _______


  player2.shipPlacements[0].move(0, 4).rotate().place()
  player2.shipPlacements[1].move(4, 0).rotate().rotate().place()
  // _______
  // |X....|
  // |X....|
  // |.....|
  // |.....|
  // |...XX|
  // _______

  while(player1.isAlive() && player2.isAlive()) {
    await takeTurn(game)
  }
  return game
}

async function takeTurn(game) {
  const target = await prompt(`player ${game.turn + 1}, choose your target "i,j"`)
  const [i, j] = target.split(',').map(Number)
  const opponentGrid = game.players[(game.turn + 1) % game.players.length].grid
  game.takeTurn(new MissileAction(opponentGrid, { i, j }))
}

scenario1().then((game) => {
  console.log('Winner is player: ' + game.getWinner().id)
  prompt.end()
}).catch(console.error)
