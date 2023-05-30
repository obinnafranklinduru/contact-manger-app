const express = require('express');
const contactRouter = express.Router();

const authToken = require('../../middlewares/auth');
const {
    httpCreateContact,
    httpGetAllContacts,
    httpGetContactByID,
    httpUpdateContactByID,
    httpDeleteContactByID
} = require('./contacts.controller');


contactRouter.get('/', authToken, httpGetAllContacts);
contactRouter.get('/:id', authToken, httpGetContactByID);
contactRouter.post('/', authToken, httpCreateContact);
contactRouter.put('/:id', authToken, httpUpdateContactByID);
contactRouter.delete('/:id', authToken, httpDeleteContactByID);

module.exports = contactRouter;