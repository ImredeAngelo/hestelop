import * as rooms from "./rooms.js"

export default function exists(pin) {
    return rooms.get(pin) != undefined;
}