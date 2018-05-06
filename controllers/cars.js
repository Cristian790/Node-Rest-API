const Car = require('../models/car');

exports.getAllCars = async (req, res, next) => {
  const cars = await Car.find({}).select('make model year seller').populate('seller', 'firstName lastName email');
  res.status(200).json({
    carsCount: cars.length,
    carsList: cars
  });
}

exports.findCar = async (req, res, next) => {
  const { carId } = req.params;
  const car = await Car.findById(carId).populate('seller');
  res.status(200).json({
    car: car
  });
}

exports.createCar = async (req, res, next) => {
  const seller = User.findById(req.body.seller);
  const newCar = await Car.create(req.body);


}

