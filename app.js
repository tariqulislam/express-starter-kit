var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var database = require('./config/database');
var morgan = require('morgan');

var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var protects = require('./middleware/protects')

var app = express();

mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'))

app.use('/', index);


app.use('/users', users);
app.use('/api', protects);
app.use('/api/products', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// var dbConnect = mongoose.createConnection(database.dbConnection, {
//   useMongoClient: true,
//   /* other options */
// });
//
// dbConnect.then( function(db){
//   console.log("Connection is Okay for database", db);
// });

mongoose.connect(database.dbConnection)
.then(()=> console.log('connection successfull'))
.catch((err)=> console.console.error(err));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
