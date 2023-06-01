const express = require('express');
const apiV1 = express.Router();

const authRouter = require('./auth/auth.router');
const contactRouter = require('./contacts/contacts.router');
const userRouter = require('./users/users.router');

// Mount the routers on the API version 1 router
apiV1.use('/auth', authRouter);
apiV1.use('/contacts', contactRouter);
apiV1.use('/users', userRouter);

module.exports = apiV1;