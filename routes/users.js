const express = require('express');
//const router = express.Router();
//New router handler allows to remove the try and catch syntax
const UserController = require('../controllers/users');
const router = require('express-promise-router')();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.findUser);
router.put('/:userId', UserController.replaceUser);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

router.get('/:userId/cars', UserController.getUserCars);
router.post('/:userId/cars', UserController.createUserCar);
module.exports = router;
