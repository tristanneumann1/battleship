const express = require('express')
const {State} = require('../State')
// const {RouteNotFound} = require('../exception/exceptions')

class Controller {
  DOMAIN = ''
  ROUTE_PREFIX = ''
  // listeners = []
  // routes = {}
  router = new express.Router()

  constructor(state = new State()) {
    this.state = state
  }

  addRoute(path, callback) {
    this.router.post(this.ROUTE_PREFIX + path, (req, res, next) => {
      callback.bind(this)(req, res)
      this.state.alertListeners(this.DOMAIN, req.params)
    })
  }

  // call(route, payload = {}) {
  //   if (!this.routes[route]) {
  //     throw new RouteNotFound(route)
  //   }
  //   const response = this.routes[route](payload)
  //   this.alertListeners(response)
  //   return response
  // }

  // register(listener) {
  //   this.listeners.push(listener)
  // }

  // alertListeners(payload) {
  //   this.listeners.forEach(listener => listener.notify(this.DOMAIN, payload))
  // }
}

module.exports = { Controller }
