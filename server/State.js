class State {
  liveScenarios = []
  liveGames = []
  liveActions = []
  liveSockets = []

  reset () {
    this.liveScenarios = []
    this.liveGames = []
    this.liveActions = []
    this.liveSockets = []
  }
}

class StateSingleton {
  constructor() {
    if(!StateSingleton.instance) {
      StateSingleton.instance = new State()
    }
  }

  get() {
    return StateSingleton.instance
  }
}

const state = new StateSingleton().get()

module.exports = { state, State }
