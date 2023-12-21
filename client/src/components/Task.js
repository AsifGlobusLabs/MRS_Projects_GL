import moment from 'moment';
import React, { useEffect, useState } from 'react';
import axios from "axios";


const Task = () => {
  const [assignment, setAssignments] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [progressData, setProgressData] = useState([]);
  const [postData, setPostData] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/assignments/');
        const progressAssignments = response.data.filter(assignment => assignment.status === 'progress');
        setAssignments(progressAssignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchData();
  }, []);



  const handleToDone = async (code) => {
    try {
      const apiUrl = `http://localhost:5000/assignments/${code}/complete`;
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
          // "Authorization": "Bearer your-token",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // The request was successful, handle the response here
        const result = await response.json();
        console.log("Response from API:", result);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error in POST request:", error);
    }
    window.location.reload(false);
  };

  return (
   
    <div className='main-container'>
   
   <h4 className="mb-3">Task List</h4>

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
            <th>Done</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "13px" }}>
          {assignment.map((item) => (
            <tr key={item._id}>
              <td>{item.code}</td>
              <td>{item.employee_id}</td>
              <td>{item.assignment}</td>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>{moment(item.assign_date).format('DD/MM/YYYY')}</td>
              <td>{moment(item.deadline_date).format('DD/MM/YYYY')}</td>
              <td style={{ textAlign: "center" }}>
                {item.status === "progress" ? (
                   <span style={{color:"orange"}}>{item.status}</span>
                ) : (
                  <span style={{color:"red"}}>{item.status}</span>
                 
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {item.status === "progress" ? (
                  <i
                   class="fa-solid fa-circle-notch"
                    style={{
                       cursor:"pointer",
                      color: "orange",
                      fontSize: "20px",
                    }}
                    onClick={() => handleToDone(item.code)}
                  ></i>
                ) : (
                 <></>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
  )
}

export default Task