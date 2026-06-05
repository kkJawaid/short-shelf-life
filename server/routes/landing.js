const express = require('express');
const router = express.Router();
const { landingMessage } = require("../controllers/landingController");

router.get('/', landingMessage);

module.exports = router;