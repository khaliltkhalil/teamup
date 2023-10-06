# combine project,role dictionary in a single dictionary


def combine_project_role(projects_roles):
    projects = []
    for data in projects_roles:
        project = data["project"]
        project["role"] = data["role"]
        projects.append(project)
    return projects


def combine_user_role(users_roles):
    users = []
    for data in users_roles:
        user = data["user"]
        user["role"] = data["role"]
        users.append(user)
    return users
