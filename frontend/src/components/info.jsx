import React from 'react'
import '../styles/info.css'

export default function Info({ info }) {
  return (
    <div className='bookinfo'>

      <div className='textdata'>
        <img src={info?.img === undefined ? '' : info.img} />

        <p>{info?.tittle !== undefined && info.tittle}</p>
        <p>{info?.author !== undefined && info.author}</p>
      </div>

      <div className='btns'>
        <p>{info?.link !== undefined && 'Ver página'}</p>
      </div>
      
    </div>
  )
}
