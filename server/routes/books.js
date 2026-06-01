const express = require('express');
const router = express.Router(); 
const { authenticateUser } = require("../middleware/authMiddleware");

const { getAllBooks, getSpecificBook, deleteBook } = require("../controllers/bookController");

router.get("/", authenticateUser, getAllBooks);
router.get("/:id", authenticateUser, getSpecificBook);
router.delete("/:id", authenticateUser, deleteBook);

module.exports = router; 
