import React from "react";
import Input from "../Inputs/Input.jsx";

const AuthLayout = ({ handleLogin, email, setEmail, password, setPassword }) => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8" dir="rtl">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                     alt="Your Company" className="mx-auto h-10 w-auto"/>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">وارد حساب کاربری خود شوید</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <Input type="email" value={email} onChange={({target}) => setEmail(target.value)} label="آدرس ایمیل" placeholder="john@gmail.com"></Input>
                    <Input type="password" value={password} onChange={({target}) => setPassword(target.value)} label="رمز عبور"></Input>

                    <div>
                        <button type="submit"
                                className="flex w-full justify-center rounded-full bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ورود
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">ثبت نام در سایت</a>
                </p>
            </div>
        </div>
    )
}

export default AuthLayout