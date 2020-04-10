import React from 'react'
import { rootRef } from '../firebase/firebase'

import './Room.css'

export default function Room() {
  const nick = localStorage.getItem('nick')
  rootRef.on('value', snap => {
    console.log(snap)
  })
  return (
    <div>
      <p>{nick}</p>
    </div>
  )
}
