const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

const { registerUser } = require("../controllers/registrationController");
const { loginUser } = require("../controllers/loginController");
const { logoutUser } = require("../controllers/logoutController");
const { getUser } = require("../controllers/userController");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticateUser, logoutUser);
router.get('/current', authenticateUser, getUser);

module.exports = router; 
