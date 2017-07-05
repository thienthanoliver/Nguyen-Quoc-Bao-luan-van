var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var timkiem = require('./routes/timkiem');
var hoidap = require('./routes/hoidap');
var chat = require('./routes/chat');
var binhluan = require('./routes/binhluan');
var mysql = require('mysql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true}));
app.use(flash());
app.use(function(req,res,next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.err_msg = req.flash('err_msg');
	res.locals.errors = req.flash('errors');
	next();
})

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);
app.use('/tim-kiem', timkiem);
app.use('/hoi-dap', hoidap);
app.use('/binh-luan', binhluan);
app.use('/forum-chat-online', chat);

// catch 404 and forward to error handler
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
