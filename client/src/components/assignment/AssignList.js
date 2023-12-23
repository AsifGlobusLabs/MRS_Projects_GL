// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const AssignList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:5000/assignments/";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include"
        });
     
       const result = await response.json();
       console.log(result,"hello")
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
  const handleAddToTask = async (code) => {
    try {
      const apiUrl = `http://localhost:5000/assignments/${code}/progress`;
      const response = await fetch(apiUrl, {
        method: "PATCH", // or 'PUT' depending on your API
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div>
      <h4 className="mb-3">Assignment List</h4>

      {/* <button onClick={() => filterData("")}>All Data</button>
      <button onClick={() => filterData("GL001")}>Employee ID GL001</button>
      <button onClick={() => filterData("GL002")}>Employee ID GL002</button> */}

      <table className="table table-striped">
        <thead style={{ fontSize: "15px" }}>
          <tr>
            <th>code</th>
            <th>Employee id</th>
            <th>Assignment</th>
            <th>from</th>
            <th>to</th>
            <th>assign_date</th>
            <th>deadline_date</th>
            <th>Status</th>
            <th>edit</th>
            <th>delete</th>
            <th>Add</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "13px" }}>
          {currentItems.map((item) => (
            <tr key={item._id} >
              <td>{item.code}</td>
              <td>{item.employee_id}</td>
              <td>{item.assignment}</td>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{moment(item.assign_date).format("DD/MM/YYYY")}</td>
              <td>{moment(item.deadline_date).format("DD/MM/YYYY")}</td>
              {/* <td>{item.status}</td> */}

              <td style={{ textAlign: "center" }}>
                {item.status === "progress" ? (
                  <span style={{ color: "orange" }}>{item.status}</span>
                ) : item.status === "pending" ? (
                  <span style={{ color: "red" }}>{item.status}</span>
                ) : (
                  <span style={{ color: "green" }}>{item.status}</span>
                )}
              </td>

              <td style={{ textAlign: "center" }}>
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{
                    cursor: "pointer",
                    color: "#045e83",
                    fontSize: "16px",
                  }}
                ></i>
              </td>
              <td style={{ textAlign: "center" }}>
                <i
                  className="fa-solid fa-trash-can"
                  style={{ cursor: "pointer", color: "red", fontSize: "16px" }}
                  onClick={() => handleDelete(item._id)}
                ></i>
              </td>

              <td style={{ textAlign: "center" }}>
                {item.status === "pending" ? (

                  <i
                    className="fa-solid fa-square-plus"
                    style={{
                      cursor: "pointer",
                      color: "#0084ff",
                      fontSize: "20px",
                    }}
                    onClick={() => handleAddToTask(item.code)}
                  ></i>
                ) : item.status === "progress" ?(
                  <i
                    class="fa-solid fa-spinner"
                    style={{
                      color: "orange",
                      fontSize: "20px",
                    }}
                  ></i>
                ) :  (
                  <i
                   class="fa-solid fa-circle-check"
                    style={{
                      color: "green",
                      fontSize: "20px",

                    }}
                  ></i>
                )}
              </td>

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
    </div>
  );
};

export default AssignList;









