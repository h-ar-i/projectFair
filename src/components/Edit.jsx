import React, { useContext, useEffect, useState } from 'react'
// import Edit from './Edit'
import Add from './Add'
import { Button, Modal } from 'react-bootstrap';
import { SERVER_URL } from '../services/serverUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editPrjectAPI } from '../services/allAPI.JS';
import { editResponseContext } from '../contexts/ContextAPI';



function Edit({ project }) {
  // console.log(project);
  const { editResponse, setEditResponse } = useContext(editResponseContext)
  const [projectData, setProjectData] = useState({
    id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: ""
  })
  const [preview, setPreview] = useState("")


  const [show, setShow] = useState(false);

  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage))
    } else {
      setPreview("")
    }
  }, [projectData.projectImage])

  const handleClose = () => {
    setShow(false);
    setProjectData({ id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: "" })
    setPreview("")
  }
  const handleShow = () => {
  setShow(true);
  setProjectData({ id: project?._id, title: project?.title, language: project?.language, overview: project?.overview, github: project?.github, website: project?.website, projectImage: "" })
  }
  
  const handleUpdateProject = async () => {
    const { title, language, overview, github, website, projectImage } = projectData
    if (!title || !language || !overview || !github || !website) {
      toast.warning("please fill the form completely")
    } else {
      //proceed api call
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", project.projectImage)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call
        try {
          const result = await editPrjectAPI(projectData.id, reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            handleClose()
            //pass response view
            setEditResponse(result)
          } else {
            console.log(result.response);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  return (
    <div>
      <button onClick={handleShow} className='btn'> <i class="fa-solid fa-edit fa-beat-fade me-1"></i></button>

      <Modal size='lg' centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectData({ ...projectData, projectImage: e.target.files[0] })} type="file" style={{ display: 'none' }} />
                <img height={'200px'} className='img-fluid' src={preview ? preview : `${SERVER_URL}/uploads/${project?.projectImage}`} alt="project?.title" />
              </label>
            </div>
            <div className="col-lg-8">

              <div className='mb-2'>
                <input value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} type="text" className='form-control' placeholder='Project Title' />
              </div>

              <div className='mb-2'>
                <input value={projectData.language} onChange={e => setProjectData({ ...projectData, language: e.target.value })} type="text" className='form-control' placeholder='Languages Used in the project' />
              </div>

              <div className='mb-2'>
                <input value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} type="text" className='form-control' placeholder='project GITHUB LINK' />
              </div>

              <div className='mb-2'>
                <input value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} type="text" className='form-control' placeholder='project WEBSITE LINK' />
              </div>

            </div>
            <div className='mb-2'>
              <input value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} type="text" className='form-control' placeholder='project overview' />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateProject} variant="primary" >Update</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </div>
  )
}

export default Edit