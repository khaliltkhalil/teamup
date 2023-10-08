#!/usr/bin/env python3

from config import app, db, api
from models import User, Project, ProjectUserRole, Task
from flask_restful import Resource
from flask import request, session, make_response, render_template
from models_serialization import (
    user_schema,
    users_schema,
    project_schema,
    tasks_schema,
    task_schema,
)
from werkzeug.exceptions import NotFound, BadRequest, Forbidden, abort
from sqlalchemy.exc import IntegrityError
from sqlalchemy import or_
from models_serialization import (
    plural_project_role_schema,
    plural_user_role_schema,
    single_user_role_schema,
)
from helper import combine_project_role, combine_user_role
from datetime import datetime


# @app.route("/api/v1")
# def index():
#     return "<h1>teamup api<h1/>"


# @app.route("/")
# @app.route("/signin")
# @app.route("/signup")
# def index():
#     return render_template("index.html")


protected_endpoints = [
    "logout",
    "check_session",
    "projects_by_user",
    "users",
    "projects_users_roles",
    "get_tasks",
    "task_by_id",
]


@app.before_request
def check_session():
    if not session.get("user_id") and request.endpoint in protected_endpoints:
        return make_response({"message": "Unauthorized"}, 401)


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response({"message": "The requested resource does not exist."}, 404)

    return response


@app.errorhandler(BadRequest)
def handle_bad_request(e):
    response = make_response({"message": str(e)}, 400)
    return response


@app.errorhandler(Forbidden)
def handle_bad_request(e):
    response = make_response({"message": str(e)}, 400)
    return response


@app.errorhandler(IntegrityError)
def handle_integrity_error(e):
    return make_response({"message": str(e.orig)}, 400)


@app.errorhandler(ValueError)
def handle_value_error(e):
    response = make_response({"message": str(e)}, 400)

    return response


@app.errorhandler(TypeError)
def handle_value_error(e):
    response = make_response({"message": str(e)}, 400)

    return response


class Signup(Resource):
    def post(self):
        json = request.get_json()
        user = User(
            first_name=json.get("first_name"),
            last_name=json.get("last_name"),
            email=json.get("email").lower(),
            password_hash=json.get("password"),
        )
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return make_response(user_schema.dump(user), 201)


class Signin(Resource):
    def post(self):
        json = request.get_json()
        email = json.get("email").lower()
        password = json.get("password")
        if not email or not password:
            abort(400, "email and password must provided")
        user = User.query.filter(User.email == email).first()

        if not user or not user.authenticate(password):
            response = make_response(
                {"message": "email or/and password not correct"}, 401
            )
            return response

        session["user_id"] = user.id

        return make_response(user_schema.dump(user), 200)


class Logout(Resource):
    def delete(self):
        session["user_id"] = None

        return make_response({"message": "User logged out"}, 200)


api.add_resource(Logout, "/api/v1/logout", endpoint="logout")
api.add_resource(Signup, "/api/v1/signup", endpoint="signup")
api.add_resource(Signin, "/api/v1/signin", endpoint="signin")


class CheckSession(Resource):
    def get(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"message": "unauthorized"}, 401)
        user = User.query.filter(User.id == user_id).first()

        return make_response(user_schema.dump(user), 200)


api.add_resource(CheckSession, "/api/v1/check_session", endpoint="check_session")


class ProjectsByUser(Resource):
    def get(self):
        user_id = session["user_id"]
        user = User.query.filter(User.id == user_id).first()
        projects_roles = plural_project_role_schema.dump(user.projects_roles)
        projects = combine_project_role(projects_roles)
        return make_response(projects, 200)

    def post(self):
        user_id = session["user_id"]
        json = request.get_json()
        project = Project(
            title=json.get("title"),
            description=json.get("description"),
            status="pending",
            deadline=datetime.strptime(json.get("deadline"), "%Y-%m-%d"),
        )

        db.session.add(project)
        db.session.commit()
        project_user_role = ProjectUserRole(
            user_id=user_id, project_id=project.id, role="manager"
        )
        db.session.add(project_user_role)
        db.session.commit()

        return make_response(project_schema.dump(project), 201)


class Users(Resource):
    def get(self):
        user_id = session["user_id"]
        project_id = request.args.get("project_id")
        email = request.args.get("email")
        limit = request.args.get("limit")

        if project_id:
            project_user_role = ProjectUserRole.query.filter(
                ProjectUserRole.user_id == user_id,
                ProjectUserRole.project_id == project_id,
            ).all()

            if not project_user_role:
                abort(403, "Can't access this project")

            users_roles = ProjectUserRole.query.filter(
                ProjectUserRole.project_id == project_id,
            ).all()
            users = combine_user_role(plural_user_role_schema.dump(users_roles))
            return make_response(users, 200)

        elif email:
            users = User.query.filter(User.email.contains(email)).limit(limit or 10)
            return make_response(users_schema.dump(users), 200)

        # no name  has been provided
        abort(400, "email must be provided as query string")


