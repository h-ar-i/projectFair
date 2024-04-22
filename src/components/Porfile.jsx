import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { SERVER_URL } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserAPI } from '../services/allAPI.JS';



function Porfile() {
  const [preview,setPreview] = useState("")
  const [existingImg,setExistingImg] = useState("")
  const [userDetaills,setUserDetaills] = useState({
    username:"",email:"",password:"",github:"",linkedin:"",profileImage:""
  })
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const existingUserDetails = JSON.parse(sessionStorage.getItem("existinguser"))
      setUserDetaills({
        ...userDetaills,username:existingUserDetails.username,email:existingUserDetails.email,password:existingUserDetails.password,github:existingUserDetails.github,linkedin:existingUserDetails.linkedin
      })
      setExistingImg(existingUserDetails.profile)
    }
  },[open])

  useEffect(()=>{
    if(userDetaills.profileImage){
      setPreview(URL.createObjectURL(userDetaills.profileImage))
    }else{
      setPreview("")
    }
  },[userDetaills.profileImage])

  const handleUserProfile = async ()=>{
    const {username,email,password,github,linkedin,profileImage} = userDetaills
    if(!github || !linkedin){
      toast.warning("please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview?reqBody.append("profileImage",profileImage):reqBody.append("profileImage",existingImg)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call
        try{
          const result = await updateUserAPI(reqBody,reqHeader)
          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("existinguser",JSON.stringify(result.data))
          }else{
            console.log(result);
          }
        }catch(err){
          console.log(err);
        }
      }
    }
  }
  return (
    <>
    <div className="d-flex justify-content-center">
      <div className="text-arning">user profile</div>
      <button onClick={() => setOpen(!open)} className='btn'><i class="fa-solid fa-angle-down"></i></button>
    </div>
    <Collapse in={open}>
        <div className='row justify-content-center mt-3 shadow' id="example-collapse-text">

         <label className='text-center '>
          <input onChange={e=>setUserDetaills({...userDetaills,profileImage:e.target.files[0]})} type="file" style={{display:'none'}} className='shadow' />
        { 
        existingImg == "" ?
         <img style={{height:'100px',width:'100px'}} className='img-fluid' src={preview?preview:"https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"} alt="" />
         :
         <img style={{height:'100px',width:'100px'}} className='img-fluid' src={preview?preview:`${SERVER_URL}/uploads/${existingImg}`} alt="" />
         }

         </label>

         <input value={userDetaills.github} onChange={e=>setUserDetaills({...userDetaills,github:e.target.value})} type="text" placeholder='GITHUB URL' className='mt-2' />
         <input value={userDetaills.linkedin} onChange={e=>setUserDetaills({...userDetaills,linkedin:e.target.value})}  type="text" placeholder='LinkedIn URL' className='mt-2' />

         <div className="d-grid mt-2">
          <button onClick={handleUserProfile} className='btn btn-warning' >update profile</button>
         </div>


         <ToastContainer position='top-center' theme='colored' autoClose={3000} />

        </div>
      </Collapse>
    </>
  )
}

export default Porfile