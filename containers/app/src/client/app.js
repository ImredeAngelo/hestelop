import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom'

import {listen} from './assets/socket'

import FrontPage from './pages/front-page'
import HostPage from './pages/page-host'
import PlayerPage from './pages/player-page'

import './reset.css'

export default class App extends Component {
    constructor() {
        super();
        
        // this.join = this.join.bind(this);
        // this.host = this.host.bind(this);
    }

    componentDidMount() {
        // socket.on('chat message', (msg) => {
        //     console.log("msg: ", msg);
        // });
        
        // socket.on('created', (msg) => {
        //     console.log(msg);
        // });

        listen();
    }
    
    // join(e) {
    //     e.preventDefault();

    //     game.join(document.getElementById('roomID').value);
    // }

    // host(e) {
    //     e.preventDefault();
        
    //     socket.on(GAME_CREATED, (data) => {
    //         console.log(data.code);
    //     })

    //     game.host();
    // }

    render() {
        return (
            <Routes>
                <Route index element={<FrontPage/>} />
                <Route path="/host" element={<HostPage/>} />
                <Route path="/:room" element={<PlayerPage/>} />
            </Routes>
        )
    }
}