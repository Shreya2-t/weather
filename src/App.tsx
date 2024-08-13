import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginForm from './components/LoginForm'
import WeatherComponent from './components/WeatherComponent'
import WeatherComponent2 from './components/WeatherComponent2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <LoginForm/> */}
    <WeatherComponent/>
    {/* <WeatherComponent2/>  */}
    </>
  )
}

export default App
