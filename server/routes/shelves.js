const express = require('express');
const router = express.Router();
const { authenticateUser, authorizeShelfAccess } = require('../middleware/authMiddleware');
const { browseAllShelves, browseSpecificShelf } = require("../controllers/shelfController");

router.get('/', authenticateUser, browseAllShelves);
router.get('/:id', authenticateUser, authorizeShelfAccess, browseSpecificShelf);

module.exports = router;