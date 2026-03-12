from flask_sqlalchemy import SQLAlchemy

# 1. Initialize the db object HERE first
db = SQLAlchemy()

# 2. Now you can use db.Model because 'db' is defined above
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username, 
            "email": self.email
        }