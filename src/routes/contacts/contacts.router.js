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

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contacts endpoints
 * 
 * components:
 *   schemas:
 *     ContactRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: name of the contact
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the contact
 *         phone:
 *           type: string
 *           description: Phone number of the contact
 *       required:
 *         - name
 *         - email
 *         - phone
 * 
 *     ContactMultipleResponse:
 *       type: object
 *       properties:
 *         contacts:
 *           type: array
 *           items:
 *              type: object
 *              description: Contact object
 * 
 *     ContactSingleResponse:
 *       type: object
 *       properties:
 *         contact:
 *           type: object
 *           description: Contact object
 *              
 */ 

/**
 * @swagger
 * /v1/contacts:
 *   get:
 *     tags: [Contacts]
 *     summary: Get all contacts
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactMultipleResponse'
 */
contactRouter.get('/', authToken, httpGetAllContacts);


/**
 * @swagger
 * /v1/contacts/{id}:
 *   get:
 *     tags: [Contacts]
 *     summary: Get a contact by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact to retrieve
 *     responses:
 *       200:
 *         description: The requested contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactSingleResponse'
 */
contactRouter.get('/:id', authToken, httpGetContactByID);


/**
 * @swagger
 * /v1/contacts:
 *   post:
 *     tags: [Contacts]
 *     summary: Create a new contact
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
contactRouter.post('/', authToken, httpCreateContact);


/**
 * @swagger
 * /v1/contacts/{id}:
 *   put:
 *     tags: [Contacts]
 *     summary: Update a contact by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
contactRouter.put('/:id', authToken, httpUpdateContactByID);

/**
 * @swagger
 * /v1/contacts/{id}:
 *   delete:
 *     tags: [Contacts]
 *     summary: Delete a contact by ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the contact to delete
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseMessage'
 */
contactRouter.delete('/:id', authToken, httpDeleteContactByID);

module.exports = contactRouter;