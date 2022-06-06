import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { io } from "socket.io-client";

const ioSettings = { 
    autoConnect: true,
    path: '/socket'
}

export default class App extends Component {
    constructor() {
        super();

        this.state = {};
        
        this.testSocket = this.testSocket.bind(this);
    }

    componentDidMount() {
        const URL = "http://localhost";
        const socket = io(URL, ioSettings);

        socket.onAny((event, ...args) => {
            console.log(event, args);
        });

        this.setState({
            ...this.state,
            socket: socket
        });
    }
    
    testSocket(e) {
        console.log(this.state);
        this.state.socket.emit('chat message', 'hello world');
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Hesteløp</title>
                    {/* <script src='/socket.io/socket.io.js'/> */}
                </Helmet>
                <form>
                    <input type="text"/>
                    <button onClick={this.testSocket}>
                        Join
                    </button>
                </form>
            </div>
        )
    }
}
