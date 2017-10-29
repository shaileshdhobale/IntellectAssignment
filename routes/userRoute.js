//External dependencies
var express = require('express');
var router = express.Router();

// Internal dependencies
var userController = require('../controllers/userController.js');

router.post('/create/user', userController.createUser);
router.get('/all/user', userController.getAllUsers);
router.post('/create/todos', userController.createTODOS);
router.get('/user/active/todos/:userId', userController.getTODOSByUserId);
router.get('/todo/:todoId', userController.getTODOById)
router.get('/active/user/listOfTODOS', userController.getActiveUserAndTODOS);

//exports
module.exports = router;