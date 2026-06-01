const express = require('express');
const router = express.Router(); 
const { authenticateUser } = require("../middleware/authMiddleware");

const { getAllBooks, getSpecificBook, addBook, editBook, deleteBook } = require("../controllers/bookController");

router.get("/", authenticateUser, getAllBooks);
router.get("/:id", authenticateUser, getSpecificBook);
router.post("/", authenticateUser, addBook);
router.delete("/:id", authenticateUser, deleteBook);
router.patch("/:id", authenticateUser, editBook);

module.exports = router; 
