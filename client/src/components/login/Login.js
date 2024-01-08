import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const LoginForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/user/login",
        {
          employee_id: employeeId,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      const data = await response.data; // Use response.data instead of await response.json()
      console.log("data", data);

      if (response.status === 400 || !data) {
        console.log("not open");
      } else {
        console.log("login successful");
        // Store user data in sessionStorage
        sessionStorage.setItem("userData", JSON.stringify(data.user));
        // Use navigate to navigate based on user role
        if (data.user.role === "admin") {
          navigate("/"); // Navigate to the admin route
        } else {
          navigate("/assignment"); // Navigate to the user route
        }
      }
    } catch (error) {
      setError("Invalid Employee ID or Password");
      console.error(error);
      alert("Invalid Employee ID or Password");
      window.location.reload(false);
    }
  };
  return (
    <div className="main-container p-0">
      <div
        className="register-header p-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "12vh",
        }}
      >
        <h3
          style={{
            marginLeft: "20px",
            background: "white",
            color: "#9e9ea4",
            padding: "6px",
          }}
        >
          Globus
          <span
            style={{
              backgroundColor: "#db0a0a",
              color: "white",
              padding: "5px",
              marginLeft: "5px",
            }}
          >
            Labs
          </span>
        </h3>
        <Link
          to={"/auth/registration"}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <div
            style={{
              color: "white",
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              class="fa-solid fa-address-card mx-1"
              style={{ fontSize: "19px" }}
            ></i>
            <span
              style={{ fontSize: "13px", marginLeft: "1px", fontWeight: 700 }}
            >
              REGISTER
            </span>
          </div>
        </Link>
      </div>

      <div className="login-container">
        
        <div className="login-section">
        <div>
          <h3>SIGN-IN</h3>
        </div>
        <div className="login-section1">
          <div className="login-left">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </div>

          <div className="login-right">
          
            <MDBContainer className="p-3 my-5 d-flex flex-column w-70">
              <label
                for="inputEmail3"
                class="col-sm-4 col-form-label"
                style={{ color: "black", fontSize: "17px", fontWeight: 500 }}
              >
                Employee Id:
              </label>
              <MDBInput
                wrapperClass="mb-4"
                id="form1"
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
              <label
                for="inputPassword3"
                class="col-sm-4 col-form-label"
                style={{ color: "black", fontSize: "17px", fontWeight: 500 }}
              >
                Password:
              </label>
              <MDBInput
                wrapperClass="mb-4"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                class="col-sm-10"
                style={{
                  border: "none",
                  background: "#24a0ed",
                  color: "white",
                  borderRadius: "5px",
                  padding: "5px 0px",
                  marginTop: "10px",
                  width:"100%",
                  
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </MDBContainer>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
