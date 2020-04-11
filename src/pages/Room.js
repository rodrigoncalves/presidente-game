import React, { useEffect } from 'react'
import { rootRef } from '../firebase/firebase'

import './Room.css'
import { useState } from 'react'

export default function Room() {
  const nick = localStorage.getItem('nick')
  const [roomKey, setRoomKey] = useState('')
  const [players, setPlayers] = useState([])

  // get room key
  useEffect(() => {
    const roomsRef = rootRef.child('rooms')
    roomsRef.once('value').then(
      snap => {
        if (!snap.exists()) {
          const roomRef = roomsRef.push({ createAt: new Date().getTime() })
          setRoomKey(roomRef.key)
        } else {
          for (const key in snap.val()) {
            setRoomKey(key) // only one room for now
          }
        }
      },
      [roomKey]
    )
  })

  // set player online
  useEffect(() => {
    if (roomKey) {
      const playerRef = rootRef.child(`rooms/${roomKey}/players/${nick}`)
      playerRef.set({
        createAt: new Date().getTime(),
        nick,
      })
      const setOffline = () => playerRef.remove()
      window.addEventListener('beforeunload', setOffline)
      return () => {
        window.removeEventListener('beforeunload', setOffline)
      }
    }
  }, [nick, roomKey])

  // get players online
  useEffect(() => {
    if (roomKey) {
      const playersRef = rootRef.child(`rooms/${roomKey}/players`)
      playersRef.on('value', snap => {
        const players = []
        snap.forEach(s => {
          players.push(s.val())
        })
        setPlayers(players)
      })
    }
  }, [roomKey])

  return (
    <div>
      <p>{nick}</p>
      <p>{roomKey}</p>
      {players.map(u => (
        <p key={u.nick}>{u.nick}</p>
      ))}
    </div>
  )
}
