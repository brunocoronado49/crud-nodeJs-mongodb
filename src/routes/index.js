const express = require('express');
const router = express.Router();
const {renderIndex, renderAbout} = require('../controllers/indexController');

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router;