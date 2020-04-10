import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Login.css'

import cards from '../assets/cards-home.png'

export default function Login() {
  const savedNick = localStorage.getItem('nick')
  const [nick, setNick] = useState(savedNick)
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
    if (nick) {
      localStorage.setItem('nick', nick)
    }
    history.push('/room')
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 p-2">
          <form className="box text-center" onSubmit={handleSubmit}>
            <h1 className="">Presidente</h1>
            <input
              className="input-default mb-4"
              placeholder="Digite seu Nickname..."
              value={nick}
              onChange={e => setNick(e.target.value)}
            />
            <button className="btn-black mb-2" type="submit">
              Entrar
            </button>
          </form>
          <img className="img" src={cards} alt="Cards" />
        </div>
      </div>
    </div>
  )
}
