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
    email = db.Column(db.String, unique=True, nullable=False)
    projects = db.relationship("ProjectUserRole", back_populates="project")

    _password_hash = db.Column(db.String)

    @validates("first_name")
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError("first_name must be provided")
        return first_name

    @validates("last_name")
    def validate_last_name(self, key, last_name):
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
        if not password:
            raise ValueError("password must be provided")
        if len(password) < 6:
            raise ValueError("password must be longer than 6 characters")

        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"User {self.username}, ID: {self.id}"


class Project(db.Model):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    deadline = db.Column(db.DateTime)

    users = db.relationship("ProjectUserRole", back_populates="project")

    @validates("title")
    def validate_title(self, key, title):
        if not title:
            raise ValueError("title must be provided")
        return title

    statusValues = ["pending", "ongoing", "completed"]

    @validates("status")
    def validate_status(self, key, status):
        if not status or status not in self.statusValues:
            raise ValueError("status must be pending, ongoing, or completed")
        return status

    @validates("deadline")
    def validate_deadline(self, key, deadline):
        if not deadline:
            raise ValueError("deadline must be provided")
        return deadline

    def __repr__(self):
        return f"Project {self.title} deadline {self.deadline}"


class ProjectUserRole(db.Model):
    __tablename__ = "projects_users_roles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))
    role = db.Column(db.String, nullable=False)

    project = db.relationship("Project", back_populates="users")
    user = db.relationship("User", back_populates="projects")

    roleValues = ["manager", "member"]

    @validates("role")
    def validate_role(self, key, role):
        if not role or role not in self.roleValues:
            raise ValueError("role must be manager or member")
        return role

    def __repr__(self):
        return f"user {self.user_id} project {self.project_id} role {self.role}"
