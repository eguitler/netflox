import React, { useState } from "react";
import {
    Container,
    StyledForm,
    StyledErrorMsg,
    StyledSuccessMsg,
} from "./RegisterStyles";
import firebase from "firebase";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errMessages, setErrorMessages] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");
    const historical = useHistory();

    function validate() {
        const errorMsgs = [];
        console.log("ASD: ", fullName.length);
        if (fullName.length < 4) {
            errorMsgs.push("Full name must be at least 4 chars");
        }

        const pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!pattern.test(email)) {
            errorMsgs.push("Email not valid");
        }

        if (password.length < 6) {
            errorMsgs.push("Password must be at least 6 chars");
        }

        setErrorMessages(errorMsgs);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        validate();
        if (errMessages.length === 0) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    userCredential.user.updateProfile({
                        displayName: fullName,
                    });
                    setFullName("");
                    setEmail("");
                    setPassword("");
                    setSuccessMsg(["Account registered successfully!"]);
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        setErrorMessages(["email is already in use"])
                    }
                })
        }
    };

    const timerRef = useRef();
    useEffect(() => {
        const startTimer = (duration, ref) => {
            let secondsLeft = duration;
            const timer = setInterval(function () {
                --secondsLeft;
                ref.current.textContent = secondsLeft;

                if (secondsLeft === 0) {
                    clearInterval(timer);
                }
            }, 1000);
        };

        const duration = 5;
        if (successMsg && timerRef)  {
            startTimer(duration, timerRef)
            setTimeout(() => {
                historical.push("/login");
            }, duration * 1000);
        }
    }, [successMsg]);
    return (
        <Container>
            <div className="bg-overlay" />
            <StyledForm action="">
                <div className="logo-wrapper">
                    <img src="/header/netfloxLogo.png" alt="" />
                </div>
                {errMessages.length > 0 && (
                    <StyledErrorMsg>
                        {errMessages.map((msg, i) => (
                            <p key={i}>- {msg}</p>
                        ))}
                    </StyledErrorMsg>
                )}
                {successMsg ? (
                    <>
                        <StyledSuccessMsg>
                            <p>{successMsg}</p>
                        </StyledSuccessMsg>
                        <p>
                            Redirecting to Login in{" "}
                            <span ref={timerRef}>5</span>
                        </p>
                    </>
                ) : (
                    <>
                        <div className="input-wrapper usr-wrapper">
                            <img
                                className="icon user"
                                src="icons/user.png"
                                alt=""
                            />
                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper email-wrapper">
                            <img
                                className="icon email"
                                src="icons/email.png"
                                alt=""
                            />
                            <input
                                required
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-wrapper psw-wrapper">
                            <img
                                className="icon psw"
                                src="icons/password.png"
                                alt=""
                            />
                            <input
                                required
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
                    </>
                )}
                <div className="divider" />
                <div className="recover-wrapper">
                    <Link to="/login">Go back to login.</Link>
                </div>
            </StyledForm>
        </Container>
    );
};

export default Register;
