const express = require('express');
const router = express.Router(); 
const { authenticateUser } = require("../middleware/authMiddleware");

const { getAllBooks, getSpecificBook, deleteBook, addBook } = require("../controllers/bookController");

router.get("/", authenticateUser, getAllBooks);
router.get("/:id", authenticateUser, getSpecificBook);
router.post("/", authenticateUser, addBook);
router.delete("/:id", authenticateUser, deleteBook);

module.exports = router; 
