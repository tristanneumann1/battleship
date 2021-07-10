const Observable = require('./Observable')

describe('Observable', () => {
  let mockObserver
  beforeEach(() => {
    mockObserver = {
      update: jest.fn()
    }
  })
  it('registers listeners', () => {
    // GIVEN
    const observable = new Observable()
    const event = 'event'
    // WHEN
    observable.register(mockObserver)
    observable.notify(event)
    // THEN
    expect(observable.listeners[0]).toBe(mockObserver)
    expect(mockObserver.update).toHaveBeenCalledWith(event)
  })
})
