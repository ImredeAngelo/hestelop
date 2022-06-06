import express from 'express'
// import http from 'http'

import render from './render'
// import socket from './socket'

const app = express();
const port = process.env.PORT || 3000;
// const server = http.createServer(app);

// socket(server);

app.get('/*', render);

app.listen(port, () => {
    console.log(`[App] Listening on port ${port}`)
});