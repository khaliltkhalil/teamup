#!/usr/bin/env python3

from config import app, db, api
from models import User
from flask_restful import Resource
from flask import request, session, make_response
from models_serialization import user_schema, users_schema


@app.route("/api/v1")
def index():
    return "<h1>teamup api<h1/>"


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
