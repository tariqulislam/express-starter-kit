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
var multer = require('multer');


var index = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var protects = require('./middleware/protects');
var books = require('./routes/books');
var fileuploads = require('./routes/fileuploads');
var items = require('./routes/items');
var drivers = require('./routes/drivers');
var resets = require('./routes/resets');
var vehicletypes = require('./routes/vehicle/vehicletypes');
var emails = require('./routes/emails');
var uploads = require('./routes/uploads');


var app = express();
global.__base = __dirname + "/"
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerconf = require('./config/swaggerconf');


var swaggerSpec = swaggerJsDoc(swaggerconf.swaggerOptions);
// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('morgan')('short'));



app.use('/', index);


app.use('/books', books);
app.use('/users', users);
app.use('/api', protects);
app.use('/products', products);
app.use('/vehicletypes', vehicletypes);
app.use('/fileuploads', fileuploads);
app.use('/items', items);
app.use('/drivers', drivers);
app.use('/emails', emails);
app.use('/resets', resets);
app.use('/uploads', uploads);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* configure the storage in multer */

/** check email send to gmail **/





// var dbConnect = mongoose.createConnection(database.dbConnection, {
//   useMongoClient: true,
//   /* other options */
// });
//
// dbConnect.then( function(db){
//   console.log("Connection is Okay for database", db);
// });

console.log("this is db connection", database.dbConnection);

mongoose.connect(database.dbConnection, { useMongoClient: true })
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
