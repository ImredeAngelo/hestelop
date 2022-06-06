const httpServer = require("http").createServer();
const { Server } = require("socket.io");

const port = process.env.PORT || 4000;
const io = new Server(httpServer, {
    path: '/socket'
});

io.on("connection", (socket) => {
    console.log("user connected")
});

httpServer.listen(port, () => {
    console.log(`[Socket] Listening on port ${port}`)
});
