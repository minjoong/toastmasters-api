var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var app = express();

// CORS 적용
app.use(cors());
// Access Logging
app.use(logger('dev'));
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message: err.message});
});

module.exports = app;
