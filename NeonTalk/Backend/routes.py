from flask import request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
from flask_socketio import emit, disconnect
from openai import OpenAI
from app import app, db, bcrypt, socketio
from models import User, Message
import os

# Initialize OpenRouter client
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

# Dictionary to store connected users
connected_users = {}

# User Registration
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = User(username=data["username"], password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# User Login
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        print(f"Received login data: {data}")  # Log the incoming data

        if not data or "username" not in data or "password" not in data:
            return jsonify({"message": "Missing username or password"}), 400

        user = User.query.filter_by(username=data["username"]).first()

        if user and bcrypt.check_password_hash(user.password, data["password"]):
            access_token = create_access_token(identity=user.username)
            print(f"Login successful for user: {user.username}")
            return jsonify({"token": access_token}), 200
        else:
            print("Invalid credentials")
            return jsonify({"message": "Invalid credentials"}), 401
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return jsonify({"message": "An error occurred during login"}), 500

# Get Chat Messages
@app.route("/messages", methods=["GET"])
@jwt_required()
def get_messages():
    messages = Message.query.order_by(Message.timestamp.asc()).all()
    return jsonify([{
        "sender": msg.sender,
        "content": msg.content,
        "timestamp": msg.timestamp.isoformat()
    } for msg in messages])

# WebSocket Authentication
@socketio.on("connect")
def authenticate_websocket(auth):
    if not auth or "token" not in auth:
        print("Missing token. Rejecting WebSocket connection.")
        emit("error", {"message": "Missing token. Please log in."})
        return False

    token = auth["token"]

    # Validate token format
    if not isinstance(token, str) or '.' not in token:
        print("Invalid token format. Rejecting WebSocket connection.")
        emit("error", {"message": "Invalid token format. Please log in again."})
        return False

    try:
        # Decode the token manually
        decoded_token = decode_token(token)
        username = decoded_token["sub"]  # Extract the identity (username)
        connected_users[request.sid] = username
        print(f"User {username} connected to WebSocket.")
        return True
    except Exception as e:
        print(f"Token decoding failed: {str(e)}")
        emit("error", {"message": "Invalid token. Please log in again."})
        return False

@socketio.on("disconnect")
def handle_disconnect():
    if request.sid in connected_users:
        del connected_users[request.sid]

# Generate AI Response
def generate_ai_response(user_message):
    try:
        completion = client.chat.completions.create(
            model="cognitivecomputations/dolphin3.0-mistral-24b:free",
            messages=[{"role": "user", "content": user_message}],
            extra_headers={"HTTP-Referer": "http://yourdomain.com", "X-Title": "Your App Name"}
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"AI Error: {str(e)}")
        return "I'm sorry, I couldn't generate a response right now."

# Handle Incoming Messages
@socketio.on("message")
def handle_message(data):
    sender = connected_users.get(request.sid)
    if not sender:
        emit("error", {"message": "Unauthorized"})
        return

    if not isinstance(data, dict) or "text" not in data or not isinstance(data["text"], str):
        emit("error", {"message": "Invalid message format"})
        return

    content = data["text"]

    # Save user message
    try:
        user_msg = Message(sender=sender, content=content)
        db.session.add(user_msg)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        emit("error", {"message": "Failed to save message"})
        return

    emit("message", {"sender": sender, "text": content})

    # Generate AI response
    ai_response = generate_ai_response(content)
    ai_msg = Message(sender="AI Assistant", content=ai_response)
    db.session.add(ai_msg)
    db.session.commit()
    emit("message", {"sender": "AI Assistant", "text": ai_response})