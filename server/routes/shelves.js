const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const { browseAllShelves } = require("../controllers/shelfController");

router.get('/', authenticateUser, browseAllShelves);

module.exports = router;