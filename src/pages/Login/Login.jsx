import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Container, StyledForm } from "./LoginStyles";
import { USER_LOGIN } from "store";

import firebase from "firebase/app";
import "firebase/auth"

import Cookies from "universal-cookie";
import { useEffect } from "react";

const Login = ({ user, addUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [tryToLogIn, setTryToLogIn] = useState(false)

    const handleAuth = (e) => {
        e.preventDefault();
        setTryToLogIn(true)
    };

    useEffect(() => {
        const cookie = new Cookies();
        if (tryToLogIn) {
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // set expiration
                const date = new Date(Date.now())
                date.setDate(date.getDate() + 10)
                // create the cookie
                cookie.set("user", userCredential.user.toJSON(), { path: "/", expires: date});
                setTryToLogIn(false)
                addUser(userCredential.user.toJSON());
            })
            .catch((error) => console.log(`Error: ${error}: ${error.message}`));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[tryToLogIn])
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
                    onClick={(e) => handleAuth(e)}
                    className="login-btn btn"
                    type="submit"
                >
                    LOG IN
                </button>
                <div className="recover-wrapper">
                    <Link to="/recover">Forgot password?</Link>
                </div>
                <div className="divider" />
                <Link className="register-btn btn" to="/register">
                    CREATE ACCOUNT
                </Link>
            </StyledForm>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {
            dispatch({
                type: USER_LOGIN,
                payload: user,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
