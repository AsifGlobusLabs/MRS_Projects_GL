
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import userpic from "./userpic.jpg";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function MyVerticallyCenteredModal({ show, onHide, selectedUserData }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Employee Id: {selectedUserData ? selectedUserData.employee_id : ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{textAlign:"center"}}>
      <Card.Img
            variant="top"
            src={userpic}
            style={{borderRadius:"50%"}}
            className="team-modal-pic"
          />
          </Modal.Body>
      <Modal.Body style={{textAlign:"center", marginBottom:"10px"}}>
        <h4 style={{textAlign:"center", marginBottom:"10px", fontWeight:700, color:"#850000"}}>{selectedUserData ? `${selectedUserData.first_name} ${selectedUserData.last_name}` : ""}</h4>
        <p>
          Position: {selectedUserData ? selectedUserData.position : ""}
        </p>
        <p>
          Email: {selectedUserData ? selectedUserData.email : ""}
        </p>
        <p>
          Phone: {selectedUserData ? selectedUserData.phone_number : ""}
        </p>
        <p>
          City: {selectedUserData ? selectedUserData.city : ""}
        </p>
      </Modal.Body>
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>
  );
}



const Team = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/registrations');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (userData) => {
    setSelectedUserData(userData);
    setModalShow(true);
  };

  return (
    <div className="main-container">
      <h5 className="m-4">TEAM MEMBERS</h5>
      <CardGroup className="m-4 cardgroup" variant="primary">
      <div className="card-container">
        {data.map((item) => (
          <Card
            className="team-card"
            key={item._id}
            onClick={() => handleCardClick(item)}
          >
            <Card.Img
            variant="top"
            src={userpic}
            style={{borderRadius:"50%"}}
          />
          <Card.Body>
            <Card.Title style={{textAlign:"center"}}>{item.first_name} {item.last_name}</Card.Title>
            <Card.Text style={{fontSize:".8rem", color:"grey"}}>Position: {item.position}</Card.Text>
            <Card.Text style={{fontSize:".7rem", color:"grey"}}>Email: {item.email}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <Card.Text style={{fontSize:".9rem", textAlign:"center"}}>Employee Id: {item.employee_id}</Card.Text>
       </Card.Footer>
          </Card>
        ))}
        </div>
      </CardGroup>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedUserData={selectedUserData}
      />
    </div>
  );
};

export default Team;
