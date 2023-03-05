import { useState, useEffect } from 'react'
import Navbar from './components/navbar.jsx'
import SearchBar from './components/searchbar.jsx'
import Info from './components/info.jsx'

function App() {
  const [info, setinfo] = useState([])

  return (
    <div>
      <Navbar />
      <SearchBar setinfo={setinfo}/>
      <Info info={info}/>
    </div>
  )
}

export default App
