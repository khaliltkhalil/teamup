from models import User, Project, ProjectUserRole
from config import db, app


if __name__ == "__main__":
    with app.app_context():
        user = User.query.filter(User.id == 1).first()
        for project_role in user.projects_roles:
            print(project_role)
