
import React, { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import AssignList from "./AssignList";

const AssignmentModal = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    code: "",
    employee_id: "",
    assignment: "",
    from: "",
    to: "",
    assign_date: "",
    deadline_date: "",
  });


  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  
  useEffect(() => {
  const fetchData = async () => {
      try {
        const latestCodeNumber = await fetchLatestCodeNumber(
          "http://localhost:5000/assignments/latest-assignment-code"
        );
        const newCodeNumber = incrementCodeNumber(latestCodeNumber);
        console.log(newCodeNumber)
        setFormData((prevData) => ({ ...prevData, code: newCodeNumber }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const fetchLatestCodeNumber = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.code;
    } catch (error) {
      console.error("Error fetching latest code number:", error);
      throw error;
    }
  };

  const incrementCodeNumber = (currentCodeNumber) => {
    const currentCode = parseInt(currentCodeNumber.slice(1), 10);
    const newCode = currentCode + 1;
    return `C${newCode.toString().padStart(3, "0")}`;
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const apiUrl = "http://localhost:5000/assignments/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
      setFormData({
        code: "",
        employee_id: "",
        assignment: "",
        from: "",
        to: "",
        assign_date: "",
        deadline_date: "",
        
      });
   }
    window.location.reload(false);
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" size="xl">
      <Modal.Header closeButton>

        <Modal.Title id="contained-modal-title-vcenter">Create Assignment</Modal.Title>

      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="exampleInputEmail1" className="form-label">

                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                 //   readOnly
                  />
                </div>
                <div className="mb-3 col">
                  <label className="form-label">Employee ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Employee ID..."
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mb-3 col">
                <label htmlFor="assignment" className="form-label">
                  Give Assignment below:
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="assignment"
                  placeholder="Write Something...."
                  name="assignment"
                  value={formData.assignment}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row">
                <div className="mb-3 col">
                  <label htmlFor="from" className="form-label">
                    From:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                  >
                    <option selected>Please Select</option>
                    <option>Azhar sir</option>
                    <option>Mitesh sir</option>
                  </select>
                </div>

                <div className="mb-3 col">
                  <label htmlFor="to" className="form-label">
                    To:
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                  >
                    <option selected>Please Select</option>
                    <option>Mitesh sir</option>
                    <option>Asif zia</option>
                    <option>Taqueer</option>
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
              
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
          {response && " "}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Assignment = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="main-container">
      <div className="mt-2">
        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{
            width: "17%",
            height: "50px",
            margin: "10px",
            borderRadius: "10px",
            border: "none",
            background:"#045e83"
          }}
        >
          Create Assignment
        </Button>
        <AssignmentModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
      <div className="container mt-3">
        <AssignList />
      </div>
    </div>
  );
};

export default Assignment;
