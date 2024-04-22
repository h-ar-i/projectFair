import React,{useEffect, useState,useContext} from 'react'
import Edit from './Edit'
import Add from './Add'
import { getUserProjectsAPI } from '../services/allAPI.JS';
import Project from '../pages/Project';
import { addResponseContext, editResponseContext } from '../contexts/ContextAPI';
import { removeProjectAPI } from '../services/allAPI.JS';
import { loginApi } from '../services/allAPI.JS';



function View() {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse, setAddResponse} = useContext(addResponseContext)
  const [userProjects,setUserProjects] = useState([])

  console.log(userProjects);
  useEffect(()=>{
    getUserProjects()
  },[addResponse,editResponse])

const getUserProjects = async ()=>{
  const token = sessionStorage.getItem("token")
  const reqHeader ={
    "Authorization" : `Bearer ${token}`
  }
  try{
    const result = await getUserProjectsAPI(reqHeader)
    console.log(result);
    if(result.status==200){
      setUserProjects(result.data)
    }
  }catch(err){
    console.log(err);
  }
}

const handleDelteProject = async (projectId)=>{
  const token = sessionStorage.getItem("token")
  if(token) {
    const reqHeader = {
      "Content-Type":   "application/json",
      "Authorization": `Bearer ${token}`
    }
    //api call
    const result = await removeProjectAPI(projectId,reqHeader)
    if(result.status==200){
      getUserProjects()
    }else{
      console.log(result);
    }
  }
}

  return (
    <>
      <div className="d-flex justify-content-between w-100 ">
        <h2 className='text-waring'>All Projects</h2>
        <div className='btn'><Add/></div>
      </div>
      <div className="mt-4">
       {
        userProjects?.length>0 ?
        userProjects?.map(Project=>(
          <div className="d-flex justify-content-between border p-2 rounded mb-3 ">
          <h3>{Project?.title}</h3>
          <div className="d-flex">
           <div className="btn"> <Edit project={Project}/></div>
            <div className='btn'>  <a href={Project?.github} target='_blank'><i class="fa-brands fa-github"></i></a></div>
            <button onClick={()=>handleDelteProject(Project?._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
          </div>
        </div>
        ))
        :
        <div className="fw-bolder text-warning">No Projects Uploded Yet!!!!</div>
         }
      </div>
      </>
  )
}

export default View