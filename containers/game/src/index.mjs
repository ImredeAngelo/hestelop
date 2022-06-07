import http from "http"
import { Server } from "socket.io"

const httpServer = http.createServer();
const port = process.env.PORT || 4000;
const io = new Server(httpServer, {
    path: '/socket'
});

// const onJoin = require('./join');
import * as game from './game/index.mjs'

io.on("connection", (socket) => {
    console.log("user connected")

    socket.on('join', onJoin);
    socket.on('chat message', (msg) => onChat(socket, msg));
    socket.on('host', () => onHostGame(socket));
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(port, () => {
    console.log(`[Socket] Listening on port ${port}`)
});


// =====

function onJoin(user) {
    console.log(user);
}

function onChat(socket, msg) {
    console.log('chat: ' + msg);
    socket.emit('chat message', 'hello');
}

function onHostGame(socket) {
    console.log('hosting game');
    socket.emit('created', { msg:"hello world" });
    game.startNewGame();
}