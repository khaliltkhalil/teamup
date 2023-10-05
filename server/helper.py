# combine project,role dictionary in a single dictionary


def combine_project_role(projects_roles):
    projects = []
    for data in projects_roles:
        project = data["project"]
        project["role"] = data["role"]
        projects.append(project)
    return projects
