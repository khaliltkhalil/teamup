from random import choice as rc
from faker import Faker
from models import User, Project, ProjectUserRole, Task
from datetime import datetime
from config import db, app


fake = Faker()


def clear_db():
    User.query.delete()
    Project.query.delete()
    ProjectUserRole.query.delete()


def create_users():
    users = []
    for _ in range(5):
        first_name = fake.first_name()
        last_name = fake.last_name()
        user = User(
            first_name=first_name,
            last_name=last_name,
            email=f"{first_name.lower()}@gmail.com",
            password_hash=f"{first_name}123456",
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()


def add_projects_for_user(user_id):
    user = User.query.filter(User.id == user_id).first()
    for _ in range(5):
        project = Project(
            title=fake.sentence(),
            description=fake.paragraph(nb_sentences=3),
            status="pending",
            deadline=datetime(2023, 12, 1),
        )

        project_user_role = ProjectUserRole(project=project, user=user, role="manager")

        db.session.add(project_user_role)
        db.session.commit()


def add_tasks_for_user_project(user_id, project_id):
    for _ in range(10):
        task = Task(
            title=fake.sentence(),
            description=fake.paragraph(nb_sentences=3),
            status="pending",
            deadline=datetime(2023, 12, 1),
            project_id=project_id,
            user_id=user_id,
        )
        db.session.add(task)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        clear_db()
        create_users()
        add_projects_for_user(1)
        add_tasks_for_user_project(1, 1)
