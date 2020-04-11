import React, { useState, useEffect } from 'react'
import { rootRef, database } from '../firebase/firebase'
import { useHistory } from 'react-router-dom'

import './Room.css'

import userimg from '../assets/img/user.png'

export default function Room() {
  const savedNick = localStorage.getItem('nick')
  const [nick, setNick] = useState(savedNick)
  const [roomKey, setRoomKey] = useState('')
  const [playersSnap, setPlayersSnap] = useState([])
  const [key, setKey] = useState('')
  const history = useHistory()

  // get room key
  useEffect(() => {
    const roomsRef = rootRef.child('rooms')
    roomsRef.once('value').then(
      snap => {
        if (!snap.exists()) {
          const roomRef = roomsRef.push({ createdAt: new Date().getTime() })
          setRoomKey(roomRef.key)
        } else {
          for (const key in snap.val()) {
            setRoomKey(key)
            break // only one room for now
          }
        }
      },
      [roomKey]
    )
  })

  // set player online
  useEffect(() => {
    if (roomKey && !key) {
      const playersRef = rootRef.child(`rooms/${roomKey}/players`)
      const connectedRef = database.ref('.info/connected')
      connectedRef.once('value', snap => {
        if (snap.exists()) {
          const playerRef = playersRef.push({
            createdAt: new Date().getTime(),
            nick,
          })

          setKey(playerRef.key)

          // on nick changed
          playerRef.on('child_changed', snap => {
            setNick(snap.val())
          })

          // on player kicked
          playerRef.on('child_removed', _ => {
            history.push('/')
          })

          // on player offline
          playerRef.onDisconnect().remove()
        }
      })
    }
  }, [roomKey, nick, key, history])

  // get players online
  useEffect(() => {
    if (roomKey) {
      const playersRef = rootRef.child(`rooms/${roomKey}/players`)
      playersRef.on('value', snap => {
        const players = []
        snap.forEach(s => {
          players.push(s)
        })
        setPlayersSnap(players)
      })
    }
  }, [roomKey])

  return (
    <div className="base-game">
      <div className="row justify-content-around">
        {/* São todos os outros jogadores */}
        <div className="other-player text-center">
          <div className="d-flex m-2">
            <img
              className="img-player m-2 d-flex align-self-center"
              src={userimg}
              alt="user icon"
            />
            <div className="card m-1">
              <div className="card-inside">
                <p className="number">12</p>
              </div>
            </div>
          </div>
          <p className="name-player">Nome do usuário</p>
          <p className="position-player">Presidente</p>
        </div>
      </div>

      <div className="play">Jogadas</div>

      {/* Jogador principal */}
      <div className="main-player col-12 fixed-bottom">
        <div className=" col-2 text-center">
          <img className="img-player" src={userimg} alt="user icon" />
          <p className="name-player">{nick}</p>
          <p className="position-player">Presidente</p>
        </div>
        <div className=""></div>
      </div>
    </div>
  )
}
