const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, checkEmail } = require("../models/registrationModel");

const registerUser = async(req,res) => {
    try {
        const { shelf_name, email, password } = req.body;
        if (!shelf_name || !email || !password) {
            return res.status(400).json({
                message: "Missing required fields"
            })
        }
        //email validation check
        const emailValid = validateEmail(email);
        if (!emailValid) {
            return res.status(400).json ({
                message: "Enter a valid email address"
            })
        }

        // email uniqueness check
        const emailUnique = await checkEmail(email);
        if (emailUnique != undefined) {
            return res.status(409).json ({
                message: "Email already exists"
            })
        }

        //password hashing
        const hashed_pass = await bcrypt.hash(password, 10);

        //user creation
        const user = await createUser(shelf_name, email, hashed_pass);
        
        // jwt token creation 
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        // storing in cookie yum
        res.cookie('token', token, {httpOnly: true});
        res.status(201).json({
            message: "User created successfully",
            user
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error during user registration"
        })
    }
}

function validateEmail(email) {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const result = re.test(email);
    return result;
}
module.exports = { registerUser } ;