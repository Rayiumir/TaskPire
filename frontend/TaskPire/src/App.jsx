import React from "react"
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import AdminIndex from "./pages/Admin/AdminIndex.jsx";
import Tasks from "./pages/Admin/Tasks.jsx";
import Create from "./pages/Admin/Create.jsx";
import Users from "./pages/Admin/Users.jsx";
import MyTasks from "./pages/Users/MyTasks.jsx";
import UserIndex from "./pages/Users/UserIndex.jsx";
import TaskDetails from "./pages/Users/TaskDetails.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";

const App = () => {
  return (
      <div>
          <Router>
              <Routes>
                  <Route path="/login" element={<Login/>}></Route>
                  <Route path="/signup" element={<SignUp/>}></Route>

                  {/* Admin */}
                  <Route element={<PrivateRoute allowedRoles={["admin"]}/>}>
                      <Route path="/admin/index" element={<AdminIndex/>}></Route>
                      <Route path="/admin/tasks" element={<Tasks/>}></Route>
                      <Route path="/admin/create" element={<Create/>}></Route>
                      <Route path="/admin/users" element={<Users/>}></Route>
                  </Route>

                  {/* User */}
                  <Route element={<PrivateRoute allowedRoles={["user"]}/>}>
                      <Route path="/user/index" element={<UserIndex/>}></Route>
                      <Route path="/user/mytasks" element={<MyTasks/>}></Route>
                      <Route path="/user/taskdetails/:id" element={<TaskDetails/>}></Route>
                  </Route>
              </Routes>
          </Router>
      </div>
  )
}


export default App
