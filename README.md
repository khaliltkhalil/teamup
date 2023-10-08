# Teamup

A platform to manage and collaborate on projects.

Strive allows you to keep records of all your workouts routines.

## Live Demo:

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

Move to the server directory :

```bash
cd server
```

Run the database migration :

```bash
alembic upgrade head
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

On the home page you will find a summury of all your workouts by year.

On the workouts page you can view all of your workouts.

To add a workout for today's date, click the add button in the nav bar.

To add an exercise, type the exercise name and click add exercise.

To edit an exercise, click the edit button on the exercise card then add, update or delete sets.

On the profile page you can view and update your info.

![](https://github.com/khaliltkhalil/strive/blob/main/Strive-demo.gif)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
