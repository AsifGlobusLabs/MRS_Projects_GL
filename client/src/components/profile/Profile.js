import React from "react";
import usericon from "./userIcon.webp";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);

  if (!userData) {
    return <span>Loading.....</span>; // Return the loading message
  }

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "http://localhost:5000/user/logout";
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
          // Clear user data from sessionStorage
          sessionStorage.removeItem('userData');
        navigate("/auth/login");
        alert("logout successful");
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="accordion" id="accordionExample">
      <div
        class="accordion-item "
        style={{ border: "none", backgroundColor: "#88AB8E" }}
      >
        <h2 class="accordion-header">
          <button
            class="collapsed profile-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
            style={{ border: "none", backgroundColor: "#88AB8E" }}
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
                    {userData.first_name} {userData.last_name}
                  </p>
                  <p
                    style={{ fontSize: "11px", letterSpacing: ".5px" }}
                    className="m-0"
                  >
                    {userData.position}
                  </p>
                </span>
              </div>
            </a>
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          data-bs-parent="#accordionExample"
        >
          <div
            class="accordion-body"
            style={{
              backgroundColor: "#88AB8E",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                border: "none",
                borderRadius: "3px",
                padding: "2px 7px",
              }}
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
