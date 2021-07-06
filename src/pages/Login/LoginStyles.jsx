import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;

    background-image: url("bg-login.jpg");
    background-repeat: no-repeat;
    background-size: cover;

    .bg-overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0, .6);
    }
`;

export const StyledForm = styled.form`
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 30px;
    border-radius: 5px;

    width: 80%;
    max-width: 350px;
    background-color: rgba(0, 0, 0, 0.8);

    & .logo-wrapper {
        z-index: 2;
        margin-bottom: 20px;

        & img {
            height: 80px;
        }
    }

    & .input-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;

        & > input {
            width: 100%;
            height: 45px;
            border-radius: 5px;
            border: 1.5px solid rgba(0,0,0, .15);
            padding-left: 40px;
            font-size: 1rem;
            transition: all 0.3s;
            background-color: #333;
            color: #f0f0f0;
            
            &::placeholder {
                color: #999;
            }
            
            &:focus {
                border: 1.5px solid #777ec2;
                box-shadow: 0 0 3px #777ec2;
            }
        }

        & .icon {
            filter: invert(.9);
            position: absolute;
            left: 12px;
            height: 20px;
        }
    }
    & > .btn {
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: black;
        margin: 10px;
        font-size: 1rem;
        transition: background-color 0.3s;
        color: #f0f0f0;
        font-weight: bold;

        &.login-btn {
            background-color: #666fc2;
            letter-spacing: 0.5px;

            &:hover {
                background-color: #4652bd;
            }
        }

        &.register-btn {
            display: grid;
            place-items: center;
            background-color: #58af64;

            &:hover {
                background-color: #3b8846;
            }
        }
    }

    & .recover-wrapper {
        a {
            transition: all .3s;
            color: #999;

            &:hover { 
                color: #8c92cf;
            }
        }
    }

    & .divider {
        border-top: 1px solid rgba(255, 255, 255, 0.25);
        width: 100%;
        margin: 10px;
    }
`;
