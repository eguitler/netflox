import styled from "styled-components";

export const StyledHeader = styled.header`
    height: 70px;
    height: fit-content;
    position: sticky;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 10;
    transition: background-color 0.3s;
    background-color: ${(props) => props.bgColor};
    margin-bottom: 30px;
    padding: 10px 0;

    & > .content {
        /* margin-top: 20px; */
        width: 90%;
        max-width: 1900px;
        display: flex;
        align-items: center;

    }

    & .mobile-search {
        height: 0px;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 5px;
        background-color: #111;
        transition: all 0.3s;
        position: relative;

        & form {
            width: 90%;
            height: 100%;
            display: flex;
            align-items: center;

            & input {
                background-color: transparent;
                height: 100%;
                width: 100%;
                border-radius: 5px;
                border: none;
                font-size: 1.1rem;
                pointer-events: none;
            }

            & #close {
                position: absolute;
                cursor: pointer;
                z-index: 2;
                right: 5%;
                filter: invert(1);
                height: 30px;
            }
        }

        &.active {
            height: 60px;
            & input {
                pointer-events: all;
            }
        }
    }
`;

export const StyledLogo = styled.div`
    height: fit-content;

    & a {
        height: fit-content;
        width: fit-content;
        display: grid;
        place-items: center;

        & img {
            height: 6vmin;
            min-height: 3em;
        }
    }
`;

export const StyledNav = styled.nav`
    margin-left: 30px;
    flex-grow: 100;
    position: relative;
    height: fit-content;
    user-select: none;

    & > .content {
        width: fit-content;

        & > ul {
            display: flex;
            align-items: center;
            gap: 30px;

            & > li {
                width: fit-content !important;
                cursor: pointer;

                & > img {
                    margin-left: 5px;
                    height: 10px;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        margin-left: 0;
        background-color: ${props => props.bgColor};
        transition: background-color 0.3s;
        padding-bottom: 10px;

        & > .content {
            display: flex;
            justify-content: center;
            width: 100%;

            & > ul {
                width: 60%;
                display: flex;
                justify-content: space-between;

                & > li:first-child {
                    display: none;
                }

                & > li {
                    min-width: fit-content;
                }
            }
        }
    }
`;

export const StyledUserActions = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
    flex-grow: 1;
    z-index: 10;
    /* border: 1px solid ; */

    & .search-wrapper {
        & .search-form {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid transparent;
            height: 40px;
            width: 30px;
            border-radius: 5px;
            transition: all 0.3s;

            & input {
                height: 100%;
                width: 100%;
                border-radius: 5px;
                border: none;
                background-color: transparent;
                font-size: 1.1rem;
                padding-left: 50px;
                pointer-events: none;
                display: none;
            }

            & img {
                position: absolute;
                cursor: pointer;
                z-index: 2;

                &#zoomGlass {
                    left: 2px;
                    transition: left .3s;
                }
                &#close {
                    right: 10px;
                }
            }

            &.active {
                width: 300px;
                border: 1px solid #777;

                & input {
                    display: block;
                    background-color: #111;
                    pointer-events: all;
                }
                & img#zoomGlass {
                    left: 10px;
                }
            }
        }
    }

    & img {
        filter: invert(1);

        &#zoomGlass {
            height: 2.7vmin;
            min-height: 1.5em;
        }
        &#notificationBell {
            height: 3.2vmin;
            min-height: 1.7em;
        }
        &#userProfile {
            height: 3.7vmin;
            min-height: 1.9em;
        }
    }
`;
