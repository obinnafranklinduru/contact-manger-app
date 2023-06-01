// Swagger configuration options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contact Manager API Documentation',
      version: '1.0.0',
      description: 'This is a Contact Manager API built with Node.js that demonstrates CRUD operations on a database and utilizes JSON Web Tokens (JWT) for user authentication.',
    },
    servers: [
      {
        url: 'https://contact-manger-api.onrender.com/',
      },
      {
        url: 'http://localhost:5000',
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.js'],
};

module.exports = swaggerOptions;