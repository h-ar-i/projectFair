import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import View from '../components/View'
import Profile from '../components/Porfile'

function Dashboard() {
  const [displayName,setDisplayName] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("existinguser")){
      const {username} = JSON.parse(sessionStorage.getItem("existinguser"))
      setDisplayName(username)
    }else{
      setDisplayName("")
    }
  },[])

  return (
    <>
    <Header insideDashboard={true}/>
    <div style={{marginTop:'100px'}} className='container-fluid p-5'>
     <h1>Welcome  <span style={{text:'warning'}}>{displayName}</span></h1>
     <div className="row mt-5">
      <div className="col-lg-8">
      <View/>
      </div>
      <div className="col-lg-4">
       <Profile/>
      </div>

     </div>
    </div>
    </>
  )
}

export default Dashboard