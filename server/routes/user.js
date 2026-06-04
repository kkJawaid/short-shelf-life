const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

const { getUser,editShelf } = require("../controllers/userController");

router.get('/current', authenticateUser, getUser);
router.patch('/shelf', authenticateUser, editShelf);

module.exports = router;
