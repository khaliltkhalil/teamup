from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import os
from flask_cors import CORS


load_dotenv()
app = Flask(__name__)
CORS(app)
app.secret_key = b"Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
# os.environ.get("DATABASE_URI")

db = SQLAlchemy()
migrate = Migrate(app, db)

db.init_app(app)
ma = Marshmallow(app)
bcrypt = Bcrypt(app)

api = Api(app)
