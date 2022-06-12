import * as status from '../codes.js'

var rooms = []

// TODO: Use promises
export function get(pin) {
    var match = undefined;
    modify(pin, (r) => {
        match = r; 
    });

    return match;
} 

export function remove(pin) {
    modify(pin, (r, i) => {
        rooms.splice(i, 1);
    })
}

export function addPlayer(pin, socket, name) {
    var success = false;

    modify(pin, (r) => {
        for(let u in r.players) {
            if(u.name == name)
                return;
        }

        // TODO: Use generated rooms (not socket connection) to communicate
        r.players.push({
            con:socket,
            name:name
        });

        // console.log('Added player', rooms[0].players);
        success = true;
    });

    return success;
}

export function add(pin, state = status.GAME_CREATED) {
    rooms.push({
        code: pin.toUpperCase(),
        state: state,
        players: []
    })
}

function modify(pin, modifier) {
    for(let i = 0; i < rooms.length; i++) {
        let r = rooms[i];
        if(r.code == pin) {
            modifier(r, i);
            return true;
        }
    }

    return false;
}