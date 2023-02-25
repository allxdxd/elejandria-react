import React from 'react'
import { useState } from 'react'
import '../styles/navbar.css'

export default function Navbar() {
  const [showmenu, setshowmenu] = useState(false)
  return (
    <div>
      <div className='ico' onClick={()=>setshowmenu(!showmenu)}>
        <div className={`line ` + (showmenu ? 'l1' : '')}></div>
        <div className={`line ` + (showmenu ? 'l1' : '')}></div>
        <div className={`line ` + (showmenu ? 'l1' : '')}></div>
      </div>
      <div className={(showmenu ? 're' : 'menu ')}>
        <div className='nbtn'>Buscar</div>
        <div className='nbtn'>Libros</div>
        <div className='nbtn'>Autores</div>
      </div>
    </div>
  )
}
