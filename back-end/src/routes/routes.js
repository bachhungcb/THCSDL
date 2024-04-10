const {getAnimes}= require('../controllers/controllers');
const express = require('express');
const router = express.Router();

router.get('/animes', getAnimes);

module.exports = router;