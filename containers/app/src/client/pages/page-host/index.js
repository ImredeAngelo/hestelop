import React, { Component } from 'react'
import socket from '@socket'
import * as status from '@socket/codes'
import Lobby from '@components/lobby';
import Loading from '../../assets/components/loading';

export default class HostPage extends Component {
  constructor() {
    super();

    this.state = {
      room: null
    };
  }

  componentDidMount() {
    socket.on(status.GAME_CREATED, this.onGameCreated.bind(this));
    socket.emit(status.HOST_GAME);
  }

  componentWillUnmount() {
    socket.removeListener(status.GAME_CREATED, this.onGameCreated);
    socket.emit(status.GAME_STOPPED, this.state.room); //TODO: Let game finish automatically
  }

  onGameCreated(response) {
    console.log('Game created: ', response);
    // this.setState({
    //   ...this.state,
    //   room: response.code
    // });
  }

  render() {
    return this.state.room != null ? (
      <form>
        Rom {this.state.room}
        <Lobby/>
        <button>Start spill</button>  
      </form>
    ) : (
      <Loading/>
    )
  }
}
