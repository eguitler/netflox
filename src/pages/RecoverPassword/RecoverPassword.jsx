import React from "react";
import { Container, StyledForm } from "./RecoverPasswordStyles";
import { Link } from "react-router-dom";

const RecoverPassword = () => {
    function handleClick(e) {
        e.preventDefault()
    }

    return (
        <Container>
            <div className="bg-overlay" />

            <StyledForm action="">
                <div className="logo-wrapper">
                    <img src="/header/netfloxLogo.png" alt="" />
                </div>
                <div>
                    <p>Service unavailable</p>
                </div>
                <div className="input-wrapper email-wrapper">
                    <img className="icon email" src="icons/email.png" alt="" />
                    <input type="text" placeholder="Email" />
                </div>
                <button
                    className="btn disabled"
                    onClick={(e) => handleClick(e)}
                >
                    RECOVER PASSWORD
                </button>
                <div className="recover-wrapper">
                    <Link to="/login">Go back to Login!</Link>
                </div>
            </StyledForm>
        </Container>
    );
};

export default RecoverPassword;
