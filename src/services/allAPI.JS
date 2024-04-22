import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

//register api-called by component auth
export const registerApi = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//login api called by component Auth 
export const loginApi = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}


//add project-must call by add component
export  const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

//get all project
export  const getAllProjectsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,"",reqHeader)
}

// userProjects
export  const getUserProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,"",reqHeader)
}

// Home projects
export  const getHomeProjectsAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-projects`,"")
}

//edit project 
export const editPrjectAPI = async (projectId,reqBody,reqHeader)=> {
    return await commonAPI("PUT",`${SERVER_URL}/edit-project/${projectId}`,reqBody,reqHeader)
}


//remove projectAPI
export const removeProjectAPI = async (projectId,reqHeader) => {
    return await commonAPI("DELETE",`${SERVER_URL}/remove-project/${projectId}`,{},reqHeader)
}

//update user
export const updateUserAPI = async (reqBody,reqHeader) =>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}