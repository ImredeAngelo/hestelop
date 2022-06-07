import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import socket, { listen } from './assets/socket'

export default class App extends Component {
    constructor() {
        super();
        
        this.testSocket = this.testSocket.bind(this);
        this.testHost = this.testHost.bind(this);
    }

    componentDidMount() {
        socket.on('chat message', (msg) => {
            console.log("msg: ", msg);
        })

        listen();
        // socket.connect();

        socket.on('chat message', (msg) => {
            console.log("b: ", msg);
        });
        
        socket.on('created', (msg) => {
            console.log(msg);
        });
    }
    
    testSocket(e) {
        this.emit('chat message', document.getElementById('roomID').value);
        e.preventDefault();
    }

    testHost(e) {
        this.emit('host', '');
        e.preventDefault();
    }

    emit(a, b) {
        socket.emit(a, b);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Hesteløp</title>
                    <script src="wsclient.js"/>
                </Helmet>
                <form>
                    <input id="roomID" type="text"/>
                    <button onClick={this.testSocket}>
                        Join
                    </button>
                    <button onClick={this.testHost}>
                        Host
                    </button>
                </form>
            </div>
        )
    }
}
