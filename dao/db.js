// External dependencies
var log4js = require('log4js');
var mongoose = require('mongoose');

// Internal dependencies
var config = require("../config/config.js");
var envConfig = config.environmentConfig();

// logger
var logger = log4js.getLogger('[app]');

var connectToMongo = function() {
    // Connect to DB
    // var mongoURL = process.env.MONGO_OVERRIDE || environmentConfig.dbConnectionString;
    var mongoURL = envConfig.dbConnectionString;
    mongoose.connect(mongoURL);
    db = mongoose.connection;
    db.on('error', function onError(err) {
        logger.warn('Connection to Mongo Unsuccessful: ' + err);
    });

    // When the connection is disconnected
    db.on('disconnected', function() {
        logger.info('Mongoose default connection disconnected');
    });

    // When successfully connected
    db.on('connected', function() {
        logger.info('Mongoose default connection open');
    });

    db.once('open', function callback() {
        logger.info('Connection to Mongo Successful');
    });
};


var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

var user = new Schema({
    fName: { type: String, require: true },
    lName: { type: String, require: true },
    email: { type: String, require: true },
    pinCode: { type: Number, require: true },
    birthDate: { type: Date, require: true },
    isActive: { type: Boolean, default: false }
});

var todos = new Schema({
    userId: { type: String, require: true },
    text: { type: String, require: true },
    targetDate: { type: Date, require: true },
    done: { type: Boolean, default: false }
});



// Exports modules.
module.exports.user = mongoose.model('user', user, 'user');
module.exports.todos = mongoose.model('todos', todos, 'todos');

//Mongoose Connection
module.exports.db = mongoose.connection;
module.exports.connectToMongo = connectToMongo;