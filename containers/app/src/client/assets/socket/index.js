import { io } from "socket.io-client";

const URL = "http://localhost";
const socket = io(URL, { 
    autoConnect: false,
    path: '/socket'
});

export default socket;