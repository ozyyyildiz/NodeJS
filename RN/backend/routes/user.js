const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userControllers = require('../controllers/users');
const isAuth = require('../middlewares/isAuth');

router.post('/signup', userControllers.signupUser);

router.post('/login', userControllers.loginUser);

router.post('/:userId', userControllers.deleteUser);

module.exports = router;