import React, { useState } from "react";
import { Container, StyledForm } from "./LoginStyles";
import firebase from "firebase";
import { useHistory, Link } from "react-router-dom";
import { connect } from "react-redux";
import { USER_LOGIN } from "store";

const Login = ({ login }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const historical = useHistory();

    const handleAuth = (e) => {
        // const provider = new firebase.auth.EmailAuthProvider();
        e.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setEmail("");
                setPassword("");
                login(userCredential.user);
                historical.push("/");
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
                    CREATE NEW ACCOUNT
                </Link>
            </StyledForm>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch({
                type: USER_LOGIN,
                payload: user,
            });
        },
    };
};

export default connect(() => ({}), mapDispatchToProps)(Login);