// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';


const SECRET_KEY = 'miteshpradhanArkaJainUniversity';

const loginUser = async (req, res) => {
  try {
    const { employee_id, password } = req.body;
    const user = await User.findOne({ employee_id });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ employee_id: employee_id, role: user.role }, SECRET_KEY, {
      expiresIn: '1h',
    });

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
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const registerUser = async (req, res) => {
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
    res.status(400).send(error);
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await User.find();
    res.send(registrations);
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((currElement) => {
      return currElement.token !== req.token;
    });

    res.clearCookie("jwt");
    console.log("Logout successfully");
    await req.user.save();
    res.render("index"); // Assuming you want to render some page after logout
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAllDevices = async (req, res) => {
  try {
    req.user.tokens = [];
    res.clearCookie("jwt");
    console.log("Logout successfully from all devices");
    await req.user.save();
    res.render("index"); // Assuming you want to render some page after logout
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  loginUser,
  registerUser,
  getAllRegistrations,
  logoutUser,
  logoutAllDevices
};
