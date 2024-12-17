from app import app
from models.models import db, User, Listing

with app.app_context():
    db.create_all()
    print("Database tables created successfully!")
