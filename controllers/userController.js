//External dependencies
var _ = require('lodash');
var async = require('async');

//Internal dependencies
var config = require('../config/config.js');
var constants = require('../utils/constant');
var envConfig = config.environmentConfig();
var log4js = require('log4js');

//Services
var userService = require('../services/userService.js');

// logger
var logger = log4js.getLogger('[userController]');

//Function to create new user
var  createUser = function (req, res) {
    var METHOD_NAME = "[createUser] ";
    var response;
    var reqBody = req.body;
    if(_.isEmpty(reqBody.fName) || _.isEmpty(reqBody.lName) || _.isEmpty(reqBody.email) || _.isEmpty(reqBody.pinCode) || _.isEmpty(reqBody.birthDate)) {
        response = {
            status: 400,
            message: constants.BAD_REQUEST
        };
        return res.status(400).send(response);
    }
    userService.createUser(reqBody, function(error, result ){
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(result)) {
            logger.info(METHOD_NAME + "User Created successfully: " + result._id);
            response = {
                status: 200,
                message: constants.USER_CREATE_SUCCESS,
                data: {
                    user: true,
                    userData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.USER_CREATE_FAILURE,
                data: {
                    user: false
                }
            };
            res.status(200).send(response);
        }
    })
};


//Function get all users
var getAllUsers = function(req, res) {
    var METHOD_NAME = "[getAllUsers] ";
    var response;

    userService.getAllUsers(function(error, result) {
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(result)) {
            logger.info(METHOD_NAME + "Fetched all users.");
            response = {
                status: 200,
                message: constants.FETCH_ALL_USER_SUCCESS,
                data: {
                    user: true,
                    userData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.FETCH_ALL_USER_FAILURE,
                data: {
                    user: false
                }
            };
            res.status(200).send(response);
        }
    })
}


//Function to create new todo
var  createTODOS = function (req, res) {
    var METHOD_NAME = "[createTODOS] ";
    var response;
    var reqBody = req.body;
    if(_.isEmpty(reqBody.userId) || _.isEmpty(reqBody.text) || _.isEmpty(reqBody.targetDate)) {
        response = {
            status: 400,
            message: constants.BAD_REQUEST
        };
        return res.status(400).send(response);
    }
    userService.createTODOS(reqBody, function(error, result ){
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(result)) {
            logger.info(METHOD_NAME + "todos Created successfully: " + result._id);
            response = {
                status: 200,
                message: constants.TODO_CREATE_SUCCESS,
                data: {
                    todo: true,
                    todoData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.TODO_CREATE_FAILURE,
                data: {
                    todo: false
                }
            };
            res.status(200).send(response);
        }
    })
};


//Function to get all todos by userId
var getTODOSByUserId = function(req, res) {
    var METHOD_NAME = "[getTODOSByUserId] ";
    var response;
    var userId = req.params.userId;
    logger.info(userId);
    if(_.isEmpty(userId)) {
        response = {
            status: 400,
            message: constants.BAD_REQUEST
        };
        return res.status(400).send(response);
    }
    async.parallel({
        user: function(callback) {
            userService.getUserByUserId(userId, function(error, result) {
                if(error) {
                    logger.error(METHOD_NAME + error);
                    callback(error, null);
                } else {
                    callback(null, result)
                }
            })
        },
        todos: function(callback) {
            userService.getTODOSByUserId(userId, function(error, result) {
                if(error) {
                    logger.error(METHOD_NAME + error);
                    callback(error, null);
                } else {
                    callback(null, result)
                }
            })
        }
    }, function(error, finalResult) {
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(finalResult)) {
            logger.info(METHOD_NAME + "User todos fetched successfully.");
            response = {
                status: 200,
                message: constants.USER_TODOS_FETCHED_SUCCESS,
                data: {
                    todo: true,
                    todoData: finalResult
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.USER_TODOS_FETCHED_FAILURE,
                data: {
                    todo: false
                }
            };
            res.status(200).send(response);
        }
    })
}


//Function to get todos by todoId
var getTODOById = function(req, res) {
    var METHOD_NAME = "[getTODOById] ";
    var response;
    var todoId = req.params.todoId;
     if(_.isEmpty(todoId)) {
        response = {
            status: 400,
            message: constants.BAD_REQUEST
        };
        return res.status(400).send(response);
    }
    userService.getTODOById(todoId, function(error, result) {
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(result)) {
            logger.info(METHOD_NAME + "todos fetched successfully: " + result._id);
            response = {
                status: 200,
                message: constants.TODO_FETCH_SUCCESS,
                data: {
                    todo: true,
                    todoData: result
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.TODO_FETCH_FAILURE,
                data: {
                    todo: false
                }
            };
            res.status(200).send(response);
        }
    })
}

//Function to get all active users and there todos.
var getActiveUserAndTODOS = function(req, res) {
    var METHOD_NAME = "[getActiveUserAndTODOS] ";
    var response;

    async.waterfall([
        function getAllUsers(callback) {
            userService.getAllActiveUsers(function(error, result) {
                if(error) {
                    logger.error(METHOD_NAME + error);
                    callback(error, null);
                } else {
                    callback(null, result);
                }
            })
        },
        function getAllTODOSbyUserId(result, callback) {
            if(!_.isEmpty(result) && result.length > 0) {
                var i=0;
                async.eachSeries(result, function(singleUser,cb) {
                    userService.getAllTODOSbyUserId(singleUser._id, function(error, result1 ){
                        if(error) {
                            logger.error(METHOD_NAME + error);
                            cb(error);
                        } else if(!_.isEmpty(result)) {
                            result[i]._doc.todos = result1;
                            i++;
                            cb();
                        } else {
                            i++;
                            cb();
                        }
                    })
                }, function(error) {
                    if(error) {
                        logger.error(METHOD_NAME + error);
                        callback(error, null)
                    } else {
                        callback(null, result);
                    }
                })
            }
        }
    ], function(error, finalResult) {
        if (error) {
            logger.error(METHOD_NAME + error);
            response = {
                status: 500,
                message: constants.INTERNAL_SERVER_ERROR
            };
            res.status(500).send(response);
        } else if (!_.isEmpty(finalResult)) {
            logger.info(METHOD_NAME + "Active Users todos are fetched successfully.");
            response = {
                status: 200,
                message: constants.USER_TODOS_FETCHED_SUCCESS,
                data: {
                    user: true,
                    userData: finalResult
                }
            };
            res.status(200).send(response);
        } else {
            response = {
                status: 200,
                message: constants.USER_TODOS_FETCHED_FAILURE,
                data: {
                    user: false
                }
            };
            res.status(200).send(response);
        }
    })
}

//Exports
module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.createTODOS = createTODOS;
module.exports.getTODOSByUserId = getTODOSByUserId;
module.exports.getTODOById = getTODOById;
module.exports.getActiveUserAndTODOS = getActiveUserAndTODOS;