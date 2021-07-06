import React, { useState } from "react";
import { Container, StyledForm } from "./RegisterStyles";
import firebase from "firebase";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const historical = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setEmail("");
                setPassword("");
                historical.push("/login");
            })
            .catch((error) => console.log(`Error: ${error}: ${error.message}`));
    };

    return (
        <Container>
            <div className="bg-overlay" />
            <StyledForm action="">
                <div className="logo-wrapper">
                    <img src="/header/netfloxLogo.png" alt="" />
                </div>
                <div className="input-wrapper usr-wrapper">
                    <img className="icon user" src="icons/user.png" alt="" />
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="input-wrapper email-wrapper">
                    <img className="icon email" src="icons/email.png" alt="" />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-wrapper psw-wrapper">
                    <img className="icon psw" src="icons/password.png" alt="" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={(e) => handleRegister(e)}
                    className="register-btn btn"
                    href="/register"
                >
                    CREATE ACCOUNT
                </button>
                <div className="divider" />
                <div className="recover-wrapper">
                    <Link to="/login">I already have an account.</Link>
                </div>
            </StyledForm>
        </Container>
    );
};

export default Register;
