import { useState } from 'react'
import './App.css'
import UserNameForm from './components/UserNameForm'
import MainMenu from './components/mainMenu'

function App() {
  const [userName, setUsername] = useState('');
  return (
    <>
      <div>
        {userName ? (<MainMenu userName= {userName}></MainMenu>)
      :(<UserNameForm onSubmit = {setUsername}></UserNameForm>)  
      }
        
        
      </div>
    </>
  )
}

export default App
