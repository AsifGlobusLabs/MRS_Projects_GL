import React from 'react';
import usericon from "./userIcon.webp";
import {  useNavigate } from 'react-router-dom';


const Profile = () => {
  const navigate = useNavigate();


  const handleLogout = async (e) =>{
    e.preventDefault();

    try{
      const apiUrl = 'http://localhost:5000/user/logout';
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include"
      });
   
      
    if (response.ok) {
      navigate('/auth/login');
      console.log("logout successful");
    }
       else {
       console.log("logout failed");
      }
    
  } catch (error) {
    console.error(error);
  }

    
  }



  return (

<div class="accordion" id="accordionExample" >

<div class="accordion-item "  style={{border:"none", backgroundColor:"#c70101f1"}}>
  <h2 class="accordion-header">
    <button class="collapsed profile-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
    style={{border:"none", backgroundColor:"#c70101f1"}}
    >
    <a
    href="/"
    style={{ textDecoration: "none", color: "#fff" }}
    className="sidebar-position"
  >
    <img
      src={usericon}
      alt="usericon"
      style={{ height: "45px", marginRight: "5px" }}
    />
    <div className="p-1 sidebar-position">
      <span>
        <p style={{ fontSize: "18px" }} className="m-0">
          ASIF ZIA
        </p>
        <p
          style={{ fontSize: "11px", letterSpacing: ".5px" }}
          className="m-0"
        >
          FrontEnd Developer
        </p>
      </span>
    </div>
  </a>
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample" >
    <div class="accordion-body" style={{ backgroundColor:"#c70101f1",  textAlign:"center",  display:"flex", alignItems:"center", justifyContent:"center"}}>
      <button 
      style={{border:"none",  borderRadius:"3px", padding:"2px 7px"}}
       onClick={handleLogout}>logout</button>
    </div>
  </div>
</div>

</div>
  )
}

export default Profile