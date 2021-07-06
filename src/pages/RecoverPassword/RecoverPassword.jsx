import React from "react";
import { Container, StyledForm } from "./RecoverPasswordStyles";
import { Link } from "react-router-dom";
const RecoverPassword = () => {
    return (
        <Container>
            <div className="bg-overlay" />
            <StyledForm action="">
                <div className="logo-wrapper">
                    <img src="/header/netfloxLogo.png" alt="" />
                </div>
                <div className="input-wrapper email-wrapper">
                    <img className="icon email" src="icons/email.png" alt="" />
                    <input type="text" placeholder="Email" />
                </div>
                <a className="register-btn btn" href="/register">
                    RECOVER PASSWORD
                </a>
                <div className="recover-wrapper">
                    <Link to="/login">I've just remembered my password!</Link>
                </div>
            </StyledForm>
        </Container>
    );
};

export default RecoverPassword;
