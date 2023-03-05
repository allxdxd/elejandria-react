import React, { useEffect } from 'react'
import '../styles/books.css'

function Book({ title, author, img }) {
  return (
    <div className='book'>
      <img src={img} className='port' />
      <div className='info'>
        <p>{title}</p>
        <p>{author}</p>
        <div className="btns">
          <button className='btn'>Descargar</button>
          <button className='btn'>Agregar a lista</button>
        </div>
      </div>
    </div>
  )
}

export default function Books({ data }) {
  return (
    <div className='containerbooks'>
      {data.map((e) => (
        <Book title={e.tittle} author={e.author} img={e.img} />
      ))}
    <div className="list">
      0
    </div>
    </div>
  )
}
