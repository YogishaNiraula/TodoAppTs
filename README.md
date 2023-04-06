# TodoAppTs

A simple Todo App made with ###React-Typescript

## Running the project

Install the dependencies...

```bash
npm install
```

...then start in development mode:

```bash
npm run dev
```

Navigate to [localhost:3000](http://localhost:3000). The app should be running after the build is finished.

## Prerequisite

- Basic knowledge of Javascript and React.
- Storing data in indexedDB.

## Project Requirements

> - Build a simple todo app using indexedDB as database.

### 1. Tasks

Make tasks with following features:

- The app should have task title, description, completed status.
- The app should have task add, task delete and task edit feature.
- Tasks should be displayed in list.
- User should be able to add tasks with a form to add task title,description and completed status.
- User should be able to edit a task's title and description.
- User should be able to delete a task.
- User should be able to change the status of task completion.
 > - Completed task's title should be strike-through.
- Use indexedDB to store user's tasks.

### 2. Projects

- Group tasks into projects. Each project should be unique and have set of it's own tasks.
- Projects should be displayed in list on sidebar of app.
- User should be able to add a project with a form to add project name and task's title, description and completed status.
- User should be able to edit a project.
- User should be able to delete a project.
- User should be able to add, delete, edit or complete tasks within each project.
- Use indexedDB to store projects and it's respective set of tasks.

### Note
1. All input fields in the form should have `required` validation before it can be submitted.
2. For adding and editing features, make use of modal to display form.

