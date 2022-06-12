import { FAILED, GET_USERS } from "../codes.js";
import * as rooms from "./rooms.js"

export default function getUsers(socket, data) {
    const room = rooms.get(data.pin);

    if(room == undefined) {
        socket.emit(FAILED, { error:0 });
        return;
    }
    
    socket.emit(GET_USERS, {
        players:room.players
    });
}