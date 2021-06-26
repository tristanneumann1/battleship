const express = require('express')
const app = express();
const path = require('path')
const server = require('http').createServer(app);
const { Server } = require('socket.io')

const Scenario = require('./scenario/Scenario')
const Game = require('./game/Game')
const ActionFactory = require('./action/ActionFactory')

const io = new Server(server);

app.use('/', express.static(path.join(__dirname, '../client')))

const liveScenarios = []
const liveGames = []
const liveActions = []
const liveSockets = []

io.on('connection', (socket) => {
  liveSockets.push(socket)

  socket.on('scenario/create', (options) => {
    const scenario = new Scenario(options)
    liveScenarios.push(scenario)
    socket.send('scenario/created', scenario.dto())
  })

  socket.on('scenario/register', ({ scenarioId, playerOptions }) => {
    const scenario = liveScenarios.find(scenario => scenario.id === scenarioId)
    scenario.register(playerOptions)
    socket.send('scenario/registered', scenario.dto())
  })

  socket.on('game/start', ({ scenarioId }) => {
    const scenario = liveScenarios.find(scenario => scenario.id === scenarioId)
    const game = new Game(scenario.players)
    liveGames.push(game)

    socket.send('game/started', game.dto())
  })

  socket.on('ship/position', (gameId, playerId, shipPlacementId, placementOptions) => {
    const game = liveGames.find(game => game.id === gameId)
    const player = game.players.find(player => player.id === playerId)
    const shipPlacement = player.shipPlacements.find(shipPlacement => shipPlacement.id === shipPlacementId)

    shipPlacement.position(placementOptions)
    socket.send('ship/positioned', shipPlacement.dto())
  })

  socket.on('ship/place', (gameId, playerId, shipPlacementId) => {
    const game = liveGames.find(game => game.id === gameId)
    const player = game.players.find(player => player.id === playerId)
    const shipPlacement = player.shipPlacements.find(shipPlacement => shipPlacement.id === shipPlacementId)

    shipPlacement.place()
    socket.send('ship/placed', shipPlacement.dto())
  })

  socket.on('action/select', (gameId, affectedPlayerId, { actionType, actionOptions }) => {
    const game = liveGames.find(game => game.id === gameId)
    const player = game.players.find(player => player.id === affectedPlayerId)
    const actionFactory = new ActionFactory(player.grid, actionType)
    const action = actionFactory.build(actionOptions)

    liveActions.push(action)
    socket.send('action/selected', action.dto())
  })

  socket.on('action/execute', (actionId) => {
    const action = liveActions.find(action => action.id === actionId)
    action.execute()

    socket.send('action/executed', action.dto())
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
