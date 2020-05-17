// third-party-librarys
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//custom objects
var ProductController = require('./Controller/ProductController');
var ShopingCartController = require('./Controller/ShopingCartController');
var mainRouter = require('./Controller/main');
var categoryMidleware = require('./MiddleWare/categoryMidleware');


var app = express();
app.use(session({
        key: 'session.sid',
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(categoryMidleware.injectCategory);
app.use('/', mainRouter);

app.use('/products', ProductController);
app.use('/cart', ShopingCartController);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = err;

    // render the error page
    res.status(err.status || 500);
    console.log(err)
    res.render('error');
});

app.listen(8000);
module.exports = app;