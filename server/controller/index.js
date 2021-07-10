const {State} = require('../State')
const {RouteNotFound} = require('../exception/exceptions')

class Controller {
  DOMAIN = ''
  ROUTE_PREFIX = ''
  listeners = []
  routes = {}

  constructor(state = new State()) {
    this.state = state
  }

  addRoute(path, callback) {
    this.routes[this.ROUTE_PREFIX + path] = callback.bind(this)
  }

  call(route, payload = {}) {
    if (!this.routes[route]) {
      throw new RouteNotFound(route)
    }
    const response = this.routes[route](payload)
    this.alertListeners(response)
    return response
  }

  register(listener) {
    this.listeners.push(listener)
  }

  alertListeners(payload) {
    this.listeners.forEach(listener => listener.notify(this.DOMAIN, payload))
  }
}

module.exports = { Controller }
