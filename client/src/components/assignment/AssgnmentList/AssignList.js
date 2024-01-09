// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import EditAssignmentModal from "./EditAssignmentModal";

const AssignList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  // const [modalShow, setModalShow] = useState(false);
  // const [selectedUserData, setSelectedUserData] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

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
  // delete btn
  const handleDelete = async (_id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?",
    );

    if (!confirmDelete) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }

    try {
      const apiUrl = `http://localhost:5000/assignments/${_id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from both data and filteredData arrays
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

  // edit assignment List
  const handleEditTask = (_id) => {
    // Your delete logic...

    // Show the edit modal when delete is clicked

    setShowEditModal(true);
    setSelectedItemId(_id);
  };

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

  const userData = JSON.parse(sessionStorage.getItem("userData"));

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
            {userData.role === "admin" ? <th>Edit</th> : <></>}
            {userData.role === "admin" ? <th>Delete</th> : <></>}
            {userData.role === "admin" ? <></> : <th>Add</th>}
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

              {userData.role === "admin" ? (
                <td style={{ textAlign: "center" }}>
                  <i
                    // onClick={() => handleEdit()}
                    className="fa-solid fa-pen-to-square"
                    style={{
                      cursor: "pointer",
                      color: "#045e83",
                      fontSize: "16px",
                    }}
                    onClick={() => handleEditTask(item._id)}
                  ></i>
                </td>
              ) : (
                <></>
              )}

              {/* ----delete---   */}
              {userData.role === "admin" ? (
                <td style={{ textAlign: "center" }}>
                  <i
                    className="fa-solid fa-trash-can"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "16px",
                    }}
                    onClick={() => handleDelete(item._id)}
                  ></i>
                </td>
              ) : (
                <> </>
              )}

              {userData.role === "user" ? (
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
              ) : (
                <></>
              )}
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Assignment Modal */}
      <EditAssignmentModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        itemId={selectedItemId}
      />

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
    </div>
  );
};

export default AssignList;
