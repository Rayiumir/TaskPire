<p align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./Logo/TaskPire_Dark.png">
        <source media="(prefers-color-scheme: light)" srcset="./Logo/TaskPire_Light.png">
        <img alt="TaskSquad Logo" src="./Logo/TaskPire_Light.png">
    </picture>
</p>

# TaskPire

TaskPire is a task management tool built with React and Vite. It provides a simple and intuitive interface for managing tasks.

## Getting Started

To get started with TaskPire, clone the repository and install the dependencies:

```bash
https://github.com/Rayiumir/TaskPire.git
cd taskpire/
```

Running the backend server:

```bash
cd backend/
npm install
npm start
```

then, Running the frontend server:

```bash
cd frontend/TaskPire/
npm install
npm install vite --save-dev
npm run build
```

Open your browser and navigate to `http://localhost:5173` to see the app in action.

# Connection Database

To connect to the MongoDB database, you must complete the .env file with your database credentials.

```
MONGO_URI=mongodb://localhost:27017/MyProject
JWT_SECRET=your_JWT_SECRET
ADMIN_INVITE_TOKEN=4588944
PORT=5000
```

To create admin access, just change from `user` to `admin` in the `users` section in the `Role` column of the database.

## Contributing

We welcome contributions to TaskPire! If you'd like to contribute, please fork the repository and submit a pull request.

# Screenshots

<table class="table">
  <tbody>
    <tr>
      <td>
        <img src="../TaskPire/Screenshots/1.png" width="100%" alt="Admin Index">
      </td>
      <td>
        <img src="../TaskPire/Screenshots/2.png" width="100%" alt="Tasks">
      </td>
      <td>
        <img src="../TaskPire/Screenshots/3.png" width="100%" alt="Create Tasks">
      </td>
      <td>
        <img src="../TaskPire/Screenshots/4.png" width="100%" alt="Users">
      </td>
    </tr>
  </tbody>
</table>
<table class="table">
