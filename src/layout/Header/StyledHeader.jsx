import styled from "styled-components";

export const StyledHeader = styled.header`
    height: 70px;
    display: flex;
    justify-content: center;
    position: relative;

    & > .content {
        width: 95%;
        max-width: 1900px;
        display: flex;
        align-items: center;
    }
`;

export const StyledLogo = styled.div`
    height: fit-content;
    flex-grow: 1;

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

    & > .content {
        width: fit-content;

        & .navMenu1024 {
            display: none;
            visibility: hidden;
        }

        & > ul {
            display: flex;
            align-items: center;
            gap: 30px;

            & li {
                width: fit-content;

                & img {
                    margin-left: 5px;
                    height: 10px;
                }

                &#myListsWrapper {
                    position: relative;
                    width: fit-content;

                    & ul#myListsDrop {
                        display: none;
                        visibility: hidden;

                        position: absolute;
                        top: 100%;
                        right: 0;
                        margin-top: 10px;

                        width: fit-content;
                        min-width: 150px;
                        max-width: 250px;

                        background-color: #333;
                        box-shadow: 5px 6px 6px rgba(1, 1, 1, 0.2);

                        &.active {
                            visibility: visible;
                            display: flex;
                            flex-direction: column;
                            justify-content: left;
                        }

                        & li {
                            width: 100%;
                            padding: 10px 25px;
                            text-align: left;
                            
                            &:last-child {
                                border-top: 1px solid #555;
                            }

                            & a {
                                display: block;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1024px) {
        & > .content {
            & .navMenu1024 {
                display: block;
                visibility: visible;
                width: fit-content;

                & img {
                    margin-left: 5px;
                    height: 10px;
                }
            }

            & > ul {
                display: none;
                visibility: hidden;

                position: absolute;
                flex-direction: column;
                align-items: start;
                margin-top: 5px;

                background-color: #333;
                box-shadow: 5px 6px 6px rgba(1, 1, 1, 0.2);
                gap:0;

                &.active {
                    display: flex;
                    visibility: visible;
                }

                & li {
                    padding: 15px 35px;
                    height: 100%;
                    width: 100%;

                    &#myListsWrapper {
                        position: static;
                        padding: 0;

                        & #myListsMenu {
                            display: block;
                            padding: 15px 35px;
                        }

                        & ul#myListsDrop {
                            top: 0;
                            left: 100%;
                            margin-top: 0;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        position: absolute;
        width: 100%;
        top: 100%;
        left: 0;
        bottom: -5px;
        margin-left: 0;

        & > .content {
            display: flex;
            justify-content: center;
            width: 100%;

            & .navMenu1024 {
                display: none;
                visibility: hidden;
            }

            & .hideMobile {
                display: none;
                visibility: hidden;
            }

            & > ul {
                display: flex;
                visibility: visible;

                margin-top: 0;
                width: 85%;
                max-width: calc(768px / 1.5);
                min-width: 300px;
                justify-content: space-between;
                flex-direction: row;

                padding: 0;
                background-color: transparent;
                box-shadow: none;

                & > li {
                    padding: 10px 0;
                    text-align: center;

                    &#myListsWrapper {
                        position: relative;
                        width: 100%;

                        & #myListsMenu {
                            padding: 10px 0;
                        }

                        & ul#myListsDrop {
                            top: 100%;
                            left: auto;
                            right: 0;
                            margin-top: 10px;
                            margin-left: 0;

                            /* & li {
                                text-align: left;
                            } */
                        }
                    }
                }
            }
        }
    }
`;

export const StyledUserActions = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

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
