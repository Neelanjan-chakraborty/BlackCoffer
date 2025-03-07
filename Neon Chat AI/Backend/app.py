from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO
from config import Config
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

app.config.from_object(Config)

# Initialize Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)  # Initialize bcrypt
jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Import Routes
from routes import *

# Create Database Tables
with app.app_context():
    db.create_all()

# Run the App
if __name__ == "__main__":
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)