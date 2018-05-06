//------------------------------------------Import Modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const cars = require('./routes/cars');

//--------------------------------Init Express
const app = express();

//-------------------------------Database
mongoose.connect(config.database);
let db = mongoose.connection;

db.on('open', () => { console.log('Connected to MongoDB') });
db.on('error', err => { console.log(err) });

//-----------------Declare mongoose promise as global
mongoose.Promise = global.Promise;

//--------------------------------Middleware
//Morgan Dev
app.use(morgan('dev'));
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//--------------------------------Routes
app.use('/users', users);
app.use('/cars', cars);

//--------------------------------Errors
//Catch 404 errors and foward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
//Error Handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: error.message
    }
  });
});

//--------------------------------Server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));