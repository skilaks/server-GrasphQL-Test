var express = require('express');
var router = express.Router();
var Controller = require('../controllers/dashbord');

router.post('/getUser',Controller.getUser);

module.exports = router;