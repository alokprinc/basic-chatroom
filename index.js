const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const socket_io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
// socket
socket_io.on('connection', (socket) => {
  const user = Math.floor(Math.random() * 10000);
  socket.on('chat message', (msg) => {
    // console.log(`user ${user} : message => ` + msg);
    const payload = {
      user,
      msg,
    };
    socket_io.emit('chat message', payload);
  });
  // console.log(`user ${user} conneced`);
  // socket.on('disconnect', () => {
  //   console.log(`user ${user} disconnected`);
  // });
});
// express
server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
