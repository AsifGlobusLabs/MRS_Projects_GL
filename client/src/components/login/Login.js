import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/user/login', {
        employee_id: employeeId,
        password: password,
        
      });

      // Assuming the response.data structure contains the necessary information
      const isAdmin = response.data.role === 'admin';
      console.log(response, "hello")
      if (isAdmin) {
       
        navigate('/assignment');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError('Invalid employee or password');
      console.error('Login failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="main-container p-0">
       <div className="register-header p-2">
         <h3
          style={{
            marginLeft: "20px",
            background: "white",
            color: "#9e9ea4",
            padding: "6px",
          }}
        >
          Globus
          <span
            style={{
              backgroundColor: "#db0a0a",
              color: "white",
              padding: "5px",
              marginLeft: "5px",
            }}
          >
            Labs
          </span>
        </h3>
      </div>

      <div className="login-section">
     <div className="login-left">
    
<form>
  <div class="row mb-4">
    <label for="inputEmail3" class="col-sm-4 col-form-label" style={{color:"black", fontSize:"18px", fontWeight:500}}>Employee Id:</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3"   value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)} />
    </div>
  </div>
  <div class="row mb-4">
    <label for="inputPassword3" class="col-sm-4 col-form-label" style={{color:"black", fontSize:"18px", fontWeight:500}}>Password:</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
    </div>
  </div>
 
  <button type="button" onClick={handleLogin} disabled={loading} class="col-sm-10"
  style={{border:"none",background:"#045e83", color:"white", borderRadius:"5px", padding:"5px 0px", marginTop:"10px"}}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
</form>



      </div>
      <div className="login-right"></div>
      </div>
    </div>
  );
};

export default LoginForm;





