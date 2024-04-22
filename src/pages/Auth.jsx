import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerApi } from '../services/allAPI.JS';
import { loginApi } from '../services/allAPI.JS';
import { tokenAuthContext } from '../contexts/TokenAuth';


function Auth({ insideRegister }) {

  const [isAuthorised, setIsAuthorised] = useState(tokenAuthContext)


  const navigate = useNavigate()
  const [userInputs,setUserInputs] = useState({
    username:"",email:"",password:""
  })
  console.log(userInputs);
  const handleRegister = async (e)=>{
    e.preventDefault()
    if(userInputs.username && userInputs.email && userInputs.password){
      // toast.success(" register success")
      //api call
      // const {username,email,password} = userInputs
      try{
        const result = await registerApi(userInputs)
        console.log(result);
        if(result.status==200){
          toast.success(`welcome ${result.data.username}.....please login to explore our website`) 
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/login')
          },2000);
        }else{
          toast.error(result.response.data) 
          setTimeout(()=>{
            setUserInputs({username:"",email:"",password:""})
          },2000);
        }
      }catch{
        console.log(err);
      }
      
    }else{
      toast.warning("please fill the form completely!!")
    }
  }

  //handle login
  const handleLogin = async (e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
      //api call
      try {
        const result = await loginApi(userInputs)
        if(result.status==200){
          //store existing user and token
          sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          toast.success(`welcome ${result.data.existingUser.username}...`)
          setUserInputs({username:"",email:"",password:""})
          setTimeout(()=>{
            navigate('/')
          },2000);
        }else{
          toast.error(result.response.data)
        }
        
      } catch (err) {
        console.log(err);
      }
    }else{
      toast.warning("please fill the form completely !!")
    }
  }

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className="d-flex justify-content-center align-items-center">
        <div className="container" w-75>
          <Link to={'/'} style={{ textDecoration: 'none' }} className='fw-bolder'> <i className="fa-solid fa-arrow-left text-info me-1 mb-3"></i>Back To Home</Link>
          <div className="card shadow p-5 border border-success">
            <div className="row">
              <div className="col-lg-6">
                <img className='w-75 border border-success' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8alE2nDqDTbOlJhWY5lPryhRq7ac2BlYU_nLDM7Q6nA&s" alt="" />
              </div>
              <div className="col-lg-6">
                <h1 className="fw-bolder mt-2"><i className="fa-brands fa-docker fa-bounce me-3 "></i>Project Fair</h1>
                <h5 className='fw-bolder mt-2'>
                  sign {insideRegister ? 'up' : 'in'} to your Account
                </h5>
                <Form>
                  {
                    insideRegister &&
                    <FloatingLabel
                    controlId="floatingInputName"
                    label="UserName"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.username} onChange={e=>setUserInputs({...userInputs,username:e.target.value})} type="text" placeholder="userName" />
                  </FloatingLabel>

                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email adress"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.email} onChange={e=>setUserInputs({...userInputs,email:e.target.value})}  type="email" placeholder="name@example.com" />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="Password">

                    <Form.Control value={userInputs.password} onChange={e=>setUserInputs({...userInputs,password:e.target.value})} type="password" placeholder="Password" />
                  </FloatingLabel>

                  {
                    insideRegister ?
                    <div className='mt-3'>
                      <button onClick={handleRegister} className='btn btn-primary'>Register</button>
                      <p> Already have an account ? click here to <Link style={{textDecoration:'none'}} className='text-info' to={'/login'}>Login</Link></p>

                    </div>
                    :
                    <div className='mt-3'>
                      <button onClick={handleLogin} className='btn btn-success'>Login</button>
                      <p>New user ? click here to <Link style={{textDecoration:'none'}} className='text-info' to={'/register'}>Register</Link></p>

                    </div>
                  }

                </Form>


              </div>

            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Auth