from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re

email_regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b"


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    @validates("first_name")
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError("first_name must be provided")
        return first_name

    @validates("last_name")
    def validate_first_name(self, key, last_name):
        if not last_name:
            raise ValueError("last_name must be provided")
        return last_name

    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("email must be provided")
        if not re.fullmatch(email_regex, email):
            raise ValueError("email is not valid")
        return email

    @hybrid_property
    def password_hash(self):
        # raise Exception("Password hashes may not be viewed.")
        pass

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 6:
            raise ValueError("password must be longer than 6 characters")

        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"User {self.username}, ID: {self.id}"
