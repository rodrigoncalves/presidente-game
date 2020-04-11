import React, { useState, useEffect } from 'react'
import { rootRef, database } from '../firebase/firebase'

import './Room.css'

export default function Room() {
  const savedNick = localStorage.getItem('nick')
  const [nick, setNick] = useState(savedNick)
  const [roomKey, setRoomKey] = useState('')
  const [playersSnap, setPlayersSnap] = useState([])
  const [key, setKey] = useState('')

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
          playerRef.on('child_changed', snap => {
            setNick(snap.val())
          })
          playerRef.onDisconnect().remove()
        }
      })
    }
  }, [roomKey, nick, key])

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
    <div>
      <p>{nick}</p>
      <p>{roomKey}</p>
      {playersSnap.map(player => (
        <p key={player.key}>{player.val().nick}</p>
      ))}
    </div>
  )
}
