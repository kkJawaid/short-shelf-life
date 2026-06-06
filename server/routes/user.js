const express = require('express');
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");

const { getUser,editShelf, editEmail, editPassword, editPrivacy, deleteUser} = require("../controllers/userController");

router.get('/current', authenticateUser, getUser);
router.patch('/shelf', authenticateUser, editShelf);
router.patch('/email', authenticateUser, editEmail);
router.patch('/password', authenticateUser, editPassword);
router.patch('/privacy', authenticateUser, editPrivacy);
router.delete('/current', authenticateUser, deleteUser);

module.exports = router;
