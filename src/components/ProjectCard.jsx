import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SERVER_URL } from '../services/serverUrl';



function ProjectCard({displayData}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <Card onClick={handleShow} className='shadow mb-5' style={{ width: '18rem' }}>
      <Card.Img height={'200px'} variant="top" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt={displayData?.title} />
      <Card.Body>
        <Card.Title>{displayData?.title}</Card.Title>
      </Card.Body>
    </Card>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <img className="img-fluid" src={`${SERVER_URL}/uploads/${displayData?.projectImage}`} alt={displayData?.title} ></img>
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h5><span className='fw-bolder'>Languages used</span>:{displayData?.language}</h5>
              <p style={{textAlign:'justify'}}> <span className='fw-bolder'>OverView : </span>{displayData?.overview}</p>
            </div>
            
            <div className="float-start mt-2">
              <a href={displayData?.github} target='_blank' className='btn btn-info' >
              <i className="fa-brands fa-github"></i>
              </a>
              <a href={displayData?.website} target='_blank' className='btn btn-info ms-2' ><i className="fa-solid fa-link"></i>
              </a>
            </div>

          </div>
          <hr />

        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  )
}

export default ProjectCard