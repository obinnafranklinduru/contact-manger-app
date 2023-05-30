const mongoose = require('mongoose');
const { isEmail } = require('validator');

const contactSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
        type: String,
        required: [true, 'Please add a contact name'],
        maxlength: [40, 'Please contact name must not exceed 40 characters'],
    },
    email: {
        type: String,
        required: [true, 'Please add a contact email address'],
        lowercase: true,
        trim: true,
        validate: [isEmail, 'Invalid email address'],
    },
    phone: {
        type: String,
        required: [true, 'Please add a contact phone number'],
        maxlength: [15, 'Please contact number must not exceed 15 characters'],
    }
  
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
