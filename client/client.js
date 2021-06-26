const io = require('socket.io-client')

const socket = io()

socket.connect()

socket.send('hello')
