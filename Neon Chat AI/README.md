# Neon Chat - A Flask & React AI Chat Application

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

---

## Overview

This project is a real-time chat application that allows users to communicate with each other and interact with an AI assistant. The application supports persistent chat history, user authentication, and WebSocket-based real-time messaging.

---

## Features

- **User Authentication**: Users can register, log in, and log out securely using JWT tokens.
- **Real-Time Messaging**: Messages are broadcasted to all connected clients in real time using WebSockets.
- **Persistent Chat History**: Chat messages are stored in a database and retrieved when a user logs in or refreshes the page.
- **AI Integration**: An AI assistant generates responses to user messages using OpenRouter.
- **Responsive UI**: A modern and responsive frontend built with React and Tailwind CSS.

---

## Tech Stack

### Backend

- **Flask**: Lightweight Python web framework.
- **Flask-SocketIO**: Real-time communication via WebSockets.
- **Flask-JWT-Extended**: Token-based authentication.
- **Flask-Bcrypt**: Password hashing.
- **SQLAlchemy**: ORM for database interactions.
- **OpenRouter**: AI integration for generating responses.

### Frontend

- **React**: JavaScript library for building the user interface.
- **TypeScript**: Adds static typing to JavaScript.
- **Socket.IO Client**: Real-time communication with the backend.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: Navigation and routing.

### Database

- **SQLite**: Lightweight relational database (can be replaced with PostgreSQL or MySQL for production).

---

## Project Structure

### Backend

```
backend/
├── app.py                # Main Flask application
├── routes.py             # API routes and WebSocket handlers
├── models.py             # SQLAlchemy database models
├── config.py             # Configuration settings
└── requirements.txt      # Python dependencies
```

### Frontend

```
frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Context providers (e.g., AuthContext)
│   ├── utils/            # Utility functions (e.g., API calls)
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── package.json          # Node.js dependencies
└── tsconfig.json         # TypeScript configuration
```

---

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- SQLite (or another supported database)
- OpenRouter API key

---

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repo/chat-app.git
   cd chat-app/backend
   ```

2. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set Environment Variables**
   Create a `.env` file in the `backend/` directory and add the following:

   ```env
   SECRET_KEY=your_secret_key
   JWT_SECRET_KEY=your_jwt_secret_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Initialize the Database**
   Run the following commands to create the database tables:

   ```bash
   flask shell
   >>> from app import db
   >>> db.create_all()
   ```

5. **Run the Server**
   Start the Flask development server:
   ```bash
   python app.py
   ```

---

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`.

---

## Usage

1. **Register a New User**

   - Navigate to the registration page and create a new account.

2. **Log In**

   - Use your credentials to log in and access the chat interface.

3. **Send Messages**

   - Type a message in the input box and press Enter to send it.
   - The AI assistant will respond to your messages in real time.

4. **View Chat History**
   - Refresh the page or log out and back in to see the persistent chat history.

---

## API Endpoints

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | `/register` | Register a new user            |
| POST   | `/login`    | Log in and receive a JWT token |
| GET    | `/messages` | Retrieve chat history          |

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Additional Notes

- **Deployment**: You can deploy the backend on platforms like Heroku or AWS, and the frontend on Vercel or Netlify.
- **Database Migration**: For production, consider using Alembic for database migrations.
- **Security**: Ensure sensitive data (e.g., API keys) is stored securely and not committed to version control.
