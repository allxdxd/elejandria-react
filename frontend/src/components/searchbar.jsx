import React, { useEffect, useState } from 'react'
import '../styles/searchBar.css'

function Suggest({ title, author, isSelect, setselected, index }) {
  return (
    <div
      onMouseOver={() => {
        setselected(index)
      }}
      className={`suggestText ${isSelect && 'selected'}`}
    >
      <div className='title'> {title}</div>
      <div className='author'>{author}</div>
    </div>
  )
}

export default function SearchBar({ setinfo }) {
  const [suggest, setsuggest] = useState([''])
  const [searchtext, setsearchtext] = useState('')
  const [selected, setselected] = useState(0)
  const [showAlL, setshowAll] = useState(false)

  useEffect(() => {
    setinfo(suggest[selected])
  }, [selected])

  useEffect(() => {
    let words = searchtext !== '' ? searchtext : '""'
    fetch(`http://127.0.0.1:3000/api/buscar/${words}`)
      .then((res) => res.json())
      .then((res) => {
        // save only first 10
        // let tosave = res.flat().length < 10 ? res.flat() : res.slice(0, 10)
        // if (tosave.length === 1) tosave = tosave.flat().slice(0, 10)
        // setsuggest(tosave)

        //save all
        setsuggest(res.flat(2))
      })
      .catch(() => {
        setsearchtext('')
      })

    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 38:
          // let str = 'Up Key pressed!'
          // console.log(str)
          e.preventDefault()
          setselected((a) => {
            if (a < 2) scroll(0, 0)
            if (a < 4) scroll(0, 200)
            setshowAll('block')
            return a !== 0 ? a - 1 : 0
          })
          break
        case 40:
          // let str = 'Down Key pressed!'
          // console.log(str)
          e.preventDefault()
          setselected((a) => {
            if (a > 2) scroll(0, 200)
            if (a > 4) scroll(0, 500)
            setshowAll('block')
            return a !== 9 ? a + 1 : 9
          })
          break
      }
    }
  }, [searchtext])

  return (
    <div className='containerSearch'>
      <form onSubmit={(e) => e.preventDefault()} className='formsearch'>
        <input
          type='text'
          className='searchbar'
          autoFocus
          placeholder='Escriba el título o autor del libro'
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
            if (showAlL) {
              return (
                <Suggest
                  key={e.link}
                  title={e.tittle}
                  author={e.author}
                  isSelect={i === selected}
                  setselected={setselected}
                  index={i}
                  setinfo={setinfo}
                />
              )
            }

            if (!showAlL && i < 10) {
              return (
                <Suggest
                  key={e.link}
                  title={e.tittle}
                  author={e.author}
                  isSelect={i === selected}
                  setselected={setselected}
                  index={i}
                  setinfo={setinfo}
                />
              )
            }

          })}
        </div>
        <button
          className='btnshow'
          style={
            showAlL
              ? { background: '#00b894', color: '#2d3436' }
              : { background: '#636e72' }
          }
          onClick={() => setshowAll(!showAlL)}
        >
          Mostrar todos: {showAlL ? 'Sí' : 'No'}
        </button>
      </div>
    </div>
  )
}
