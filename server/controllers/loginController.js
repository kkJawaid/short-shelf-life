const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { checkCred } = require("../models/loginModel");

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Missing required fields."
            })
        }

        //checking email
        const user = await checkCred(email);
        if (user == undefined) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        // comparing password hash 
        const comparedHash = await bcrypt.compare(password, user.password_hash);
        if (!comparedHash) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        //generating jwt
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        //storitng in cookies
        res.cookie('token', token, {httpOnly: true});
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email
            }
        })
    }
    catch(error) {
        console.log(error);
        res.status(500).json ({
            message: "Error during user login. Please try again."
        })
    }
}

module.exports = { loginUser };