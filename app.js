

//Instatiate standard libraries
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config({
  path: "./config.env"
})

//Setup router for routes
//importing from routes/
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const blogsRouter = require('./routes/blogs');

//instantiate  express app
const app = express();

//get mongoDB driver connection
const {
  mongoConnect

} = require('./mongo.js')
mongoConnect()

//associating the libraries with the app
// adding middleware
//(adding libraries that we can use throughout our application)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine setup
//sets environment variables (things we can access across the application)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//for hosting static files: css, html, images etc.
app.use(express.static(path.join(__dirname, 'public')));

//we bind the routers to routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);

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
});
module.exports = app;