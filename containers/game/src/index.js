import http from "http"
import { Server } from "socket.io"
import * as code from "./codes.js"

const httpServer = http.createServer();
const port = process.env.PORT || 4000;
const io = new Server(httpServer, {
    path: '/socket'
});

import * as game from './room/index.js'

io.on("connection", (socket) => {
    // socket.on(code.GAME_STOPPED, (r) => game.remove(r));
    socket.on(code.JOIN_GAME, (r) => game.join(socket, r));
    socket.on(code.HOST_GAME, () => game.host(socket));
    socket.on(code.GET_USERS, (r) => game.getUsers(socket, r));
    
    socket.on('disconnect', () => {
        // check if user is host -> delete room
    });
});

httpServer.listen(port, () => {
    console.log(`[Socket] Listening on port ${port}`)
});
