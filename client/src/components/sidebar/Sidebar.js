import React, { useState } from "react";


import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsFillGearFill,
  BsArrowRightSquareFill 
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Profile from "../profile/Profile";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  // const handleTrigger = () => setIsOpen(!isOpen);

  return (
    <div
      id="sidebar"
      // className={openSidebarToggle ? "sidebar-responsive" : ""}
      className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
    >
      <div className="trigger">
        <FontAwesomeIcon icon={isOpen ? "" : faTimes} />
      </div>

      <Link
        to={"/"}
        style={{ textDecoration: "none", color: "#fff" }}
      >
         <Profile/>
      </Link>
     

      {/* <a
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
            <p style={{ fontSize: "16px" }} className="m-0">
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
      </a> */}

      {/* <ul className="sidebar-list">
        <Link
          to={"/assignment"}
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <li className="sidebar-list-item">
            <BsGrid1X2Fill className="icon" /> Assignment
          </li>
        </Link>

        <Link to={"/task"} style={{ textDecoration: "none", color: "#fff" }}>
          <li className="sidebar-list-item">
            <BsFillArchiveFill className="icon" /> Task
          </li>
        </Link>

        <Link to={"/team"} style={{ textDecoration: "none", color: "#fff" }}>
          <li className="sidebar-list-item">
            <BsPeopleFill className="icon" /> Team
          </li>
        </Link>
       
         <li className="sidebar-list-item">
          <a href="/">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="/">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>   */}

      <Link
        to={"/assignment"}
        style={{ textDecoration: "none", color: "#fff" }}
      >
        <div className="sidebar-position">
          <BsGrid1X2Fill className="icon" />
          <span>Assignment</span>
        </div>
      </Link>

      <Link to={"/task"} style={{ textDecoration: "none", color: "#fff" }}>
        <div className="sidebar-position">
          <BsFillArchiveFill className="icon" />
          <span>Task</span>
        </div>
      </Link>

      <Link to={"/team"} style={{ textDecoration: "none", color: "#fff" }}>
        <div className="sidebar-position">
          <BsPeopleFill className="icon" />
          <span>Team</span>
        </div>
      </Link>

      <div className="sidebar-position">
        <BsFillGearFill className="icon" />
        <span>Setting</span>
      </div>
    </div>
  );
}

export default Sidebar;
