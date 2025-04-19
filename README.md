# Question-Answer Assignment

This project is a Question-Answer system built using **Node.js**, **Express**, and **MongoDB**. It follows **Object-Oriented Programming (OOP)** principles and includes features like user authentication, category and question management, and answer submission.

## Features

1. **User Management**:
   - User signup with email verification.
   - User login with JWT authentication.
   - View and update user profile (including profile picture upload).

2. **Category Management**:
   - Create categories.
   - Fetch all categories with question counts.

3. **Question Management**:
   - Add questions in bulk via CSV upload.
   - Create single questions.
   - Fetch questions by category.

4. **Answer Management**:
   - Submit answers for questions.
   - Search questions with answers submitted by the user.

5. **Swagger API Documentation**:
   - Comprehensive API documentation available at `/api-docs`.

---

## Project Structure

```
c:\Users\SUMIT\Downloads\question-answer-assignment
├── controllers/         # Contains all controller classes
├── middlewares/         # Contains middleware (e.g., authMiddleware)
├── models/              # Contains Mongoose models
├── routes/              # Contains route definitions
├── uploads/             # Directory for uploaded files
├── .env                 # Environment variables
├── index.js             # Entry point of the application
├── swagger.json         # Swagger API documentation
└── README.md            # Project documentation
```

---

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or accessible via URI)
- **npm** (Node Package Manager)

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd question-answer-assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file:
   Create a `.env` file in the root directory with the following variables:
   ```
   MONGO_URI=mongodb://localhost:27017/question-answer-assignment
   JWT_SECRET=your_jwt_secret_key
   BASE_URL=http://localhost:5000
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_email@example.com
   SMTP_PASS=your_email_password
   ```

4. Start the MongoDB server:
   ```bash
   mongod
   ```

5. Run the application:
   - For development mode:
     ```bash
     npm run dev
     ```
   - For production mode:
     ```bash
     npm start
     ```

6. Access the application:
   - API base URL: `http://localhost:5000/api`
   - Swagger documentation: `http://localhost:5000/api-docs`

---

## API Documentation (Swagger)

The project includes Swagger documentation for all APIs. You can access it at `http://localhost:5000/api-docs`.

### How to Use Swagger

1. Open your browser and navigate to `http://localhost:5000/api-docs`.
2. Explore the available APIs grouped under:
   - **Users**: User-related operations (signup, login, profile, etc.).
   - **Categories**: Category-related operations.
   - **Questions**: Question-related operations.
   - **Answers**: Answer-related operations.
3. Use the "Try it out" feature to test the APIs directly from the Swagger UI.

---

## Key Files and Their Purpose

### `index.js`
- Entry point of the application.
- Sets up middleware, routes, and database connection.

### `controllers/`
- Contains controller classes for handling business logic:
  - `userController.js`: Handles user-related operations.
  - `categoryController.js`: Handles category-related operations.
  - `questionController.js`: Handles question-related operations.
  - `answerController.js`: Handles answer-related operations.

### `routes/`
- Defines API routes and maps them to controller methods:
  - `userRoutes.js`: Routes for user-related APIs.
  - `categoryRoutes.js`: Routes for category-related APIs.
  - `questionRoutes.js`: Routes for question-related APIs.
  - `answerRoutes.js`: Routes for answer-related APIs.

### `models/`
- Contains Mongoose models for MongoDB collections:
  - `User.js`: User schema.
  - `Category.js`: Category schema.
  - `Question.js`: Question schema.
  - `Answer.js`: Answer schema.

### `swagger.json`
- Defines the Swagger API documentation.

---

## How to Modify the Project

1. **Add New Features**:
   - Create a new controller class in the `controllers/` directory.
   - Define routes in the corresponding file in the `routes/` directory.
   - Update `swagger.json` to document the new API.

2. **Change Database Configuration**:
   - Update the `MONGO_URI` in the `.env` file.

3. **Change Email Configuration**:
   - Update the `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` in the `.env` file.

4. **Update Swagger Documentation**:
   - Modify the `swagger.json` file to reflect changes in the API.

---

## Example API Usage

### User Signup
**Endpoint**: `POST /api/users/signup`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "message": "User registered. Please verify your email."
}
```

---

### Submit Answer
**Endpoint**: `POST /api/answers/submit`

**Headers**:
```json
{
  "Authorization": "Bearer <your_jwt_token>"
}
```

**Request Body**:
```json
{
  "questionId": "64f3c9e2b5d1c2a1f8e4a123",
  "selectedOption": "Option A"
}
```

**Response**:
```json
{
  "message": "Answer submitted successfully"
}
```

---

## Troubleshooting

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running and the `MONGO_URI` in `.env` is correct.

2. **Email Not Sent**:
   - Verify the SMTP configuration in `.env`.
   - Check if the email credentials are correct.

3. **Swagger Not Accessible**:
   - Ensure the application is running and accessible at `http://localhost:5000`.

---

## License

This project is licensed under the ISC License.