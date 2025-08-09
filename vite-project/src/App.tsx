import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserNameForm from './components/UserNameForm'
import MainMenu from './components/mainMenu'
import ViewPokemon from './components/viewPokemon'
import PokemonCard from './components/PokemonCard'

function App() {
  const [userName, setUsername] = useState('');
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<UserNameForm onSubmit={setUsername}/>}></Route>
            <Route path='/MainMenu' element={<MainMenu userName = {userName}/>}></Route>
            <Route path='/view-pokemon' element={<ViewPokemon/>}></Route>
            <Route path = '/view-pokemon/:name' element={<PokemonCard/>}></Route>
          </Routes>
          </Router>        
      </div>
    </>
  )
}

export default App
