const express = require('express');
const router = express.Router();
const path = require('path');
const {mainController} = require('../controller/principal.controller');

router.get('/', mainController.inicio);

module.exports = router;