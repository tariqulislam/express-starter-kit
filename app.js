var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var admins = require('./routes/admins');
var protects = require('./middleware/protects');
var inviteCodes = require('./routes/invitecodes');
var users = require('./routes/users');



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


// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('morgan')('short'));

app.use('/admin', admins);
app.use('/api', protects);
app.use('/api/invite', inviteCodes);
app.use('/', users);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


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
