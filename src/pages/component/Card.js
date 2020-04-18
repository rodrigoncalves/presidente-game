import React from 'react'

export default function Card(props) {
  const name = props.name
  import(`../../assets/svg-cards/${name}.svg`).then(image => {
    const imgs = document.getElementsByClassName(name)
    for (const img of imgs) {
      img.src = image.default
    }
  })

  return <img className={`card ${name}`} alt={name} />
}
