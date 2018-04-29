const express = require('express');
const morgan = require('morgan');
const users = require('./routes/users');

//--------------------------------Init
const app = express();

//--------------------------------Middleware
app.use(morgan('dev'));

//--------------------------------Routes
app.use('/users', users);

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
  console.log(error);
});

//--------------------------------Server
const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));