import React from 'react'

export default function Card(props) {
  import(`../../assets/svg-cards/${props.name}.svg`).then(image => {
    const imgs = document.getElementsByClassName(props.name)
    for (const img of imgs) {
      img.src = image.default
    }
  })

  return <img className={`card ${props.name}`} alt={props.name} />
}
