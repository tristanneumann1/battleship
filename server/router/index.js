// function route(socket, controllers) {
//   // socket.on('scenario/create', (options) => {
//   //   controllers.scenarioController.create(options)
//   // })
//   //
//   // socket.on('scenario/register', ({ scenarioId, playerOptions }) => {
//   //   const scenario = controllers.scenarioController.get(scenarioId)
//   //   scenario.register(playerOptions)
//   // })
//
//   socket.on('game/start', ({ scenarioId }) => {
//   //   const scenario = liveScenarios.find(scenario => scenario.id === scenarioId)
//   //   const game = new Game(scenario.players)
//   //   liveGames.push(game)
//   //
//   //   socket.send('game/started', game.dto())
//   })
//
//   socket.on('ship/position', (gameId, playerId, shipPlacementId, placementOptions) => {
//   //   const game = liveGames.find(game => game.id === gameId)
//   //   const player = game.players.find(player => player.id === playerId)
//   //   const shipPlacement = player.shipPlacements.find(shipPlacement => shipPlacement.id === shipPlacementId)
//   //
//   //   shipPlacement.position(placementOptions)
//   //   socket.send('ship/positioned', shipPlacement.dto())
//   })
//
//   socket.on('ship/place', (gameId, playerId, shipPlacementId) => {
//   //   const game = liveGames.find(game => game.id === gameId)
//   //   const player = game.players.find(player => player.id === playerId)
//   //   const shipPlacement = player.shipPlacements.find(shipPlacement => shipPlacement.id === shipPlacementId)
//   //
//   //   shipPlacement.place()
//   //   socket.send('ship/placed', shipPlacement.dto())
//   })
//
//   socket.on('action/select', (gameId, affectedPlayerId, { actionType, actionOptions }) => {
//   //   const game = liveGames.find(game => game.id === gameId)
//   //   const player = game.players.find(player => player.id === affectedPlayerId)
//   //   const actionFactory = new ActionFactory(player.grid, actionType)
//   //   const action = actionFactory.build(actionOptions)
//   //
//   //   liveActions.push(action)
//   //   socket.send('action/selected', action.dto())
//   })
//
//   socket.on('action/execute', (actionId) => {
//   //   const action = liveActions.find(action => action.id === actionId)
//   //   action.execute()
//   //
//   //   socket.send('action/executed', action.dto())
//   })
// }
//
// function addRoutes(socket, controllers) {
//   // if(!contollers) {
//   //   contollers =
//   // }
//
//   route(socket, controllers)
// }
//
// module.exports = addRoutes
