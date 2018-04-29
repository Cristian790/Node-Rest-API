const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');

router.get('/', UserController.index);


module.exports = router;
