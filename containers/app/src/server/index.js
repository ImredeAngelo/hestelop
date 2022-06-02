import render from './render'
import express from 'express'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', render);

app.listen(port, () => {
    console.log(`[App] Listening on port ${port}`)
});