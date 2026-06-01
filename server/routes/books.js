const express = require('express');
const router = express.Router(); 
const { authenticateUser } = require("../middleware/authMiddleware");

const { getAllBooks } = require("../controllers/bookController");

router.get("/", authenticateUser, getAllBooks);


module.exports = router; 
