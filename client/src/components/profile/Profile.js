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
              style={{ textDecoration: "none", background:"#B6C4B6" }}
              className="sidebar-position"
            >
              <img
                src={usericon}
                alt="usericon"
                style={{ height: "45px", marginRight: "2px" }}
              />
              <div className="p-1 sidebar-position1">
                <span>
                  <p style={{ fontSize: "15px", color:"#163020" }} className="m-0">
                    {userData.first_name} {userData.last_name}
                  </p>
                  <p
                    style={{ fontSize: "10px", letterSpacing: ".5px", color:"#163020" }}
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

















// import Modal from 'react-bootstrap/Modal';
// import { Container } from "react-bootstrap";


// function MyVerticallyCenteredModal({ show, onHide }) {
  
//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       aria-labelledby="contained-modal-title-vcenter"
//       size="xl"
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Edit Assignment
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body className="grid-example">
//         <Container>
//           <form >
//             <div className="container">
//               <div className="row">
//                 <div className="mb-3 col-2">
//                   <label htmlFor="task_no" className="form-label">
//                     Task Number:
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter Task No."
//                     name="task_no"
                    
//                   />
//                 </div>
              
//               </div>
//               <div className="mb-3 col">
//                 <label htmlFor="task_details" className="form-label">
//                   Task Details:
//                 </label>
//                 <textarea
//                   type="text"
//                   className="form-control"
//                   id="assignment"
//                   placeholder="Write Something...."
//                   name="task_details"
                
//                 />
//               </div>

//               <div className="row">
//                 <div className="mb-3 col">
//                   <label htmlFor="task_given_by" className="form-label">
//                     From:
//                   </label>
//                   <input
//                     className="form-control"
//                     aria-label="Default select example"
//                     name="task_given_by"
                
//                   />
//              </div>

//                 <div className="mb-3 col">
//                   <label htmlFor="employee_id" className="form-label">
//                     Assign To:
//                   </label>
                 
//                   <select
//                     className="form-select"
//                     aria-label="Default select example"
//                     name="employee_id"
                 
//                   >
//                      <option selected>Please Select</option>
//                     {/* Render the customer details options */}
               
//                   </select>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="mb-3 col">
//                   <label htmlFor="assign_date" className="form-label">
//                     Given Date:
//                   </label>

//                   <input
//                     type="date"
//                     className="form-control"
//                     name="assign_date"
                  
//                   />
//                 </div>
//                 <div className="mb-3 col">
//                   <label htmlFor="deadline_date" className="form-label">
//                     Deadline date:
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     name="deadline_date"
                   
//                   />
//                 </div>
//               </div>
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
             
//                 >
//             submit
//                 </button>
//               </div>
//             </div>
//           </form>
       
//         </Container>
//       </Modal.Body>
//     </Modal>
//   );
// }