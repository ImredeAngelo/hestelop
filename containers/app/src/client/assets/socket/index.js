import { io } from "socket.io-client";
import * as status from "./codes";

const URL = "http://localhost";
const socket = io(URL, { 
    autoConnect: true,
    path: '/socket'
});

var waiting = false;

export default socket;


// TODO: Do not export socket, but expose an api instead
// ===== API

export function listen() {
    socket.onAny((eventName, ...args) => {
        console.log("event: " + eventName);
    })
}

/// Host new game
export function host() {
    // if(waiting) return;
    socket.emit(status.HOST_GAME);
    // waiting = true;
}

export function join(room) {
    socket.emit(status.JOIN_GAME, room);
}

export function onGameCreated(callback) {

}