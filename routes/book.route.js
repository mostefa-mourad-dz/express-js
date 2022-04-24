const express = require('express');
const bodyParser = require('body-parser');

/** Controllers */
const admCtrl = require('../controllers/book.controller');


/** Creating and injecting dependencies in the Router */
const router = express.Router()
router.use(bodyParser.json());

/** Routes */


module.exports = router ;