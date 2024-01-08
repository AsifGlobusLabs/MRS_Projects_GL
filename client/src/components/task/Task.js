import moment from 'moment';
import React, { useEffect, useState } from 'react';



const Task = () => {
 const [postData, setPostData] = useState();
  const [data, setData] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:5000/assignments/status/progress";
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include"
        });
     
       

        // const progressAssignments = response.data.filter(assignment => assignment.status === 'progress');
        // setAssignments(progressAssignments);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchData();
  }, []);



  const handleToDone = async (task_no) => {
    try {
      const apiUrl = `http://localhost:5000/assignments/${task_no}/completed`;
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
   
   <h4 className="mb-3">My Task List</h4>

      <table className="table table-striped">
        <thead style={{ fontSize: "15px" }}>
          <tr>
            <th>Code</th>
            {/* <th>Employee Id</th> */}
            <th>Task Details</th>
            <th>Task given by</th>
            <th>Assign To</th>
            <th>Assign Date</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Done</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "13px" }}>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.task_no}</td>
              {/* <td>{item.employee_id}</td> */}
              <td>{item.task_details}</td>
              <td>{item.task_given_by}</td>
              <td>{item.employee_id}</td>
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
                {item.status === "Progress" ? (
                  <i
                   class="fa-solid fa-circle-notch"
                    style={{
                       cursor:"pointer",
                      color: "orange",
                      fontSize: "20px",
                    }}
                    onClick={() => handleToDone(item.task_no)}
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