const express = require('express');
const userRouter = express.Router();

const authToken = require('../../middlewares/auth');
const {
    httpGetUsers,
    httpGetUserByID,
    httpUpdateUser,
    httpDeleteUser
} = require('./users.controller')

userRouter.get('/', httpGetUsers);
userRouter.get('/:id', authToken, httpGetUserByID);
userRouter.put('/', authToken, httpUpdateUser);
userRouter.delete('/', authToken, httpDeleteUser);

module.exports = userRouter;