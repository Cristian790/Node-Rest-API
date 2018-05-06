//Using new router handler
//Try and catch isnt needed
//------------------------------------Import Models
const Car = require('../models/car');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    usersCount: users.length,
    usersList: users
  });
}

exports.createUser = async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    createdUser: user
  });
}

exports.findUser = async (req, res, next) => {
  const userId = req.params.userId;
  //const {userId}=req.params;
  const user = await User.findById(userId);
  if (user) {
    res.status(201).json({
      foundUser: user
    });
  }
  else {
    res.status(404).json({
      message: `User not found with ID:${userId}`
    });
  }
}

exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.userId);
  res.status(200).json({
    deletedUser: user
  });
}

exports.replaceUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId, req.body);
  const newUser = await User.findById(user._id);
  res.status(200).json({
    oldUser: user,
    updatedUser: newUser
  });
}

exports.updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId, req.body);
  const newUser = await User.findById(user._id);
  res.status(200).json({
    oldUser: user,
    updatedUser: newUser
  });
}
//---------------------------------------------User's Cars

exports.getUserCars = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId).populate('allCars', 'make model year');
  console.log(user);
  if (user) {
    res.status(200).json({
      user: user
    });
  }
  else {
    res.status(404).json({
      message: `User not found with ID: ${userId}`
    });
  }
}

exports.createUserCar = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (user) {
    const newCar = await Car.create(req.body);
    if (newCar) {
      user.allCars.push(newCar);
      newCar.seller = user;
      await user.save();
      await newCar.save();
      res.status(201).json(newCar);
      console.log(user, newCar);

    }
  }
  else {
    res.status(404).json({
      message: `User not found with ID:${userId}`
    });
  }

}