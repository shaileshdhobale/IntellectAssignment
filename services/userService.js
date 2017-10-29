//External dependencies
var _ = require('lodash');
var async = require('async');

//Internal dependencies
var config = require('../config/config.js');
var constants = require('../utils/constant');
var envConfig = config.environmentConfig();
var log4js = require('log4js');
var model = require('../dao/db.js');

// logger
var logger = log4js.getLogger('[userService]');

var createUser = function(userObj, callback) {
    var METHOD_NAME = "[createUser]";
    model.user(userObj).save(function(error, result) {
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var getAllUsers = function(callback) {
    var METHOD_NAME = "[getAllUsers] ";
    model.user.find({}, function(error, result) {
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var createTODOS = function(todosObj, callback) {
    var METHOD_NAME = "[createTODOS] ";
    model.todos(todosObj).save(function(error, result) {
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var getTODOSByUserId = function(userId, callback) {
    var METHOD_NAME = "[getTODOSByUserId] ";
    model.todos.find({userId: userId, done: false}, function(error, result ){
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var getUserByUserId = function(userId, callback) {
    model.user.findOne({_id: userId}, function(error, result ){
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var getTODOById = function(todoId, callback) {
    var METHOD_NAME = "[getTODOById] ";
    model.todos.findOne({_id: todoId}, function(error, result) {
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var getAllTODOSbyUserId = function(userId, callback) {
    var METHOD_NAME = "[getAllTODOSbyUserId] ";
    model.todos.find({userId: userId}, function(error, result ){
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

var getAllActiveUsers = function(callback) {
    var METHOD_NAME = "[getAllActiveUsers] ";
    model.user.find({isActive: true}, function(error, result ){
        if(error) {
            logger.error(METHOD_NAME + error);
            callback(error, null);
        } else {
            callback(null, result);
        }
    })
}

//Exports
module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.createTODOS = createTODOS;
module.exports.getTODOSByUserId = getTODOSByUserId;
module.exports.getUserByUserId = getUserByUserId;
module.exports.getTODOById = getTODOById;
module.exports.getAllTODOSbyUserId = getAllTODOSbyUserId;
module.exports.getAllActiveUsers = getAllActiveUsers;