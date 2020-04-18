import React from 'react'

function Opponent(props) {
  return (
    <div className="other-player text-center">
      <div className="d-flex m-2">
        <img
          className="img-player m-2 d-flex align-self-center"
          src={props.userimg}
          alt="user icon"
        />
        <div className="card m-1">
          <div className="card-inside">
            <p className="number">{props.cards.length}</p>
          </div>
        </div>
      </div>
      <p className="name-player">{props.player.nick}</p>
      <p className="position-player">Presidente</p>
    </div>
  )
}

export default Opponent
