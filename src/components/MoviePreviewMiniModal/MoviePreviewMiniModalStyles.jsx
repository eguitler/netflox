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

    
    @keyframes appear {
        0% {
            font-size: 3px;
            transform: scale(1);
            opacity: 0.2;
        }
        100% {
            font-size: 16px;
            transform: scale(1.1);
            opacity: 1;
        }
    }

    & .trailer-wrapper {
        width: 100%;
        height: 50%;
        display: grid;
        place-items: center;
        background-color: #111;
        overflow: hidden;

        & iframe {
            height: 100%;
            width: 100%;
            border: none;
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

        & .buttons-wrapper {
            display: flex;
            /* place-items: center; */
            justify-content: space-between;
            --invertColor: invert(37%) sepia(99%) saturate(548%)
                hue-rotate(210deg) brightness(79%) contrast(96%);
            --inverGreenColor: invert(44%) sepia(63%) saturate(740%)
                hue-rotate(71deg) brightness(111%) contrast(87%);

            & .icon {
                height: 50px;
                opacity: 1;
                transition: all 0.3s;

                &.add {
                    filter: var(--invertColor);

                    &:hover {
                        filter: invert(62%) sepia(48%) saturate(586%)
                            hue-rotate(204deg) brightness(103%) contrast(109%);
                        opacity: 0.9;
                    }
                }

                &.tick {
                    filter: var(--inverGreenColor);
                    &:hover {
                        filter: invert(79%) sepia(36%) saturate(3915%)
                            hue-rotate(64deg) brightness(97%) contrast(73%);
                    }
                }
            }

            & a {
                border-radius: 5px;
                border: 2px solid #6e63d3;
                padding: 10px 30px;
                height: 100%;

                display: flex;
                justify-content: baseline;
                gap: 5px;

                transition: all 0.3s;
                color: #b3aaff;

                & img {
                    height: 20px;
                    filter: invert(62%) sepia(48%) saturate(586%)
                        hue-rotate(204deg) brightness(103%) contrast(109%);
                    transition: all 0.3s;
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
        }
    }

    @media screen and (max-width: 1024px) {
        border-top: 2px solid #666;
        border-radius: 0;
        box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.6);
        top: auto;
        bottom: 0;
        left: 0;
        width: 100%;

        position: fixed;
        display: flex;
        flex-direction: row;
        top: auto;
        right: 0;
        left: 0;
        bottom: 0;
        height: 300px;
        width: 100%;

        animation: appearFromBottom 0.2s 0.5s forwards;

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

        & .trailer-wrapper {
            height: auto;
            background-color: #2a2a2a;
            margin: 20px;
            border-radius: 3px;
        }

        & .info-description {
            height: 100%;
            padding: 20px 0;

            & .title-genres-wrapper {
                & .title {
                    font-size: 2em;
                }
                & .year-genres {
                    font-size: 1.2em;
                }
            }

            & .description {
                height: 100%;

                & p {
                    -webkit-line-clamp: 5;
                    font-size: 1.1rem;
                }
            }
            & .buttons-wrapper {
                display: flex;
                justify-content: start;
                gap: 15px;
                
                a {
                    align-items: center;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        height: 250px;

        & .trailer-wrapper {
            display: none;
            visibility: hidden;
        }

        & .info-description {
            padding: 20px;

            & .description {
                height: 100%;

                & p {
                    -webkit-line-clamp: 3;
                    font-size: 1.1rem;
                }
            }
        }
    }
`;
