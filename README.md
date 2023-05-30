# Contact Manager Node.js API

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

## API Routes

| Route              | Method | Description                      |
| ------------------ | ------ | -------------------------------- |
| /api/auth/register | POST   | Register a new user              |
| /api/auth/login    | POST   | Log in and get JWT token         |
| /api/auth/logout   | POST   | Log out and invalidate JWT token |
| /api/users         | GET    | Get all users                    |
| /api/users/:id     | GET    | Get a user by ID                 |
| /api/users/:id     | PUT    | Update a user by ID              |
| /api/users/:id     | DELETE | Delete a user by ID              |
| /api/contacts      | GET    | Get all contacts                 |
| /api/contacts/:id  | GET    | Get a contact by ID              |
| /api/contacts      | POST   | Create a new contact             |
| /api/contacts/:id  | PUT    | Update a contact by ID           |
| /api/contacts/:id  | DELETE | Delete a contact by ID           |

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT)

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).
