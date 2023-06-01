const cors = require('cors')
const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const xss = require("xss-clean");

const apiV1 = require('./routes/api.v1')
const handleError = require('./middlewares/error');
const limiter = require('./config/rate.limit');
const swaggerOptions = require('./config/swagger')

require('dotenv').config();

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

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
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs',
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      docExpansion: 'none',
      defaultModelsExpandDepth: -1,
    },
  })
);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome... Contact Manager API!' }));
app.use('/v1', apiV1);

// Error handling middleware
app.use(handleError);

module.exports = app;