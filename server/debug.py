from models import User, Project, ProjectUserRole
from config import db, app
from models_serialization import (
    user_schema,
    single_project_role_schema,
    plural_project_role_schema,
)


if __name__ == "__main__":
    with app.app_context():
        user = User.query.filter(User.id == 1).first()
        print(user_schema.dump(user))
        print(plural_project_role_schema.dump(user.projects_roles)[0])
