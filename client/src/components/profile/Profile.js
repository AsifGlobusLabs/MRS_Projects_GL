import React from 'react';
import usericon from "./userIcon.webp";


const Profile = () => {
  return (
    <div><a
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
  </a></div>
  )
}

export default Profile