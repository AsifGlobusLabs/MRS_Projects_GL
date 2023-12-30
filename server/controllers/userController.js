// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'miteshpradhanArkaJainUniversity';


// business logic for user login 

exports.loginUser = async (req, res) => {
  try {
    const { employee_id, password } = req.body;
    const user = await User.findOne({ employee_id });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ employee_id: employee_id, role: user.role }, SECRET_KEY);

    res.cookie('token', token, { httpOnly: true });

    res.json({
      message: 'Login successful',
      user: {
        user: user._id,
        employee_id: user.employee_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        position: user.position
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// business logic for user registration 

exports.registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;

    if (password === confirm_password) {
      const registration = new User({
        first_name :req.body.first_name,
        last_name :req.body.last_name,
        address :req.body.address,
        city :req.body.city,
        state :req.body.state,
        phone_number :req.body.phone_number,
        email :req.body.email,
        position :req.body.position,
        employee_id :req.body.employee_id,
        password :req.body.password,
        confirm_password:req.body.confirm_password,
        image:req.file.filename
      })
      console.log(req.file);
      const token = await registration.generateAuthToken();
      console.log("the token part is " + token);

      await registration.save();
      res.status(201).send("Successfully Registered");
    } else {
      res.status(404).send("Password is not matched");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// business logic for getting all users

exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await User.find();
    res.send(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// business logic for user logout 

exports.logoutUser = async (req, res) => {
      
  try {
    // Clear the token cookie by setting an expired date

    res.cookie("token", "", { expires: new Date(0), httpOnly: true });
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// business logic for user logout from all devices 

exports.logoutAllDevices = async (req, res) => {
  try {
    
    // Clear user tokens
    req.user.tokens = [];
   
    // Clear the token cookie
    res.clearCookie("token");
    
    // Save the user with the updated tokens
    await req.user.save();

    // Send a success response
    res.status(200).send({ message: "Logout successful from all devices" });

  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in logoutAllDevices:", error);

    // Send a meaningful error response to the client
    res.status(500).send({ error: "Internal Server Error" });
  }
};