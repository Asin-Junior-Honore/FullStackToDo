# Full Stack To-Do App

Welcome to my Full Stack To-Do App! This application allows you to manage your tasks effectively by performing CRUD (Create, Read, Update, Delete) operations. Whether you're organizing your daily activities or managing a project, this app has got you covered!

## Features

- Create new tasks with titles and descriptions.
- Read existing tasks to see what needs to be done.
- Update tasks to mark them as completed or edit their details.
- Delete tasks that are no longer needed.

## Technologies Used

- **Frontend:**
  - EJS/CSS
  - JavaScript
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
- **Authentication:**
  - JSON Web Tokens (JWT) for signup and login authentication

## Usage

- **Create:** Click on the "Add Task" button to create a new task. Fill in the title and description, then click "Save".
- **Read:** All tasks are displayed on the main page. Click on any task to view its details.
- **Update:** To edit a task's details, click on the "Edit" button next to the delete button.
- **Delete:** To remove a task, click on the "Delete" button next to the edit button.

## Installation

1. Clone this repository using `git
2. insert your mongoDB URI in .env file
3. suggest any port number you want to use(default is 3000) and place it in your .env file aswell
4. Run `npm install` from root
5. Start server by running `nodemon server.js` or npm run devStart
