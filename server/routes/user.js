const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

const { getUser,editShelf, editEmail, editPrivacy, deleteUser} = require("../controllers/userController");

router.get('/current', authenticateUser, getUser);
router.patch('/shelf', authenticateUser, editShelf);
router.patch('/email', authenticateUser, editEmail);
router.patch('/privacy', authenticateUser, editPrivacy);
router.delete('/current', authenticateUser, deleteUser);

module.exports = router;