class ProjectsUsersRoles(Resource):
    def post(self):
        user_id = session["user_id"]
        json = request.get_json()
        new_user_id = json.get("user_id")
        project_id = json.get("project_id")
        role = json.get("role")
        if not new_user_id or not project_id or not role:
            abort(400, "user_id and project_id and role must be provided")
        # check role for this user_id

        project_user_role = ProjectUserRole.query.filter(
            ProjectUserRole.user_id == user_id,
            ProjectUserRole.project_id == project_id,
        ).first()

        if not project_user_role or project_user_role.role != "manager":
            abort(403, "Can't add members to this project")

        # check uniqueness

        project_user_role = ProjectUserRole.query.filter(
            ProjectUserRole.user_id == new_user_id,
            ProjectUserRole.project_id == project_id,
        ).first()

        if project_user_role:
            abort(400, "user already in this project")

        new_user_project_role = ProjectUserRole(
            user_id=new_user_id, project_id=project_id, role=role
        )
        db.session.add(new_user_project_role)
        db.session.commit()
        user_role = single_user_role_schema.dump(new_user_project_role)
        user = user_role["user"]
        user["role"] = user_role["role"]
        return make_response(user, 201)


class Tasks(Resource):
    def get(self):
        user_id = session["user_id"]
        project_id = request.args.get("project_id")

        # check role for this user_id, project_id
        project_user_role = ProjectUserRole.query.filter(
            ProjectUserRole.user_id == user_id,
            ProjectUserRole.project_id == project_id,
        ).first()

        if not project_user_role:
            abort(403, "Can't access this project")

        tasks = Task.query.filter(Task.project_id == project_id).all()

        return make_response(tasks_schema.dump(tasks), 200)

    def post(self):
        user_id = session["user_id"]
        json = request.get_json()
        member_user_id = json.get("user_id")
        project_id = json.get("project_id")
        title = json.get("title")
        deadline = json.get("deadline")
        if not title or not member_user_id or not title or not deadline:
            abort(400, "missing info")

        # check role for this user_id
        project_user_role = ProjectUserRole.query.filter(
            ProjectUserRole.user_id == user_id,
            ProjectUserRole.project_id == project_id,
        ).first()

        if not project_user_role or project_user_role.role != "manager":
            abort(403, "Can't add task to this project")

        task = Task(
            title=title,
            status="pending",
            deadline=datetime.strptime(json.get("deadline"), "%Y-%m-%d"),
            user_id=member_user_id,
            project_id=project_id,
        )
        db.session.add(task)
        db.session.commit()
        return make_response(task_schema.dump(task), 201)


class TaskById(Resource):
    def patch(self, id):
        user_id = session["user_id"]
        json = request.get_json()

        task = Task.query.filter(Task.id == id).first()

        if not task:
            abort(400, "task doesn't exist")

        # check if the requesting user is the owner of this task
        if task.user.id != user_id:
            abort(403, "Unauthorized, can't modify this task")

        for attr in json:
            setattr(task, attr, json[attr])
        db.session.add(task)
        db.session.commit()

        return make_response(task_schema.dump(task), 200)

    def delete(self, id):
        user_id = session["user_id"]

        task = Task.query.filter(Task.id == id).first()

        if not task:
            abort(400, "task doesn't exist")

        project_id = task.project_id

        # check role for this user_id
        project_user_role = ProjectUserRole.query.filter(
            ProjectUserRole.user_id == user_id,
            ProjectUserRole.project_id == project_id,
        ).first()

        if not project_user_role or project_user_role.role != "manager":
            abort(403, "Can't delete task from this project")

        db.session.delete(task)
        db.session.commit()

        return make_response({"message": "task has been deleted"}, 200)


api.add_resource(ProjectsByUser, "/api/v1/projects", endpoint="projects_by_user")
api.add_resource(Users, "/api/v1/users", endpoint="users")
api.add_resource(
    ProjectsUsersRoles, "/api/v1/projects_users_roles", endpoint="projects_users_roles"
)
api.add_resource(Tasks, "/api/v1/tasks", endpoint="get_tasks")
api.add_resource(TaskById, "/api/v1/tasks/<int:id>", endpoint="task_by_id")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
