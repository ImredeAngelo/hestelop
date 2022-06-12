import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import socket from '@socket'
import * as status from '@socket/codes'
import style from './fp.scss'

// TODO:
// - Do not connect to socket yet, use POST to check if valid

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
    const name = document.getElementById('username').value;

    socket.emit(status.JOIN_GAME, {
      room: room,
      name: name
    });
    
    e.preventDefault();
  }

  joinedGame(response) {
    console.log('response', response);
    this.setState({
      ...this.state,
      room: response.room,
      name: response.name
    })
  }

  joinFailed(response) {
    console.log('Failed to join game: ', response);
  }

  // Only allow letters in input
  onTyping(e) {
    const pin = e.target;
    const key = e.nativeEvent.data;
    
    if(!(/^[a-zA-Z]+$/.test(key))) {
      pin.value = pin.value.replace(key, '');
      return;
    }
    
    if(pin.value.length > 0) pin.classList.add(style.active);
    else pin.classList.remove(style.active);
  }

  render() {
    return this.state.room == null ? (
      <form className={style.wrapper} onSubmit={this.joinGame}
        autoComplete="off"
      >
        {/* <label for="room">Username:</label> */}
        <input id="roomID" type="text" className={style.input} onChange={this.onTyping}
          name="room"
          maxLength="5"
          placeholder="PIN for spillets"
          // pattern="^[a-zA-Z]+$"
          // required
        />
        <input id="username" type="text" className={style.input}
          name="username"
          maxLength="12"
          placeholder="Navn"
        />
        <button className={style.btn}>Bli med</button>
        <Link to="/host" className={style.link}>eller trykk her for å starte et nytt spill</Link>
      </form>
    ) : (
      <Navigate to={this.state.room}/>
    )
  }
}
