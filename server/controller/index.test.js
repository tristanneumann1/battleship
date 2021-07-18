const {RouteNotFound} = require('../exception/exceptions')
const {Controller} = require('./index')

describe('Controller', () => {
  let path, method, controller

  beforeEach(() => {
    path = 'path-name'
    method = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  function createController (response = {}) {
    method.mockReturnValue(response)
    controller = new Controller()
  }

  it('can register a route', () => {
    // GIVEN
    createController()
    const payload = {}
    // WHEN
    controller.addRoute(path, method)
    controller.call(path, payload)
    // THEN
    expect(method.mock.instances[0]).toBe(controller)
    expect(method.mock.calls[0][0]).toBe(payload)
  })

  it('errors when route not found', () => {
    // GIVEN
    createController()
    const invalid_path = 'invalid-path-name'
    // WHEN
    expect(() => controller.call(invalid_path)).toThrow(RouteNotFound)
    // THEN
  })

  it('raises an event every time that a call is completed', () => {
    // GIVEN
    const response = {}
    createController(response)
    const payload = {}
    const domain = 'domain'
    const listener = {
      notify: jest.fn()
    }
    controller.DOMAIN = domain
    controller.register(listener)
    // WHEN
    controller.call(path, payload)
    // THEN
    expect(listener.notify).toHaveBeenCalledWith(domain, response)
  })
})
