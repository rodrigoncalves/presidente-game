import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import './Login.css'

import cards from '../assets/cards-home.png'

export default function Login() {
  const savedNick = localStorage.getItem('nick') || ''
  const [nick, setNick] = useState(savedNick)
  const history = useHistory()
  const { handleSubmit, register, errors } = useForm()

  const login = ({ nick }) => {
    localStorage.setItem('nick', nick)
    history.push('/room')
  }

  return (
    <div className="col-12 p-2">
      <form className="game-border text-center" onSubmit={handleSubmit(login)}>
        <h1 className="">Presidente</h1>
        <p className="error-message">{errors.nick && errors.nick.message}</p>
        <input
          name="nick"
          className="input-default mb-4"
          placeholder="Digite seu Nickname..."
          value={nick}
          onChange={e => {
            const value = e.target.value
            if (value.length <= 20) {
              setNick(value)
            }
          }}
          ref={register({ required: 'Campo obrigatório' })}
        />
        <button className="btn-black mb-2" type="submit">
          Entrar
        </button>
      </form>
      <img className="img" src={cards} alt="Cards" />
    </div>
  )
}
