var running = {
    // "ABCDFG":{ users:0 }
}

export function startNewGame() {
    const code = "ABCDFG"

    if(running[code] != undefined) {
        console.log("Code already exists");
        return;
    }

    running[code] = { added:true }
}

// module.exports = {
//     startNewGame: startNewGame
// }