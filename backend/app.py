from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models.models import db, User, Listing  # Import db from models

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
# db = SQLAlchemy(app)

# Initialize the database with the app
db.init_app(app)

@app.route('/')
def index():
    return "Flask backend is running!"

# 1. User Registration
@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')  # Ideally, hash the password here

    # Check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    # Create a new user
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully!"}), 201

# 2. Create a Listing
@app.route('/api/listings', methods=['POST'])
def create_listing():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    user_id = data.get('user_id')

    # Create a new listing
    new_listing = Listing(title=title, description=description, price=price, user_id=user_id)
    db.session.add(new_listing)
    db.session.commit()

    return jsonify({"message": "Listing created successfully!"}), 201

# 3. Get All Listings
@app.route('/api/listings', methods=['GET'])
def get_all_listings():
    listings = Listing.query.all()
    results = [
        {
            "id": listing.id,
            "title": listing.title,
            "description": listing.description,
            "price": listing.price,
            "user_id": listing.user_id
        } for listing in listings
    ]
    return jsonify(results), 200

# 4. Get a Specific Listing
@app.route('/api/listings/<int:id>', methods=['GET'])
def get_listing(id):
    listing = Listing.query.get(id)
    if not listing:
        return jsonify({"message": "Listing not found"}), 404

    result = {
        "id": listing.id,
        "title": listing.title,
        "description": listing.description,
        "price": listing.price,
        "user_id": listing.user_id
    }
    return jsonify(result), 200

if __name__ == '__main__':
    app.run(debug=True)