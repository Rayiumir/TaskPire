import React, {useContext, useState} from "react";
import Input from "../../components/Inputs/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {UserContext} from "../../context/userContext.jsx";
import uploadImage from "../../utils/uploadImage.js";

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageURL = '';

        if (!fullName){
            setError("نام و نام خانوادگی را وارد کنید.");
            return;
        }

        if (!validateEmail(email)){
            setError("لطفا یک آدرس ایمیل معتبر وارد کنید");
            return
        }

        if (!password){
            setError("رمز عبور را وارد کنید.");
            return;
        }

        setError("");

        // Call API to sign up user

        try {
            // Upload image first if exists
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageURL = imgUploadRes?.imageURL || "";
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {name: fullName, email, password, profileImageURL});
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
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            }else {
                setError("مشکلی در سرور به وجود آمده است. لطفا دوباره تلاش کنید.");
            }
        }
    };
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" dir="rtl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                     alt="Your Company" className="mx-auto h-10 w-auto"/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">ثبت نام در سایت</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                    <Input type="text" value={fullName} onChange={({target}) => setFullName(target.value)} label="نام و نام خانوادگی"></Input>
                    <Input type="email" value={email} onChange={({target}) => setEmail(target.value)} label="آدرس ایمیل" placeholder="john@gmail.com"></Input>
                    <Input type="password" value={password} onChange={({target}) => setPassword(target.value)} label="رمز عبور"></Input>

                    {error && <p className="text-sm/6 text-red-500">{error}</p>}

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ثبت نام
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">قبلا ثبت نام کردید؟ وارد شوید</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp