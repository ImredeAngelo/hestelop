import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import socket from '@socket'
import * as status from '@socket/codes'

export default class FrontPage extends Component {
  constructor() {
    super();

    this.state = {
      room: null
    }
  }

  componentDidMount() {
    socket.on(status.GAME_JOINED, this.joinedGame.bind(this));
    socket.on(status.FAILED, this.joinFailed);
  }

  componentWillUnmount() {
    socket.removeListener(status.GAME_JOINED, this.joinedGame);
    socket.removeListener(status.FAILED, this.joinFailed);
  }
  
  joinGame(e) {
    const room = document.getElementById('roomID').value;
    socket.emit(status.JOIN_GAME, room);
    e.preventDefault();
  }

  joinedGame(response) {
    console.log('response', response);
    this.setState({
      ...this.state,
      room: response.room
    })
  }

  joinFailed(response) {
    console.log('Failed to join game: ', response);
  }

  render() {
    return this.state.room == null ? (
      <form>
          <input id="roomID" type="text"/>
          <button onClick={this.joinGame}>Bli med</button>
          <Link to="/host">eller trykk her for å starte et nytt spill</Link>
      </form>
    ) : (
      <Navigate to={this.state.room}/>
    )
  }
}
