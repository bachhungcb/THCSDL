const {getAnimes}= require('../controllers/controllers');
const express = require('express');
const router = express.Router();

router.get('/', getAnimes);

module.exports = router;