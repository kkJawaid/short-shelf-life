const express = require('express');
const router = express.Router();
const { errorMessage } = require('../controllers/errorController');

router.get('/', errorMessage);

module.exports = router ; 