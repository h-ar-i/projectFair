import React from 'react'
import { Link } from 'react-router-dom'


function Footter() {
  return (
    <>
    <div className='p-2' style={{backgroundColor:''}}>
    <div style={{height:'300px'}} className='container mt-5 w-100 '>
         <div className="footer-content d-flex justify-content-between">
            <div style={{width:'400px'}} className="media">
                <h5 className='d-flex'><i style={{height:'25px'}} className='fa-solid fa-pen-fancy me-3'></i> Project Fair</h5>
                <p style={{textAlign:'justify'}}> Designed and built with all the love in the world by the bootstrap team with the help of our conributors.</p>
                <span> Code Licenced MIT,docs cc by 3.0 </span>
                <p>Currently v5.3.2</p>
            </div>
            <div className="link d-flex flex-column">
                    <h5 className='d-flex'>Link's</h5>
                    <Link to={'/'} style={{textDecoration:'none'}} >Landing Page</Link>
                    <Link to={'/dashboard'} style={{textDecoration:'none'}} >Dashboard</Link>
                    <Link to={'/register'} style={{textDecoration:'none'}} >Register</Link>
                    <Link to={'/projects'} style={{textDecoration:'none'}} >Projects</Link>

            </div>
            <div className="guides d-flex flex-column">
                <h5>Guides</h5>
                <a href="https://react.dev/" target='_blank' style={{textDecoration:'none'}}>React JS</a>
                <a href="https://reactrouter.com/en/main" target='_blank' style={{textDecoration:'none'}}>React Router</a>
                <a href="https://react-bootstrap.netlify.app/" target='_blank' style={{textDecoration:'none'}}>React Bootstrap</a>
                <a href="https://www.w3schools.com/css/" target='_blank' style={{textDecoration:'none'}}>CSS</a>

            </div>
            <div className="contact">
                <h5>Contact us</h5>
                <div className='d-flex'>
                    <input type="text" className="form control  me-1 " placeholder='email id:-' />
                    <button className='btn btn-warning border border-danger'><i className="fa-solid fa-arrow-right"></i></button>
                </div>
                <div className='icons d-flex justify-content-between mt-3'>
                <a href="https://twitter.com/?lang=en" target='_blank' style={{textDecoration:'none'}}><i class="fa-brands fa-x-twitter fa-1x"></i></a>
                <a href="https://www.instagram.com/" target='_blank' style={{textDecoration:'none'}}><i class="fa-brands fa-instagram fa-1x"></i></a>
                <a href="https://www.facebook.com/" target='_blank' style={{textDecoration:'none'}}> <i class="fa-brands fa-facebook fa-1x"></i></a>
                <a href="https://in.linkedin.com/" target='_blank' style={{textDecoration:'none'}}><i class="fa-brands fa-linkedin fa-1x"></i> </a>
                <a href="https://github.com/" target='_blank' style={{textDecoration:'none'}}><i class="fa-brands fa-github fa-1x"></i> </a>
                <a href="" target='_blank' style={{textDecoration:'none'}}> <i class="fa-solid fa-phone fa-1x"></i></a>
                </div>
            </div>
        </div>
        <p className='text-center mt-4'>Copyright &copy; 2024 media player.built with react.</p>
        </div>
    </div>
    
    </>
  )
}

export default Footter