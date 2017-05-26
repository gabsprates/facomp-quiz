const debug = require('debug')('facomp-quiz:socket.io');

/*
 * Socket.io
 *
 * Este é o arquivo onde são configurados os eventos em tempo real
 * através do Socket.io.
 */

module.exports = (server) => {

  const io = require('socket.io')(server);

  io.on('connection', (client) => {
    debug('[%s] Connected...', client.id);

    // client.on('event name', handler);
    // client.emit('event name');

    client.on('disconnect', (reason) => {
      debug('[%s] Disconnected (%s)!', client.id, reason);
    });
  });


  return io;
};
