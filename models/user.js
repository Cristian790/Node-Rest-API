const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required [m]']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required [m]']
  },
  email: {
    type: String,
    required: [true, 'Email is required [m]']
  },
  allCars: [{
    type: Schema.Types.ObjectId,
    ref: 'Car'
  }]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;