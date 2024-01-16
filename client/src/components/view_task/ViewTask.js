import moment from 'moment';
import React, { useEffect, useState } from 'react';



const ViewTask = () => {
  const [data, setData] = useState([]);


  const userData = JSON.parse(sessionStorage.getItem("userData"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:5000/assignments/status/completed";
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
        console.log(result,"data");
        setData(result);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchData();
  }, []);



  

  return (
   
    <div className='main-container'>
   
   <h4 className="mb-3">View Task List</h4>
   {userData.role==="user" ? (
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
              <td style={{color:"green"}}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        ):(<></>)}
    </div>
  
  )
}

export default ViewTask