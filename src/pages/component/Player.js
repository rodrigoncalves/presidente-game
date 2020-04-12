import React from 'react'

function Player(props) {
  return (
    <div className=" col-2 text-center">
      <img className="img-player" src={props.userimg} alt="user icon" />
      <p className="name-player">{props.player.nick}</p>
      <p className="position-player">Presidente</p>
    </div>
  )
}

export default Player
