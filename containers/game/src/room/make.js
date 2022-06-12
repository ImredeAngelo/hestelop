import generateID from "../base64/index.js"
import * as status from "../codes.js"
import * as rooms from "./rooms.js"
import exists from "./exists.js"

export default function make(socket) {
    const code = generateID(5);

    if(exists(code))
        return make(socket);

    rooms.add(code);
    
    // socket.leaveAll
    socket.join(code);
    socket.emit(status.GAME_CREATED, { code:code });
    return code;
}