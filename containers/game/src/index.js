const httpServer = require("http").createServer();
const { Server } = require("socket.io");

const port = process.env.PORT || 4000;
const io = new Server(httpServer, {
    path: '/socket'
});

// const onJoin = require('./join');

io.on("connection", (socket) => {
    console.log("user connected")

    socket.on('join', onJoin);
    socket.on('chat message', onChat);
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

function onChat(msg) {
    console.log('chat: ' + msg);
}

function onHostGame(socket) {
    console.log('hosting game');
    socket.broadcast.emit("game created!");
}