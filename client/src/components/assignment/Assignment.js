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
    assign_date: new Date().toISOString().split("T")[0],
    deadline_date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/registrations', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include"
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestCodeNumber = await fetchLatestCodeNumber(
          "http://localhost:5000/assignments/latest-assignment-code",
        );
        const newCodeNumber = incrementCodeNumber(latestCodeNumber);
        console.log(newCodeNumber);
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
    return `T${newCode.toString().padStart(3, "0")}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Assignment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="mb-3 col-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Task Number:
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
                {/* <div className="mb-3 col">
                  <label className="form-label">employee_id</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Assign To..."
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleInputChange}
                  />
                </div> */}
              </div>
              <div className="mb-3 col">
                <label htmlFor="assignment" className="form-label">
                  Task Details:
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
                    Assign To:
                  </label>

                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                  >
                    <option selected>Please Select</option>
                    {data.map((item) => (
                      <option key={item._id}  >
                        {item.employee_id} - {item.first_name} {item.last_name}
                      </option>
                   
                    ))}
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
                    name="date"
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
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
          {response && " "}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const Assignment = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="main-container">
      <div
        className="container mt-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h4 className="mb-3" style={{ color: "#1B4242" }}>
          Assignment List
        </h4>

        <Button
          variant="primary"
          onClick={() => setModalShow(true)}
          style={{
            width: "17%",
            height: "50px",
            margin: "10px",
            borderRadius: "10px",
            border: "none",
            background: "#1B4242",
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
