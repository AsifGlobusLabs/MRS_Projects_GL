import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import userpic from "./userpic.jpg";


const Team = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/registrations');
        const result = await response.json();
        setData(result);
        console.log(result,"hello")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="main-container">
      <h5 className="m-4">TEAM MEMBERS</h5>
      <CardGroup className="m-4 cardgroup" >
      <div className="card-container">
      {data.map((item) => (
        
        <Card  className="team-card" key={item._id}>
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
          <Card.Text style={{fontSize:".9rem"}}>Employee Id: {item.employee_id}</Card.Text>
       </Card.Footer>
        </Card>
        
       ))}
       </div>
      </CardGroup>
    </div>
  );
};

export default Team;
