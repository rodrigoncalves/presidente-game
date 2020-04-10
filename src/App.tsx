import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import './App.css'

import cards from './assets/cartas-home.png'

function App() {
  const [nick, setNick] = useState('')

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log(event)
    localStorage.setItem('nick', nick)
    // history.push('/room')
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
                onChange={e => setNick(e.target.value)}
              />
              <button className="btn-black mb-2" type="submit">
                Entrar
              </button>
            </form>
            <img className="img" src={cards} />
        </div>
      </div>
    </div>
  )
}

export default App
