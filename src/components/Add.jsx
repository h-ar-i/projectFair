import React, { useContext, useEffect  } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import {uploadimg} from  '../assets/upload.jpg'
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allAPI.JS';
import { addResponseContext } from '../contexts/ContextAPI';


function Add() {
  const {addResponse, setAddResponse} = useContext(addResponseContext)

  const [preview,setPreview] = useState("")
  const [imageFileStatus,setimageFileStatus] = useState(false)
  const  [projectDetails,setProjectDetails] = useState({
    title:"",language:"",overview:"",github:"",website:"",projectImage:""
  })
  const [show, setShow] = useState(false);

  const handleClose = ()=>{
    setShow(false);
    setProjectDetails({
      title:"",language:"",overview:"",github:"",website:"",projectImage:""
    })
  }
  const handleShow = () => setShow(true);
  console.log(projectDetails);

 useEffect(()=>{
  if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" ||  projectDetails.projectImage.type=="image/jpeg" ||  projectDetails.projectImage.type=="image/svg" ){
    setimageFileStatus(true)
    setPreview(URL.createObjectURL(projectDetails.projectImage))
  }else{
    setPreview("https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg")
    setimageFileStatus(false)
    setProjectDetails({...projectDetails,projectImage:""})
  }
  },[projectDetails.projectImage])

  //fn call to add project
  const handleUploadProject = async ()=>{
    const {title,language,overview,github,website,projectImage} = projectDetails
    if(!title || !language || !overview || !github || !website || !projectImage){
      toast.warning("please fill the form completely")

    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)


      const  token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "Content-Type" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        //api call
      try { 
         const result = await addProjectAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          // toast.success(`'${result.data.title}' has successfully added`)
          setAddResponse(result)
          handleClose()
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err);
        }
      }
    }
  }
  
  return (
    <>
     <button onClick={handleShow} className='btn'> <i class="fa-solid fa-plus fa-beat-fade me-1"></i> Add New Project</button>
    
      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className="row">
       <div className="col-lg-4">
          <label>
            <input type="file" style={{display:'none'}} onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
            <img  height={'200px'} className='img-fluid' src={preview} alt="" />
          </label>
{ !imageFileStatus &&     
    <div className="text-danger fw-bolder my-2">* upload following types only (png,jpeg,svg,jpg) !!! </div>
}       
       </div>
        <div className="col-lg-8">

        <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Project Title' value={projectDetails.title}onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
          </div>

          <div className='mb-2'>
          <input type="text" className='form-control' placeholder='Languages Used in the project' value={projectDetails.language}onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
          </div>

          <div className='mb-2'>
          <input type="text" className='form-control' placeholder='project GITHUB LINK' value={projectDetails.github}onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})}/>
          </div>

            <div className='mb-2'>
            <input type="text" className='form-control' placeholder='project WEBSITE LINK' value={projectDetails.website}onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}/>
            </div>

        </div>
        <div className='mb-2'>
          <input type="text" className='form-control' placeholder='project overview' value={projectDetails.overview}onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}/>
          </div>
       </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUploadProject} variant="primary" >Upload</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Add