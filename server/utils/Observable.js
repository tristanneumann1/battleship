class Observable {
  listeners = []

  register(listener) {
    this.listeners.push(listener)
  }

  notify(event) {
    this.listeners.forEach(listener => listener.update(event))
  }
}

module.exports = Observable
