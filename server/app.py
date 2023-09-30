#!/usr/bin/env python3

from config import app, db, api
from models import User
from flask_restful import Resource
from flask import request, session, make_response
from models_serialization import user_schema, users_schema
from werkzeug.exceptions import NotFound
from sqlalchemy.exc import IntegrityError


@app.route("/api/v1")
def index():
    return "<h1>teamup api<h1/>"


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response({"message": "The requested resource does not exist."}, 404)

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
        return make_response(user_schema.dump(user))


api.add_resource(Signup, "/api/v1/signup", endpoint="signup")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
