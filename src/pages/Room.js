import React, { useEffect } from 'react'
import { rootRef } from '../firebase/firebase'

import './Room.css'
import { useState } from 'react'

export default function Room() {
  const nick = localStorage.getItem('nick')
  const [roomKey, setRoomKey] = useState('')
  const [users, setUsers] = useState([])

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
      userRef.set({
        createAt: new Date().getTime(),
        nick,
      })
      const setOffline = () => userRef.remove()
      window.addEventListener('beforeunload', setOffline)
      return () => {
        window.removeEventListener('beforeunload', setOffline)
      }
    }
  }, [nick, roomKey])

  // get users online
  useEffect(() => {
    if (roomKey) {
      const usersRef = rootRef.child(`rooms/${roomKey}/users`)
      usersRef.on('value', snap => {
        const users = []
        snap.forEach(s => {
          users.push(s.val())
        })
        setUsers(users)
      })
    }
  }, [roomKey])

  return (
    <div>
      <p>{nick}</p>
      <p>{roomKey}</p>
      {users.map(u => (
        <p key={u.nick}>{u.nick}</p>
      ))}
    </div>
  )
}
