const { Server } = require("socket.io");

export default function setup(server) {
    // const ws = require("socket.io")(server);
    const ws = new Server(server, {
        cors: {
            origin: "http://localhost:80",
            path: '/socket'
        },
    });

    ws.on('connection', stream => {
        console.log('connected')

        // ws.emit();

        ws.on('disconnect', onDisconnected);
        ws.on('chat message', onJoin);
    });
}

function onDisconnected() {
    console.log("a user disconnected")
}

function onJoin(e) {
    console.log(e)
}