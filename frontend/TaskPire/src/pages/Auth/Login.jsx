import React from "react";
import AuthLayout from "../../components/layouts/AuthLayout.jsx";

const Login = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState(null);
    const handleLogin = async (e) => {
        e.preventDefault();
    };
    return (
        <AuthLayout>
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            setError={setError}
        </AuthLayout>
    )
}

export default Login