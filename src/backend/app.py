from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, User
import urllib.parse
import os
import sys

# 1. Force the terminal to handle UTF-8 (Crucial for Windows/French locale)
if sys.platform == "win32":
    os.environ['PGCLIENTENCODING'] = 'utf-8'

app = Flask(__name__)
CORS(app) # Allows your React frontend to connect

# --- DATABASE CONFIGURATION ---
username = "postgres"
password = "postgres" 
database = "test26_db"

encoded_password = urllib.parse.quote_plus(password)

# Connection string with client_encoding fix
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f'postgresql://{username}:{encoded_password}@localhost:5432/{database}'
    '?client_encoding=utf8'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# 2. Automatically create/verify tables on startup
with app.app_context():
    try:
        db.create_all()
        print("Database connected and tables verified successfully.")
    except Exception as e:
        print("Database connection error: " + repr(e))

# --- API ROUTES ---

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "online", "message": "Backend server is running"})

# 3. GET all users (For testing)
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        return jsonify({"error": "Could not fetch users", "details": repr(e)}), 500

# 4. SIGNUP Route
@app.route('/users', methods=['POST'])
def add_user():
    data = request.json
    
    # Check if all fields are present
    if not data or not all(k in data for k in ("username", "email", "password")):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        new_user = User(
            username=data['username'], 
            email=data['email'], 
            password=data['password'] 
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Database write error", "details": repr(e)}), 400

# 5. LOGIN Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # Look for the user in PostgreSQL by email
    user = User.query.filter_by(email=email).first()

    # Compare password (plain text for now)
    if user and user.password == password:
        return jsonify({
            "message": "Login successful",
            "user": user.to_dict()
        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

if __name__ == '__main__':
    # Running on 127.0.0.1:5000
    app.run(host='127.0.0.1', port=5000, debug=True)