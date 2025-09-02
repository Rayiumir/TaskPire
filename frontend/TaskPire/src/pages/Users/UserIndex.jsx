import React, {useContext, useState} from "react";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {UserContext} from "../../context/userContext.jsx";
import AdminLayout from "../../components/layouts/AdminLayout.jsx";
import {useNavigate} from "react-router-dom";

const UserIndex = () => {
    useUserAuth();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [pieChartData, setPieChartData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    return <AdminLayout activeMenu="UserIndex"></AdminLayout>
}

export default UserIndex