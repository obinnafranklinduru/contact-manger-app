# Contact Manager API

This is a Contact Manager API built with Node.js that demonstrates CRUD operations on a database and utilizes JSON Web Tokens (JWT) for user authentication. It provides endpoints for creating, reading, updating, and deleting users and contacts.

## Installation

1. Clone the repository: `git clone https://github.com/obinnafranklinduru/contact-manger-app`
2. Install dependencies: `npm install`
3. Set up environment variables:
   - Create a `.env` file in the project root directory
   - Provide the following variables in the `.env` file:
     ```
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     ```
4. Start the server: `npm start`

The API will be accessible at `http://localhost:5000`.

## Features

- User registration: Users can create an account by providing a unique username, an email address and password.
- User login: Users can log in with their password and either username or email address and receive a JWT token for authentication.
- Create contact: Authenticated users can create a new contact by providing a name, email and phone.
- Get contacts: Users can retrieve a list of all contact they have created or view a specific contact by its ID.
- Update contact: Users can update contact that they created.
- Delete contact: Users can delete contact that they created.

## API Routes

| Route             | Method | Description                      |
| ----------------- | ------ | -------------------------------- |
| /v1/auth/register | POST   | Register a new user              |
| /v1/auth/login    | POST   | Log in and get JWT token         |
| /v1/auth/logout   | POST   | Log out and invalidate JWT token |
| /v1/users         | GET    | Get all users                    |
| /v1/users/:id     | GET    | Get a user by ID                 |
| /v1/users         | PUT    | Update a user by ID              |
| /v1/users         | DELETE | Delete a user by ID              |
| /v1/contacts      | GET    | Get all contacts                 |
| /v1/contacts/:id  | GET    | Get a contact by ID              |
| /v1/contacts      | POST   | Create a new contact             |
| /v1/contacts/:id  | PUT    | Update a contact by ID           |
| /v1/contacts/:id  | DELETE | Delete a contact by ID           |

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

## Testing the API

Run Test in [Postman](https://documenter.getpostman.com/view/26953456/2s93mBxKBs)

Run Test in [Swagger UI](https://contact-manger-api.onrender.com/api-docs/)

## Error Handling

The API handles errors by returning appropriate HTTP status codes and error messages. Common error scenarios include invalid requests, unauthorized access, and internal server errors. Error messages are returned in JSON format for easy consumption by clients.

## Deployment

To deploy the API to a production, you can use platforms like Render, Cyclic, Heroku, AWS, or Azure. But this project was deployed on Render Platform. Here are some steps to deploy:

### Prerequisites

Before you begin, make sure you have the following:

- A Render account. Sign up at https://render.com if you don't have one yet.
- Your Node.js application code ready in a Git repository.

### Steps

1. Log in to Render.

2. Create a new service:

   - Click on "Create a new service" on the dashboard.
   - Select "Web Service" as the service type.
   - Choose your Git repository where your Node.js application code resides.
   - Select the branch you want to deploy (e.g., `main`).
   - Specify the build command. For example, if your `server.js` file is the entry point, use `node server.js`.
   - Click on "Next" to proceed.

3. Configure your service:

   - Give your service a name (e.g., "my-node-app").
   - Choose the region where your service should be deployed.
   - Set up any environment variables required for your application (e.g., database connection strings, JWT_SECRET keys).
   - Add any necessary start command arguments.
   - Click on "Create Web Service" to create your service.

4. Wait for the build and deployment to complete:

   - Render will fetch your application's code, install dependencies, and build the application.
   - Once the build process is complete, Render will deploy your application and make it accessible.

5. Access your deployed application:

   - Once the deployment is successful, Render will provide you with a URL where your application is accessible.
   - You can find the URL on the service dashboard or in the deployment logs.

6. Test your application:
   - Open the provided URL in your web browser to test your deployed Node.js application.
   - Ensure that all functionality works as expected.

For more information on deploying and managing services on Render, refer to the official Render documentation: [Render Docs](https://render.com/docs).

## Contributing

Contributions to the project are welcome! If you find any issues or would like to suggest improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
