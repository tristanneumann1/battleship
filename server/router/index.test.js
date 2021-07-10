const addRoutes = require('./index')

describe('routing', () => {
  let socketMock, socketListenerMock
  let listeners
  beforeEach(() => {
    listeners = {}
    socketListenerMock = jest.fn().mockImplementation((route, implementation) => {
      listeners[route] = implementation
    })
    socketMock = {
      on: socketListenerMock
    }
  })

  it('populates socket with all routes', () => {
    // GIVEN
    // WHEN
    addRoutes(socketMock)
    // THEN
    expect(socketListenerMock).toHaveBeenCalledWith('scenario/create', expect.anything())
    expect(socketListenerMock).toHaveBeenCalledWith('scenario/register', expect.anything())
    expect(socketListenerMock).toHaveBeenCalledWith('game/start', expect.anything())
    expect(socketListenerMock).toHaveBeenCalledWith('ship/position', expect.anything())
    expect(socketListenerMock).toHaveBeenCalledWith('ship/place', expect.anything())
    expect(socketListenerMock).toHaveBeenCalledWith('action/select', expect.anything())
    expect(socketListenerMock).toHaveBeenCalledWith('action/execute', expect.anything())
  })

  describe('Scenario Routes', () => {
    let scenarioController
    let mockScenario

    beforeEach(() => {
      mockScenario = {
        register: jest.fn()
      }
      scenarioController = {
        create: jest.fn(),
        get: jest.fn().mockReturnValue(mockScenario)
      }
      addRoutes(socketMock, { scenarioController })
    })

    it('creates scenarios', () => {
      // GIVEN
      const options = {}
      // WHEN
      listeners['scenario/create'](options)
      // THEN
      expect(scenarioController.create).toHaveBeenCalledWith(options)
    })

    it('registers players', () => {
      // GIVEN
      const scenarioId = 'scenarioId'
      const playerOptions = {}
      // WHEN
      listeners['scenario/register']({ scenarioId, playerOptions })
      // THEN
      expect(scenarioController.get).toHaveBeenCalledWith(scenarioId)
      expect(mockScenario.register).toHaveBeenCalledWith(playerOptions)
    })
  })

  describe('Game Routes', () => {
    let gameController

    beforeEach(() => {
      gameController = {
        start: jest.fn()
      }
      addRoutes(socketMock, { gameController })
    })

    it('Starts Games', () => {
      // GIVEN
      const scenarioId = 'scenarioId'
      // WHEN
      listeners['game/start']({ scenarioId })
      // THEN
      expect(gameController.start).toHaveBeenCalledWith(scenarioId)
    })
  })
})
