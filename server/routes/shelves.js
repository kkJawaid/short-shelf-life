const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { browseAllShelves, browseSpecificShelf } = require("../controllers/shelfController");

router.get('/', authenticateUser, browseAllShelves);
router.get('/:id', authenticateUser, browseSpecificShelf);

module.exports = router;