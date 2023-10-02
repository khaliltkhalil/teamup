from config import ma
from models import User, Project


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User

    id = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()


user_schema = UserSchema()
users_schema = UserSchema(many=True)


class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Project

    id = ma.auto_field()
    title = ma.auto_field()
    description = ma.auto_field()
    status = ma.auto_field()
    created_at = ma.auto_field()
    deadline = ma.auto_field()


project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)
