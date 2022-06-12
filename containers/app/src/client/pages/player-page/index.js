import React, { Component } from 'react'
import Spinner from '@components/spinner';
import Lobby from '@components/lobby'
import style from './pp.scss'

export default class PlayerPage extends Component {
  constructor() {
    super();

    this.client = (typeof window !== 'undefined');
  }

  componentDidMount() {
    console.log(window.location.pathname.substring(1))
  }

  render() {
    return (
      <div>
        Player Page
        {this.client ? <Lobby pin={window.location.pathname.substring(1)}/> : <Spinner/>}
      </div>
    )
    // return this.state.username == null ? (
    //   <form className={style.wrapper} onSubmit={this.joinGame}
    //     autoComplete="off"
    //   >
    //     {/* <label for="room">Username:</label> */}
    //     <input id="username" type="text" className={style.room}
    //       name="room"
    //       maxLength="12"
    //       placeholder="Navn"
    //     />
    //     <button className={style.btn}>Bli med</button>
    //   </form>
    // ) : (
    //   <Navigate to={this.state.room}/>
    // )
  }
}
