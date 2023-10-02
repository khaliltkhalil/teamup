from config import ma
from models import User, Project, ProjectUserRole


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


class ProjectRoleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProjectUserRole

    project = ma.Nested(ProjectSchema)
    role = ma.auto_field()


single_project_role_schema = ProjectRoleSchema()
plural_project_role_schema = ProjectRoleSchema(many=True)


class UserRoleSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProjectUserRole

    user = ma.Nested(UserSchema)
    role = ma.auto_field()


single_user_role_schema = UserRoleSchema()
plural_user_role_schema = UserRoleSchema(many=True)
