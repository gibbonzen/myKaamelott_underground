const io = require('socket.io-client')

var socket = io('http://localhost:8081')
socket.on('message', function(data) {
	console.log(data)
})