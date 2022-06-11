const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export default function generate(length) {
    var c = '';
    for(let i = 0; i < length; i++) {
        c += chars[getRandomInt(1, chars.length) - 1];
    }

    return c;
}