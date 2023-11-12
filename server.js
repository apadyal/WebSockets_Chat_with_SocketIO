const express = require('express');
const app = express();
const http = require('http');
const port = 3000;

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

  io.on('connection', (socket) => {

    console.log('User connected');
    socket.broadcast.emit('chat message', 'User connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.broadcast.emit('chat message', 'User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('broadcasting message: ' + msg);
        socket.broadcast.emit('chat message', msg);
      });
  });


server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});