import React, { useEffect } from 'react'
import { rootRef } from '../firebase/firebase'

import './Room.css'
import { useState } from 'react'

export default function Room() {
  const nick = localStorage.getItem('nick')
  const [roomKey, setRoomKey] = useState('')

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

  // set user online
  useEffect(() => {
    if (roomKey) {
      const userRef = rootRef.child(`rooms/${roomKey}/users/${nick}`)
      userRef.set({ createAt: new Date().getTime() })
      const setOffline = () => userRef.remove()
      window.addEventListener('beforeunload', setOffline)
      return () => {
        window.removeEventListener('beforeunload', setOffline)
      }
    }
  }, [nick, roomKey])

  return (
    <div>
      <p>{nick}</p>
      <p>{roomKey}</p>
    </div>
  )
}
