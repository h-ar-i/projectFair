
import { useContext } from 'react'
import './App.css'
import Footter from './components/Footter'
import Header from './components/Header'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Project from './pages/Project'
import { Routes, Route, Navigate } from 'react-router-dom'
import { tokenAuthContext } from './contexts/TokenAuth'




function App() {

  const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister />} />
        <Route path='/dashboard' element={isAuthorised?<Dashboard />:<Navigate to={'/login'}/>} />
        <Route path='/projects' element={isAuthorised?<Project />:<Navigate to={'/login'}/>} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
      <Footter />
    </>
  )
}

export default App
