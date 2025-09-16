import React, {useContext, useState} from "react";
import Input from "../../components/Inputs/Input.jsx";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import {UserContext} from "../../context/userContext.jsx";
import uploadImage from "../../utils/uploadImage.js";
import Logo from "../image/logo.png";
import { useTranslation } from 'react-i18next';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const {updateUser} = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageURL = '';

        if (!fullName){
            setError(t("Enter your first and last name."));
            return;
        }

        if (!validateEmail(email)){
            setError(t("Please enter a valid email address."));
            return
        }

        if (!password){
            setError(t("Enter your password."));
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
                setError(t("Error logging in. Please try again in a few minutes."));
            }
        }
    };
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" dir="rtl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src={Logo}
                     alt="Your Company" className="mx-auto h-20 w-auto"/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">{t("Register on the TaskPire")}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSignUp}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
                    <Input type="text" value={fullName} onChange={({target}) => setFullName(target.value)} label={t("First and last name")}></Input>
                    <Input type="email" value={email} onChange={({target}) => setEmail(target.value)} label={t("Email")} placeholder="john@gmail.com"></Input>
                    <Input type="password" value={password} onChange={({target}) => setPassword(target.value)} label={t("Password")}></Input>

                    {error && <p className="text-sm/6 text-red-500">{error}</p>}

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> {t("SignUp")}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">{t("Already registered? Login")}</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp