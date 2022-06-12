import React, { Component } from 'react'

export default class PlayerPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>Player</div>
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
