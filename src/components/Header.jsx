import React, { useContext } from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../contexts/TokenAuth'



function Header({insideDashboard}) {
  
const {isAuthorised,setIsAuthorised} = useContext(tokenAuthContext)

const navigate = useNavigate()

const logout = ()=>{
  sessionStorage.clear()
  navigate('/')

}

  return (
    <>
     <Navbar style={{backgroundColor:'',zIndex:'1'}} className="card shadow w-100 top-0 position-fixed">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} style={{textDecoration:'none'}}>
            <i className="fa-brands fa-docker fa-bounce me-3 "></i>Project-Fair
            </Link>
          </Navbar.Brand>
          {
            insideDashboard &&
            <div className="ms-auto">
            <button onClick={logout} className='btn btn-link'>Logout <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
          </div>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header