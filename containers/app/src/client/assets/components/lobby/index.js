import React, { Component } from 'react'
import * as status from '@socket/codes'
import socket from '@socket'

export default class Lobby extends Component {
  constructor() {
    super();

    this.state = {}
  }

  componentDidMount() {
    socket.on(status.GET_USERS, this.setPlayers.bind(this));
    socket.on(status.UPDATE_PLAYERS, this.addPlayer.bind(this));
    socket.emit(status.GET_USERS, { pin:this.props.pin });
  }

  componentWillUnmount() {
    socket.removeListener(status.GET_USERS, this.setPlayers);
    socket.removeListener(status.UPDATE_PLAYERS, this.addPlayer);
  }

  // Also remove player
  addPlayer(r) {
    console.log("Player joined", r);
    this.setPlayers({
      players: [
        ...this.state.players,
        r.player
      ]
    })
  }

  setPlayers(r) {
    this.setState({
      ...this.state,
      players:r.players
    })
  }

  render() {
    return this.state.players == null ? (
      <div>Loading</div>
    ) : (
      <div>
        players
        { this.state.players.map((player, i) => 
          <div key={i}>{player}</div>
        )}
      </div>
    )
  }
}
