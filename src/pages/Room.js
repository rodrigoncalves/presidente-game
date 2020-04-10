import React from 'react'

export default function Room(props) {
  const nick = localStorage.getItem('nick')
  return <div>{nick}</div>
}
