const mongoose = require('mongoose');
const { isEmail } = require('validator');

const ErrorResponse = require('../../utils/error.response')
const Contact = require('../../models/contacts.model')

/**
 * @desc Create a new contact.
 * @route POST /api/contacts
 * @access Private
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Function} - The response containing a success message or an error message.
 */
async function httpCreateContact(req, res, next) {
    try {
        const { name, email, phone } = req.body;

        // Check if required fields are provided
        if (!name || !email || !phone)
            return next(new ErrorResponse('Please provide name, email and phone number', 400));
        
        const contact = await Contact.create({ name, email, phone, user_id: req.user.id });

        res.status(201).json({ message: `Contact registered with ID: ${contact._id}` });
    
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get all contacts.
 * @route GET /api/contacts
 * @access Private
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Function} - The response containing an array of contacts object.
 */
async function httpGetAllContacts(req, res, next) {
    try {
        const contacts = await Contact.find({ user_id: req.user.id })
            .sort('-createdAt')
            .select('-__v -user_id');

        if (contacts.length === 0)
            return next(new ErrorResponse("No Contact Found", 404));
        
        res.status(200).json({ contacts });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Get a contact.
 * @route GET /api/contacts/:id
 * @access Private
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Object} - The response containing the contact or an error message.
 */
async function httpGetContactByID(req, res, next) {
    try {
        // Validate the provided ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        const contact = await Contact.findById(req.params.id).select('-__v -user_id');

        if (!contact) return next(new ErrorResponse('Contact not found', 404));

        res.status(200).json({ contact });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Update a contact.
 * @route PUT /api/contacts/:id
 * @access Private
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Function} - The response containing a success message or an error message.
 */
async function httpUpdateContactByID(req, res, next) {
    try {
        // Validate the provided ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        const contact = await Contact.findById(req.params.id);
        if (!contact) return next(new ErrorResponse('Contact not found', 404));

        const { name, email, phone } = req.body;

        // Check if name exceeds the maximum length
        if (name && name.length > 40)
            return next(new ErrorResponse('Please name must not exceed 40 characters', 400));

        // Check if the email is invalid
        if (email && !isEmail(email)) return next(new ErrorResponse('Invalid email address', 400));

        // Check if phone number exceeds the maximum length
        if (phone && phone.length > 15)
            return next(new ErrorResponse('Please phone number must not exceed 15 characters', 400));

        if (contact.user_id.toString() !== req.user.id)
            return next(new ErrorResponse('User not authorized to update contact', 403));

        await Contact.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        );

        res.status(200).json({ message: `Contact with ID ${req.params.id} was modified` });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc Delete a contact.
 * @route DELETE /api/contacts/:id
 * @access Private
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The error passed to the error handler function.
 * @returns {Function} - The next function.
 */
async function httpDeleteContactByID(req, res, next) {
    try {
        // Validate the provided ID
        if (!mongoose.isValidObjectId(req.params.id))
            return next(new ErrorResponse('Invalid ID', 400));
        
        const contact = await Contact.findById(req.params.id);

        if (!contact) return next(new ErrorResponse('Contact not found', 404));

        if (contact.user_id.toString() !== req.user.id)
            return next(new ErrorResponse('User not authorized to update contact', 403));

        await Contact.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: `Contact with ID ${contact._id} was deleted` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    httpCreateContact,
    httpGetAllContacts,
    httpGetContactByID,
    httpUpdateContactByID,
    httpDeleteContactByID
}