import styled from "styled-components";

export const StyledMiniModal = styled.div`
    position: absolute;
    width: 300px;
    height: 400px;
    top: 0;
    left: 0;
    background-color: transparent;
    z-index: 10;
    border-radius: 5px;
    box-shadow: 0 3px 10px black;

    opacity: 0;
    display: none;
    visibility: hidden;

    & .trailer-wrapper {
        width: 100%;
        height: 50%;
        display: grid;
        place-items: center;
        background-color: #111;

        & iframe {
            height: 100%;
            width: 100%;
            border: none;
        }
    }

    &.active {
        display: flex;
        flex-direction: column;
        visibility: visible;
        left: ${(props) => `${props.posX}px`};
        top: ${(props) => `${props.posY}px`};
        height: 400px;
        width: 350px;
        background-color: #2a2a2a;

        animation: appear 0.2s 0.5s forwards;
    }

    & .info-description {
        height: 50%;
        padding: 20px;
        padding-top: 10px;
        padding-bottom: 20px;

        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 8px;

        & .title-genres-wrapper {
            & .title {
                font-size: 1.8em;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            & .year-genres {
                display: flex;

                & p {
                    color: #bbbbbb;
                }

                & p:nth-child(1n + 3)::before {
                    content: ", ";
                }
                & p:first-child::after {
                    content: " -";
                    margin-right: 1ch;
                }
            }
        }

        & .description {
            height: 65px;

            & p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
        }

        & .button-wrapper {
            display: grid;
            place-items: center;

            & a {
                border-radius: 5px;
                background-color: #5e52c5;
                padding: 10px 30px;
                height: 100%;

                display: flex;
                justify-content: baseline;
                gap: 5px;

                & img {
                    height: 20px;
                    filter: invert(1);
                }
            }
        }
    }

    @keyframes appear {
        0% {
            font-size: 3px;
            transform: scale(0.5);
        }
        10% {
            opacity: 0.5;
        }
        100% {
            font-size: 16px;
            transform: scale(1);
            opacity: 1;
        }
    }
`;
