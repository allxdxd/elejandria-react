import React, { useEffect, useState } from 'react'
import '../styles/searchBar.css'

function Suggest({ title, author, isSelect, setselected, index }) {
  return (
    <div onMouseOver={ ()=> setselected(index)} className={`suggestText ${isSelect && 'selected'}`}>
      <div className='title'>{title}</div>
      <div className='author'>{author}</div>
    </div>
  )
}

export default function SearchBar() {
  const [suggest, setsuggest] = useState([''])
  const [searchtext, setsearchtext] = useState('')
  const [selected, setselected] = useState(0)

  useEffect(() => {
    let words = searchtext !== '' ? searchtext : '""'
    fetch(`http://127.0.0.1:3000/api/buscar/${words}`)
      .then((res) => res.json())
      .then((res) => {
        let tosave = res.flat().length < 10 ? res.flat() : res.slice(0, 10)
        if (tosave.length === 1) tosave = tosave.flat().slice(0, 10)
        setsuggest(tosave)
      }).catch(()=>setsearchtext(''))
    
  }, [searchtext])

  return (
    <div className='containerSearch'>
      <form onSubmit={(e) => e.preventDefault()} className='formsearch'>
        <input
          type='text'
          className='searchbar'
          autoFocus
          onChange={(e) => {
            setsearchtext(e.target.value)
          }}
          value={searchtext}
        />
      </form>
      <div className='suggestList'>
        <div className='suggest'>
          {suggest.map((e, i) => {
            // console.log(suggest)
            // console.log(e)
            return (
              <Suggest
                key={e.link}
                title={e.tittle}
                author={e.author}
                isSelect={i === selected}
                setselected={setselected}
                index = {i}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
