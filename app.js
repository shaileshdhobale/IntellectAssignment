var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var app = express();

//routes
var userRoute = require('./routes/userRoute.js');

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

log4js.configure('./config/logConfig.json');

var logger = log4js.getLogger('[app]');
// Connect to MongoDB
var db = require('./dao/db.js');
db.connectToMongo();


logger.info("Initializing router..");
app.all('*', userRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found : ' + req.url);
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    logger.error(JSON.stringify(err.stack));
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});
module.exports = app;