import React from 'react'

import Card from './Card'
import { PlayerDiv, PlayerIcon, PlayerCards } from './styles'

function Player(props) {
  return (
    <PlayerDiv className="fixed-bottom">
      <PlayerIcon>
        <img src={props.userimg} alt="user icon" />
        <p className="name">{props.player.nick}</p>
        <p className="role">Presidente</p>
      </PlayerIcon>

      <PlayerCards>
        {['2_of_clubs', '3_of_clubs', '4_of_clubs', '5_of_clubs'].map(cardName => (
          <Card key={Math.random()} name={cardName} />
        ))}
      </PlayerCards>
    </PlayerDiv>
  )
}

export default Player
