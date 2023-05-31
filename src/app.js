const cors = require('cors')
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require("xss-clean");

const handleError = require('./middlewares/error');
const authRouter = require('./routes/auth/auth.router');
const contactRouter = require('./routes/contacts/contacts.router');
const userRouter = require('./routes/users/users.router');

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

require('dotenv').config();

const app = express();

// Security configuration
app.use(helmet()); // adds security headers
app.use(cors()); // enables Cross-Origin Resource Sharing
app.options('*', cors()); // cross-origin resource sharing for all routes
app.use(xss()); // prevent Cross-site Scripting XSS
app.use(mongoSanitize()); // prevent SQL injection
app.use(hpp()); //HTTP Param Pollution
app.use(limiter); //limit queries per 15mn

// Enable parsing Json payload  in the request body
app.use(express.json());

// Logs information about incoming requests and outgoing responses in the terminal
app.use(morgan('combined'));

// Routes configuration
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome... Contact Manager API!' }));
app.use('/api/auth', authRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/users', userRouter);

// Error handling middleware
app.use(handleError);

module.exports = app;