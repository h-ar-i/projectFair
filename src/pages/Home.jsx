import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import a1 from '../assets/admin.jpeg'
import ProjectCard from '../components/ProjectCard'
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
// import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI.JS';


function Home() {
  const [homeProjects, setHomeProjects] = useState([])
  const navigate = useNavigate()
  const [loginstatus, setLoginStatus] = useState(false)
  console.log(homeProjects);
  useEffect(() => {
    getHomeProjects()
    if (sessionStorage.getItem("token")) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  const handleProjects = () => {
    if (loginstatus) {
      navigate('/projects')
    } else {
      toast.warning("please login to get the full access to our projects")
    }
  }

  const getHomeProjects = async () => {
    try {
      const result = await getHomeProjectsAPI()
      console.log(result);
      if (result.status == 200) {
        setHomeProjects(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* <Header/> */}
      {/* landing */}
      <div style={{ minHeight: '100vh', backgroundColor: '' }} className="w-100 d-flex justify-content-center align-items-center   border-light ">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 style={{ fontSize: '80px' }}><i className="fa-brands fa-docker fa-bounce me-3 "></i>PROJECT FAIR</h1>
              <p style={{ textAlign: 'justify' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi, praesentium. Id illum eligendi, assumenda ad tempore omnis iure odit iste minima eius sit, repellat quasi totam corporis error. Dolor, maiores?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe ea fuga quasi, atque totam nobis officiis veniam quam natus facere voluptate laboriosam cupiditate blanditiis repellat a nemo id tenetur magni.
              </p>
              {
                loginstatus ?
                  <Link to={'/dashboard'} className='btn btn-warning border border-danger'> Manage your projects<i className="fa-solid fa-arrow-right fa-beat ms-3"></i></Link> :
                  <Link to={'/login'} className='btn btn-warning border border-danger'> Start To Explore<i className="fa-solid fa-arrow-right fa-beat ms-3"></i></Link>
              }
            </div>
            <div className="col-lg-5 " >
              <img style={{ width: '100%' }} src={a1} alt="" />
            </div>

          </div>
        </div>
      </div>


      {/*  floating cards project */}
      <div className="mt-5 text-center">
        <h1 className=' mb-5'>Explore Our Projects</h1>
        <marquee >
          <div className="d-flex">
            {
              homeProjects?.length > 0 &&
              homeProjects?.map(project => (
                <div key={project} className="me-5">
                  <ProjectCard displayData={project} />
                </div>
              ))
            }

          </div>
        </marquee>
        <button onClick={handleProjects} className=' btn btn-link mt-3'>Click here to view more projects....<i class="fa-solid fa-location-arrow"></i></button>
      </div>

      {/* testimony */}
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5 flex-column" >
        <h1>our Testimonials</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
          <Card style={{ width: '18rem' }}>
            <Card.Img style={{ width: '60px', height: '60px' }} className='rounded-circle img-fluid ms-2' variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAbRXrkIXcVV1Gafb0s7klcLrFRaKRrZ50dxPNvmUYg&s" />
            <Card.Body >
              <Card.Title className='d-flex justify-content-center align-items-center felx-column'>
                <span>max swiss</span>
              </Card.Title>
              <Card.Text>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star"></i>
                <br />
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          {/* c2 */}
          <Card style={{ width: '18rem' }} className='ms-5'>
            <Card.Img style={{ width: '60px', height: '60px' }} className='rounded-circle img-fluid ms-2' variant="top" src="https://cdn-icons-png.flaticon.com/512/219/219969.png" />
            <Card.Body>
              <Card.Title>daisy mark</Card.Title>
              <Card.Text>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <br />
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          {/* c3 */}
          <Card style={{ width: '18rem' }} className='ms-5'>
            <Card.Img style={{ width: '60px', height: '60px' }} className='rounded-circle img-fluid ms-2' variant="top" src="https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg" />
            <Card.Body>
              <Card.Title>Benjamine frank</Card.Title>
              <Card.Text>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning "></i>
                <br />
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </>
  )
}

export default Home