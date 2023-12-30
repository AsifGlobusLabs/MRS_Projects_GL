import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [validated, setValidated] = useState(false);

  // const [formData, setFormData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   employee_id: "",
  //   position: "",
  //   email: "",
  //   phone_number: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   password: "",
  //   confirm_password:""
  // });

  
  // const [isLoading, setIsLoading] = useState(false);
  // const [response, setResponse] = useState(null);

  // const handleInputChange = (e) => {
  //   setFormData(e.target.value)
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const apiUrl = "http://localhost:5000/registration/";
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
  //     setResponse(data);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   } finally {
  //     setIsLoading(false);
  //     setFormData({
  //       first_name: "",
  //       last_name: "",
  //       employee_id: "",
  //       position: "",
  //       email: "",
  //       phone_number: "",
  //       address: "",
  //       city: "",
  //       state: "",
  //       password: "",
  //       confirm_password:""
  //     });
  //   }
  // };

  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [employee_id, setEmployee_id] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set loading state to true while waiting for the API response
    setIsLoading(true);

    try {
      const apiUrl = 'http://localhost:5000/user/register'; // Replace with your actual API endpoint
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({first_name, last_name, address, city, state, phone_number,  email, position, employee_id, password, confirm_password  }),
      });

      // Assuming your API returns JSON, you can parse it like this
      const data = await response.json();

      // Update state with the API response
      setResponse(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      // Set loading state back to false, whether the request was successful or not
      setIsLoading(false);
      setFirst_name('');
      setLast_name('');
      setAddress('');
      setCity('');
      setState('');
      setPhone_number('');
      setEmployee_id('');
      setEmail('');
      setPosition('');
      setPassword('');
      setConfirm_password('');
     
      alert("registered successfully")
    }
  };

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

 
  return (
    <div className="main-container p-0">
      <div className="register-header p-2" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <h3 style={{marginLeft:"20px", background:"white", color:"#9e9ea4", padding:"6px"}}>
            Globus
            <span
              style={{
                backgroundColor: "#db0a0a",
                color: "white",
                padding: "5px",
                marginLeft:"5px"
              }}
            >
              Labs
            </span>
          </h3>
          <Link
          to={"/auth/login"}
          target="_blank"
          style={{
            textDecoration: "none"}}>
           <div
            style={{
              color: "white",
              marginRight: "15px",
              display: "flex",
              alignItems:"center",
            }}
          >
           <i class="fa-solid fa-right-to-bracket"style={{fontSize:"19px"}}></i>
              <span
                style={{ fontSize: "13px", marginLeft: "3px", fontWeight: 700 }}
              >
                LOGIN
              </span>
          </div>
        </Link>
   </div>
      
      <div className="register-container">
      <h4 style={{textAlign:"center", color:"#9e9ea4", margin:"0px", paddingTop:"5px", textDecoration:"underline #9e9ea4"}}>Registration Form</h4>
      <div className="register">
      
        <div className="right-register">
        <div className="right-img"></div>
        </div>

        {/* ----------------form----------------- */}
        <div className="left-register">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  value={first_name} onChange={(e) => setFirst_name(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  // value={formData.last_name}
                  value={last_name} onChange={(e) => setLast_name(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Position</Form.Label>
                <Form.Select aria-label="Default select example" value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option>select Position</option>
                  <option>FrontEnd Developer</option>
                  <option>BackEnd Developer</option>
                  <option>Software Developer</option>
                  <option>Mobile Developer</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label>Employee ID</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Employee ID"
                    aria-describedby="inputGroupPrepend"
                    required
                    // value={formData.employee_id}
                    value={employee_id} onChange={(e) => setEmployee_id(e.target.value)}
                    
                  />
                  <Form.Control.Feedback type="invalid">
                    Please Enter Employee ID.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Form.Control.Feedback>
                  Please Enter Email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Phone Number"
                  // value={formData.phone_number}
                  value={phone_number} onChange={(e) => setPhone_number(e.target.value)}
                />
                <Form.Control.Feedback>
                  Please Enter Phone Number
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" >
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address.." required value={address} onChange={(e) => setAddress(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a Address.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid City.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="2" >
                <Form.Label>State</Form.Label>
                <Form.Control type="text" placeholder="State" required value={state} onChange={(e) => setState(e.target.value)}/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid State.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" >
                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  // value={formData.password}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                
              </Form.Group>

              <Form.Group as={Col} md="4" >
                <Form.Label htmlFor="inputPassword6">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPassword6"
                  aria-describedby="passwordHelpBlock"
                  // value={formData.confirm_password}
                  value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)}
                  
                />
           </Form.Group>
         </Row>

            {/* <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="myFile" style={{display:"flex", textAlign:"center"}}>
            <Form.Label htmlFor="myFile" style={{marginRight:"20px"}}>Upload Photo</Form.Label>
             <input type="file" id="myFile" name="myFile"/>
            </Form.Group>
            </Row> */}
        <input type="file" id="myFile" name="filename" accept="image/*" onChange={(e)=>{setFile(e.target.files(0))}}/>
 

            <Button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
          </Form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RegistrationForm;













