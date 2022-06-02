const { Server } = require("socket.io");

const io = new Server(process.env.PORT, { /* options */ });

io.on("connection", (socket) => {
    
});