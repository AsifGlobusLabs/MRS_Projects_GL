import moment from 'moment';
import React, { useEffect, useState } from 'react';
import axios from "axios";


const Task = () => {
  const [assignment, setAssignments] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [progressData, setProgressData] = useState([]);



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


  return (
   
    <div className='main-container'>
   
      

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
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
  )
}

export default Task