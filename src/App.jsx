import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import TodoInput from './Components/TodoInput'

function App() {

  return (
    <div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo" element={<TodoInput />} />
        </Routes>
    </div>
  )
}

export default App
