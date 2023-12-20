
// middleware/auth.js


const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET_KEY = 'miteshpradhanArkaJainUniversity';
const auth = async (req,res,next) =>{
    try {
        const token = req.cookies.token;
        const verifyUser = jwt.verify(token, SECRET_KEY );
        const user = await User.findOne({employee_id:verifyUser.employee_id});   //"tokens.token:token"
        console.log(user);

        req.token = token;
        req.user = user;

        next();
        
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth;