const express = require('express');
const bodyParser = require('body-parser');

/** Controllers */
const bookCtrl = require('../controllers/book.controller');


/** Creating and injecting dependencies in the Router */
const router = express.Router()
router.use(bodyParser.json());

/** Routes */

router.get("/",bookCtrl.findAll);

router.post("/",bookCtrl.create);

router.get("/:id",bookCtrl.findOne);

router.patch("/:id",bookCtrl.update);

router.delete("/:id",bookCtrl.delete);


module.exports = router ;