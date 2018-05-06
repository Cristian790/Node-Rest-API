const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  make: {
    type: String,
    required: [true, 'Make required [m]']
  },
  model: {
    type: String,
    required: [true, 'Model required [m]']
  },
  year: {
    type: Number,
    required: [true, 'Year require [m]']
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

CarSchema.get('findById', (res, next) => {
  if (res == null) {
    return next(Error('Car not found with the given ID'));
  }
  return next();
});


const Car = mongoose.model('Car', CarSchema);
module.exports = Car;