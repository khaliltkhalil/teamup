# Teamup

A platform to manage and collaborate on projects.

## Live Demo

https://teamup-ptao.onrender.com

## Installation and running

Fork and clone the repository to your local machine.

Install dependencies :

```bash
npm install --prefix client
pipenv install && pipenv shell
```

Build the production version :

```bash
npm run build --prefix client
```

Create .env file

Add the following variables to .env file

DATABASE_URI=sqlite:///app.db

SECRET_KEY=random_secrete_key

Move to the server directory :

```bash
cd server
```

Run the database migration :

```bash
flask db upgrade
```

If you want you can seed the database :

```bash
python seed.py
```

Start the server :

```bash
gunicorn app:app
```

App will be running on http://localhost:8000

## Usage

First login or create an account.

Too see all your projects go to projects.

To View a project you can click view on the project card.

You can create a new project from Add Project.

Once you are in a certain project you can view all tasks in this project.

To add members to this project click Project Members

You can search users and add them to your project

You can create a task in the project and assign it to a member.

If you created a project you will be the manager.

If someone add you to a project you will be a member in this project

If you are a manager you can add and delete tasks.

You can only edit a task status if you are the owner of the task.

![](https://github.com/khaliltkhalil/teamup/blob/main/teamup-demo.gif)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
