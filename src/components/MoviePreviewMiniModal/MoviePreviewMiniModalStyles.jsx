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
    user-select: none;

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

        & img {
            height: 100%;
            width: 100%;
            object-fit: cover;
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

        & .buttons-wrapper {
            display: flex;
            /* place-items: center; */
            justify-content: space-between;
            --invertColor: invert(37%) sepia(99%) saturate(548%)
                hue-rotate(210deg) brightness(79%) contrast(96%);
            --inverGreenColor:  invert(44%) sepia(63%) saturate(740%) hue-rotate(71deg) brightness(111%) contrast(87%);

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
                    &:hover{
                        filter: invert(79%) sepia(36%) saturate(3915%) hue-rotate(64deg) brightness(97%) contrast(73%);
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
