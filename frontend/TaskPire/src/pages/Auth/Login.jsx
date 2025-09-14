import React, {useContext, useState} from "react";
import {validateEmail} from "../../utils/helper.js";
import Input from "../../components/Inputs/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {API_PATHS} from "../../utils/apiPaths.js";
import axiosInstance from "../../utils/axiosInstance.js";
import {UserContext} from "../../context/userContext.jsx";
import Logo from "../image/logo.png";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    // Handle form submission and validation for login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)){
            setError("لطفا یک آدرس ایمیل معتبر وارد کنید");
            return
        }

        if (!password){
            setError("رمز عبور را وارد کنید.");
            return;
        }

        setError("");

        // Call API for login and handle response
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {email, password});
            const {token, role} = response.data;

            if (token){
                localStorage.setItem("token", token);
                updateUser(response.data);
                if (role === "admin") {
                    navigate("/admin/index");
                } else {
                    navigate("/user/index");
                }
            }
        }catch (error) {
            if (error.response && error.response.data.message){
                setError(error.response.data.message);
            }else {
                setError("خطا در ورود به حساب کاربری. لطفا چند دقیقه دیگر تلاش کنید.");
            }
        }
    };
    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" dir="rtl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={Logo}
                     alt="Your Company" className="mx-auto h-20 w-auto"/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">وارد حساب کاربری خود شوید</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <Input type="email" value={email} onChange={({target}) => setEmail(target.value)} label="آدرس ایمیل" placeholder="john@gmail.com"></Input>

                    <Input type="password" value={password} onChange={({target}) => setPassword(target.value)} label="رمز عبور"></Input>

                    {error && <p className="text-sm/6 text-red-500">{error}</p>}

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ورود
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">ثبت نام در سایت</Link>
                </p>
            </div>
        </div>
    )
}

export default Login