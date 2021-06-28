import styled from "styled-components";

export const StyledHeader = styled.header`
    height: 70px;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 10;

    & > .content {
        width: 90%;
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
