// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
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

const AssignList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  // const [modalShow, setModalShow] = useState(false);
  // const [selectedUserData, setSelectedUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:5000/assignments/";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();
        // console.log(result, "hello");
        //reverse data in table
        const reversedData = result.reverse();
        setData(reversedData);
        setFilteredData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // ------------delete btn------------
  const handleDelete = async (_id) => {
    try {
      const apiUrl = `http://localhost:5000/assignments/${_id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((item) => item._id !== _id));
        setFilteredData((prevData) =>
          prevData.filter((item) => item._id !== _id),
        );
      } else {
        console.error("Error deleting item:", response.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // -----------filter data-------

  // const filterData = async (employee_id) => {
  //   try {
  //     const apiUrl = `http://localhost:5000/assignments/${employee_id}`;
  //     const response = await fetch(apiUrl);
  //     const result = await response.json();
  //     // console.log( result, "test2")
  //     if (Array.isArray(result)) {
  //       setFilteredData(result);
  //       // console.log( result, "test1")
  //     } else {
  //       setFilteredData([result]);
  //       // console.log( result, "test3")
  //     }
  //   } catch (error) {
  //     console.error("Error fetching filtered data:", error);
  //   }
  // };


  // ------------add to task-----------
  const handleAddToTask = async (task_no) => {
    try {
      const apiUrl = `http://localhost:5000/assignments/${task_no}/progress`;
      const response = await fetch(apiUrl, {
        method: "PATCH", // or 'PUT' depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        // You can add a request body if needed
        // body: JSON.stringify({ key: 'value' }),
      });

      if (response.ok) {
        // Handle success, maybe update the UI or perform additional actions
        console.log("Task added successfully");
        alert("Data Add to Task");
        navigate("/task");
      } else {
        console.error("Error adding task:", response.status);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  // const renderAddIcon = (item) => {
  //   if (item.status === "pending") {
  //     console.log(item,"status");
  //     if ( item.role === "user"){
  //       console.log(item.role, "user");
  //     return (
  //       <i
  //         className="fa-solid fa-square-plus"
  //         style={{
  //           cursor: "pointer",
  //           color: "#0084ff",
  //           fontSize: "20px",
  //         }}
  //         onClick={() => handleAddToTask(item.code)}
  //       ></i>
  //     )} else {
  //       return(
  //         <i
  //         className="fa-solid fa-hourglass-half"
  //         style={{
  //           color: "orange",
  //           fontSize: "20px",
  //         }}
  //       ></i>
  //       )
  //      }
  //   } 

  //  else if (item.status === "progress") {
  //     return (
  //       <i
  //         className="fa-solid fa-spinner"
  //         style={{
  //           color: "orange",
  //           fontSize: "20px",
  //         }}
  //       ></i>
  //     );
  //   } else {
  //     return (
  //       <i
  //         className="fa-solid fa-circle-check"
  //         style={{
  //           color: "green",
  //           fontSize: "20px",
  //         }}
  //       ></i>
  //     );
  //   }
  // };

  // const handleEdit= () => {
  //   setSelectedUserData();
  //   setModalShow(true);
  // };

  return (
    <div>
 
      <table className="table table-striped">
        <thead style={{ fontSize: "15px" }}>
          <tr>
            <th>Task No.</th>
            {/* <th>Employee Id</th> */}
            <th>Task Details</th>
            <th>Task given by</th>
            <th>Assign To</th>
            <th>Assign Date</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Add</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "13px" }}>
          {currentItems.map((item) => (
            <tr key={item._id}>
              <td>{item.task_no}</td>
              {/* <td>{item.employee_id}</td> */}
              <td className="overflow-cell">{item.task_details}</td>
              <td>{item.task_given_by}</td>
              <td>{item.employee_id}</td>
              <td>{moment(item.assign_date).format("DD/MM/YYYY")}</td>
              <td>{moment(item.deadline_date).format("DD/MM/YYYY")}</td>
              {/* <td>{item.status}</td> */}

              <td>
                {item.status === "Progress" ? (
                  <span style={{ color: "orange" }}>{item.status}</span>
                ) : item.status === "Pending" ? (
                  <span style={{ color: "red" }}>{item.status}</span>
                ) : (
                  <span style={{ color: "green" }}>{item.status}</span>
                )}
              </td>

  {/* --------edit-------- */}
              <td style={{ textAlign: "center" }}>
                <i
                // onClick={() => handleEdit()}
                  className="fa-solid fa-pen-to-square"
                  style={{
                    cursor: "pointer",
                    color: "#045e83",
                    fontSize: "16px",
                  }}
                ></i>
              </td>

  {/* -----------delete---------- */}
              <td style={{ textAlign: "center" }}>
                <i
                  className="fa-solid fa-trash-can"
                  style={{ cursor: "pointer", color: "red", fontSize: "16px" }}
                  onClick={() => handleDelete(item._id)}
                ></i>
              </td>

              <td style={{ textAlign: "center" }}>
                {item.status === "Pending" ? (
                  <i
                    className="fa-solid fa-square-plus"
                    style={{
                      cursor: "pointer",
                      color: "#0084ff",
                      fontSize: "20px",
                    }}
                    onClick={() => handleAddToTask(item.task_no)}
                  ></i>
                ) : item.status === "Progress" ? (
                  <i
                    className="fa-solid fa-spinner"
                    style={{
                      color: "orange",
                      fontSize: "20px",
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-circle-check"
                    style={{
                      color: "green",
                      fontSize: "20px",
                    }}
                  ></i>
                )}
              </td>


              {/* <td style={{ textAlign: "center" }}> {renderAddIcon(item)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ),
        )}
      </ul>
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedUserData={selectedUserData}
      /> */}
    </div>
  );
};

export default AssignList;
