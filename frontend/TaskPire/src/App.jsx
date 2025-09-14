import React, {useContext} from "react"
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes,} from "react-router-dom";
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
import UserProvider, {UserContext} from "./context/userContext.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
  return (
      <UserProvider>
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
                      <Route path="/user/tasks" element={<MyTasks/>}></Route>
                      <Route path="/user/taskdetails/:id" element={<TaskDetails/>}></Route>
                  </Route>

                  {/* Default Route */}
                  <Route path="/" element={<Root/>}></Route>
              </Routes>
          </Router>
      </div>
      <Toaster
          toastOptions={{
              className: "",
              style: {
                  fontSize: "13px",
              },
          }}
      />
      </UserProvider>
  )
}


export default App

const Root = () => {
    const {user, loading} = useContext(UserContext);
    if (loading) return <Outlet/>;

    if (!user){
        return <Navigate to={"/login"}/>
    }

    return user.role === "admin"? <Navigate to={"/admin/index"}/> : <Navigate to={"/user/index"}/>;
}
