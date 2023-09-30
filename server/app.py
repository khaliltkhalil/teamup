#!/usr/bin/env python3

from config import app, db, api
from models import User
from flask_restful import Resource
from flask import request, session, make_response
from models_serialization import user_schema, users_schema
from werkzeug.exceptions import NotFound, BadRequest, abort
from sqlalchemy.exc import IntegrityError


@app.route("/api/v1")
def index():
    return "<h1>teamup api<h1/>"


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response({"message": "The requested resource does not exist."}, 404)

    return response


@app.errorhandler(BadRequest)
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


class Signup(Resource):
    def post(self):
        json = request.get_json()
        user = User(
            first_name=json.get("first_name"),
            last_name=json.get("last_name"),
            email=json.get("email"),
            password_hash=json.get("password"),
        )
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return make_response(user_schema.dump(user), 201)


class Signin(Resource):
    def post(self):
        json = request.get_json()
        email = json.get("email")
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
        print(session["user_id"])

        return make_response(user_schema.dump(user), 200)


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

if __name__ == "__main__":
    app.run(port=5555, debug=True)
