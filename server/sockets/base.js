module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('message', function(from, msg) {
      console.log('receive message from ',from,' message is ', msg)

      console.log('broadcast message')
      io.sockets.emit('broadcast', {
        payload: msg,
        source: from
      })
      console.log('broadcast complete')
    })
  })
}
