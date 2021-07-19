import styled from "styled-components";

export const StyledMiniModal = styled.div`
    position: fixed;
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};
    top: ${(props) => `${props.posTop}px`};
    left: ${(props) => `${props.posLeft}px`};

    background-color: transparent;
    z-index: 100;
    border-radius: 5px;
    box-shadow: 0 3px 10px black;
    background-color: #1a1a1a;
    opacity: 0;
    animation: appear 0.2s 0.5s forwards;
    user-select: none;
    cursor: pointer;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    padding: 15px 20px;
    font-size: 15px;

    @keyframes appear {
        0% {
            transform: scale(1);
            opacity: 0.2;
        }
        100% {
            transform: scale(1.1);
            opacity: 1;
        }
    }

    & .media-info-wrapper {
        height: 88%;
        display: flex;
        flex-direction: column;
        gap: 5px;

        & .media-wrapper {
            height: 50%;

            & .trailer-wrapper {
                height: 100%;
                width: 100%;
                display: grid;
                place-items: center;
                background-color: #111;
                overflow: hidden;

                & iframe {
                    height: 100%;
                    width: 100%;
                }

                & .img-bg {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }

                & .loading-spinner {
                    height: 100%;
                    width: 100%;
                    display: grid;
                    place-items: center;

                    & img {
                        width: 50px;
                        mix-blend-mode: screen;
                        filter: invert(1);
                    }
                }
            }

            & .cover-wrapper {
                display: none;
                visibility: hidden;
            }
        }

        & .info-description {
            /* height: 50%; */
            width: 100%;
            display: flex;
            flex-direction: column;

            & .title-close-wrapper {
                & .title {
                    font-size: 1.5em;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                & .close {
                    display: none;
                    visibility: hidden;
                }
            }
            & .year-genres {
                display: flex;
                font-size: 0.95em;

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
            & .rating {
                display: flex;
                gap: 2px;
                margin-top: 7px;

                & .star {
                    height: 20px;

                    &.star-empty {
                        filter: invert(89%) sepia(18%) saturate(1663%)
                            hue-rotate(329deg) brightness(111%) contrast(100%);
                    }
                }
            }

            & .description {
                margin-top: 7px;

                & p {
                    font-size: 0.9em;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 5;
                    overflow: hidden;
                }
            }
        }
    }

    & .buttons-wrapper {
        display: flex;
        justify-content: space-between;
        gap: 30px;
        /* padding-right: 20px; */
        /* align-items: center; */
        transition: all 0.3s;

        --invertColor: invert(37%) sepia(99%) saturate(548%) hue-rotate(210deg)
            brightness(79%) contrast(96%);
        --invertGreenColor: invert(44%) sepia(63%) saturate(740%)
            hue-rotate(71deg) brightness(111%) contrast(87%);

        & .btn {
            background-color: transparent;
            border-radius: 5px;
            border: 2px solid #6e63d3;
            padding: 10px 30px;
            height: 100%;
            width: 100%;

            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            font-size: 1em;
            cursor: pointer;
            transition: all 0.3s;
            color: #b3aaff;

            & img {
                height: 12px;
                filter: invert(62%) sepia(48%) saturate(586%) hue-rotate(204deg)
                    brightness(103%) contrast(109%);
                transition: all 0.3s;
                transform: rotate(90deg);
            }

            &.disabled {
                background-color: #808080;
                border: 2px solid gray;
                cursor: not-allowed;
                color: #cccbcb;
                pointer-events: none;

                & img {
                    display: none;
                }
            }

            &:hover {
                background-color: #5e52c5;
                color: white;

                & img {
                    filter: invert(1);
                }
            }
        }

        & .btn-icon-description {
            background-color: transparent;
            border: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            color: #b3aaff;
            cursor: pointer;

            opacity: 1;
            transition: all 0.3s;
            min-width: 60px;

            & img {
                height: 20px;
                filter: invert(62%) sepia(48%) saturate(586%) hue-rotate(204deg)
                    brightness(103%) contrast(109%);
            }

            &.tick {
                color: #2db225;
                & img {
                    filter: var(--invertGreenColor);
                }
            }
            &.remove {
                color: #f56161;
                & img {
                    filter: invert(62%) sepia(16%) saturate(7049%)
                        hue-rotate(321deg) brightness(99%) contrast(93%);
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        border-top: 2px solid #666;
        border-radius: 0;
        box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.6);
        top: auto;
        bottom: 0;
        left: 0;
        width: 100%;

        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 10px;

        top: auto;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;

        animation: appearFromBottom 0.2s 0.5s forwards;
        padding: 15px 20px;
        padding-bottom: 10px;
        height: fit-content;

        @keyframes appearFromBottom {
            0% {
                transform: translateY(100%);
            }
            10% {
                opacity: 0.5;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        & .media-info-wrapper {
            flex-direction: row;
            height: 100%;

            & .media-wrapper {
                display: grid;
                place-items: last baseline;
                width: 32%;

                & .trailer-wrapper {
                    display: none;
                    visibility: hidden;
                }

                & .cover-wrapper {
                    visibility: visible;
                    display: grid;
                    place-items: start;

                    & img {
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }

            & .info-description {
                padding: 0;
                padding-left: 10px;
                gap: 0;
                position: relative;

                & .title-close-wrapper {
                    display: flex;
                    justify-content: space-between;
                    align-items: last baseline;
                    gap: 10px;

                    & .title {
                        align-self: center;
                        font-size: 1.2em;
                        -webkit-line-clamp: 2;
                        font-weight: bold;
                        margin-top: -5px;
                        width: 85%;
                    }

                    & .close-wrapper {
                        position: absolute;
                        right: 0;
                        top: -3px;

                        & .close {
                            display: block;
                            visibility: visible;
                            height: 30px;
                            filter: invert(0.9);
                            border: 1px solid transparent;
                            border-radius: 50%;
                            padding: 3px;
                            background-color: rgba(1, 1, 1, 0.2);
                        }
                    }
                }
                & .year-genres {
                    margin-top: 5px;
                    font-size: 0.9em;
                }
                & .rating {
                    margin-top: 5px;
                }
            }

            & .description {
                margin-top: 10px;
                height: 100%;
                
                & p {
                    -webkit-line-clamp: 6 !important;
                    font-size: 0.9rem !important;
                }
            }
        }

        & .buttons-wrapper {
        }
    }
`;
