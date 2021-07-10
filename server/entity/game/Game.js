const { v4 } = require('uuid')

class Game {
  id
  players = []
  turn = 0
  constructor(players = []) {
    this.id = v4()
    this.players = players
  }

  takeTurn(action) {
    action.execute()
    this.turn = (this.turn + 1) % this.players.length
  }

  hasWinner() {
    return !this.players.every(player => player.isAlive())
  }

  getWinner() {
    if (!this.hasWinner()) {
      return null
    }

    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].isAlive()) {
        return this.players[i]
      }
    }

    return null
  }

  dto() {
    return {
      id: this.id
    }
  }
}

module.exports = Game
