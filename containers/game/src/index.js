import http from "http"
import { Server } from "socket.io"
import * as code from "./codes.js"

const httpServer = http.createServer();
const port = process.env.PORT || 4000;
const io = new Server(httpServer, {
    path: '/socket'
});

// const onJoin = require('./join');
import * as game from './game/index.js'

io.on("connection", (socket) => {
    socket.on(code.GAME_STOPPED, (room) => game.remove(room));
    socket.on(code.JOIN_GAME, (room) => game.join(socket, room));
    socket.on(code.HOST_GAME, () => game.make(socket));
    
    socket.on('disconnect', () => {
        // check if user is host -> delete room
    });
});

httpServer.listen(port, () => {
    console.log(`[Socket] Listening on port ${port}`)
});


// =====

// function onJoin(user) {
//     console.log(user);
// }

// function onChat(socket, msg) {
//     console.log('chat: ' + msg);
//     socket.emit('chat message', 'hello');
// }

// function onHostGame(socket) {
//     console.log('hosting game');
//     socket.emit('created', { msg:"hello world" });
//     game.startNewGame();
// }