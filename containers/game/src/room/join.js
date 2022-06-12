import exists from "./exists.js"
import * as status from "../codes.js"
import * as rooms from "./rooms.js"

const errorMsg = [
    'Vi fant ikke noe rom med den PIN koden',
    'Noen bruker allerede dette navnet!',
]

export default function join(socket, response) {
    const room = response.room.toUpperCase();
    const name = response.name.trim();

    var code = 0;

    if(exists(room)) {
        if(rooms.addPlayer(room, socket, name)) {
            socket.to(room).emit(status.UPDATE_PLAYERS, {
                action:status.JOIN_GAME,
                player:name
            });
            
            socket.join(room);
            socket.emit(status.GAME_JOINED, {
                name:name,
                room:room 
            });
            
            console.log(`User '${name}' joined room ${room}`);
            return true;
        }

        code = 1;
    }

    socket.emit(status.FAILED, { code:code, msg:errorMsg[code] });
    return false;
}