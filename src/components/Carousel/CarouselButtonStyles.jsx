import styled from "styled-components";

export const StyledCarouselButton = styled.button`
    cursor: pointer;
    position: absolute;
    border: none;
    background-color: rgba(1, 1, 1, 0.4);
    transition: background-color 500ms;
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    --width: 100px;

    height: 101%; 
    width: var(--width);

    z-index: 3;

    & > img {
        height: 45px;
        opacity: 0;
        filter: invert(0.9);
        pointer-events: none;
        transition: opacity 500ms;
    }

    &.disabled {
        display: none;
        visibility: hidden;
    }

    &.hidden {
        background-color: #232323 !important;
        right: 100% !important;
        cursor: default;

        & img {
            display: none;
            visibility: hidden;
        }
    }

    &:hover {
        background-color: rgba(1, 1, 1, 0.7);
        img {
            opacity: 1;
        }
    }

    &.right {
        left: calc(100% - 3px);
        justify-content: flex-start;
        padding-left: 12px;

        & > img {
            transform: rotate(-90deg);
        }
    }

    &.left {
        right: calc(100% + 5px);
        justify-content: flex-end;
        padding-right: 12px;

        & > img {
            transform: rotate(90deg);
        }
    }
    @media (max-width: 1366px) {
        &.right {
            left: calc(100% - 2px);
        }
        & > img {
            height: 35px;
        }
    }

    @media (max-width: 768px) {
        &.left {
            padding-right: 4px;
        }
        &.right {
            padding-left: 8px;
        }
        & > img {
            height: 25px;
        }
    }
`;