import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {UserContext} from "../context/userContext.jsx";

const PrivateRoute = ({allowedRoles}) => {
    const {user, loading} = useContext(UserContext);

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading component
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;