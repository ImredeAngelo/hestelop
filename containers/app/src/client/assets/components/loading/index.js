import React, { Component } from 'react'
import './lds.css'

export default class Loading extends Component {
  render() {
    return (
      <div className="lds-bk">
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }
}
