import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileInput from './components/fileInput/fileInput'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <FileInput />

    </>
  )
}

export default App
