import { io } from "socket.io-client";

const URL = "http://localhost";
var socket = io(URL, { 
    autoConnect: true,
    path: '/socket'
});

export default socket;

export function listen() {
    socket.onAny((eventName, ...args) => {
        console.log("event: " + eventName);
    })
}