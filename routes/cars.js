const express = require('express');
const router = require('express-promise-router')();
const CarController = require('../controllers/cars');

router.get('/', CarController.getAllCars);

router.get('/:carId', CarController.findCar);

router.post('/', CarController.createCar);


module.exports = router;