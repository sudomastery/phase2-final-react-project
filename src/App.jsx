import './App.css'
import UserFetch from './components/UserFetch'
import UserDetail from './components/UserDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserFetch />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
