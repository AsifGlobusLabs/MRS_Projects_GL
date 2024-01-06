import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap components
import axios from "axios";

const EditAssignmentModal = ({ show, onClose, itemId }) => {
  const [formData, setFormData] = useState({
    task_no: "",
    // employee_id: "",
    task_details: "",
    task_given_by: "",
    employee_id: "",
    assign_date: new Date().toISOString().split("T")[0],
    deadline_date: "",
  });
  const [employee_id, setemployee_id] = useState([]);

  console.log(formData, "ekjdh")
 

  useEffect(() => {
    if (itemId) {
      axios
        .get(`http://localhost:5000/assignments/${itemId}`)
        .then((response) => {
          const formattedData = {
            ...response.data,
            assign_date: new Date(response.data.assign_date).toISOString().split("T")[0],
            deadline_date: new Date(response.data.deadline_date).toISOString().split("T")[0],
          };
          setFormData(formattedData);
        })
        .catch((error) =>
          console.error("Error fetching assignment data:", error),
        );
    }
  }, [itemId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    async function fetchCustomerCodes() {
      try {
        const response = await fetch(
          "http://localhost:5000/user/registrations",
          {
            headers: {
              "Content-Type": "application/json",
              // Add any other headers as needed
            },
            credentials: "include",
          },
        );

        if (response.ok) {
          const customersData = await response.json();

          const codesAndNames = customersData.map((employee) => ({
            customerCode: employee.employee_id,
            customerName: employee.first_name,
          }));

          // Uncomment the following line if you want to set the state with codesAndNames
          setemployee_id(codesAndNames);
        } else {
          console.error("Error fetching customer data");
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }

    fetchCustomerCodes();
  }, []); // The empty dependency array ensures that this effect runs only once on component mount

  const employeeDetails = employee_id.map((customer) => (
    <option key={customer.customerCode} value={customer.customerCode}>
      {`${customer.customerCode} - ${customer.customerName}`}
    </option>
  ));



  const handleEdit = () => {
    axios
      .patch(`http://localhost:5000/assignments/${itemId}`, formData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
        alert("Data updated successfully");
        // location.reload();
        onClose();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        alert("Error updating data");
      });
      window.location.reload(false);
  };

  return (
    <Modal show={show} onHide={onClose}    aria-labelledby="contained-modal-title-vcenter"
    size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Edit Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="mb-3 col-2">
              <label htmlFor="task_no" className="form-label">
                Task Number:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Task No."
                name="task_no"
                value={formData.task_no}
                onChange={handleInputChange}
                // readOnly
              />
            </div>
          </div>
          <div className="mb-3 col">
            <label htmlFor="task_details" className="form-label">
              Task Details:
            </label>
            <textarea
              type="text"
              className="form-control"
              id="assignment"
              placeholder="Write Something...."
              name="task_details"
              value={formData.task_details}
              onChange={handleInputChange}
            />
          </div>

          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="task_given_by" className="form-label">
                From:
              </label>
              <input
                className="form-control"
                aria-label="Default select example"
                name="task_given_by"
                // value={userData.first_name}
                value={formData.task_given_by}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3 col">
              <label htmlFor="employee_id" className="form-label">
                Assign To:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleInputChange}
              >
                 <option selected>Please Select</option>
                    {/* Render the customer details options */}
                    {employeeDetails}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="assign_date" className="form-label">
                Given Date:
              </label>

              <input
                type="date"
                className="form-control"
                name="assign_date"
                value={formData.assign_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3 col">
              <label htmlFor="deadline_date" className="form-label">
                Deadline date:
              </label>
              <input
                type="date"
                className="form-control"
                name="deadline_date"
                value={formData.deadline_date}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAssignmentModal;
