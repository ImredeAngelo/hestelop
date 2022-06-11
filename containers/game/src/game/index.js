import generateID from "../base64/index.js";
import * as status from "../codes.js";

var rooms = []

export function make(socket) {
    const code = generateID(5);

    if(exists(code))
        return make(socket);

    rooms.push({
        id:code, 
        state:status.GAME_JOINED, 
        players:0
    });
    
    // socket.leaveAll
    socket.join(code);
    socket.emit(status.GAME_CREATED, { code:code });
    return code;
}

export function remove(room) {
    const r = getRoom(room.toUpperCase());
    if(r != undefined) {
        rooms.splice(rooms.indexOf(r), 1);
        console.log('removed room')
    }

    console.log(rooms)
}

function getRoom(room) {
    for(let i = 0; i < rooms.length; i++) {
        let r = rooms[i];
        if(r.id == room)
            return r;
    }

    return undefined;
} 

export function exists(room) {
    return getRoom(room) != undefined;
}

export function join(socket, room) {
    room = room.toUpperCase();
    if(exists(room)) {
        socket.join(room);
        socket.emit(status.GAME_JOINED, { room:room });
        console.log('User joined room ' + room);
        return true;
    }

    socket.emit(status.FAILED, { code:0, msg:'Room does not exist!' });
    return false;
}