const express = require('express');
const authRouter = express.Router();

const authToken = require('../../middlewares/auth')
const {
    httpRegisterUser,
    httpLoginUser,
    httpLogoutUser,
} = require('./auth.controller');


authRouter.post('/register', httpRegisterUser);
authRouter.post('/login', httpLoginUser);
authRouter.get('/logout', authToken, httpLogoutUser);

module.exports = authRouter;