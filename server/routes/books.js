const express = require('express');
const router = express.Router(); 
const { authenticateUser } = require("../middleware/authMiddleware");

const { getAllBooks, getSpecificBook } = require("../controllers/bookController");

router.get("/", authenticateUser, getAllBooks);
router.get("/:id", authenticateUser, getSpecificBook);

module.exports = router; 
