import styled from "styled-components";

export const Container = styled.div`
    width: 90%;

    @media screen and (max-width: 768px) {
        width: 85%;
    }
`;

export const Title = styled.div`
    font-size: 1.5rem;
`;

export const CarouselWrapper = styled.div`
        scroll-snap-type: none !important;
        scroll-padding-inline: 50px !important;

        scroll-snap-stop: normal !important;
        scroll-snap-align: none !important;
        scroll-margin: 100px !important;
    .carousel-container {
        overflow: visible;
        border: 4px solid yellow;
        scroll-snap-type: none !important;
        scroll-padding-inline: 50px !important;

        scroll-snap-stop: normal !important;
        scroll-snap-align: none !important;
        scroll-margin: 100px !important;
    }

    & .carousel-class {
        border: 4px solid;
        scroll-snap-type: none !important;
        scroll-padding-inline: 50px !important;

        scroll-snap-stop: normal !important;
        scroll-snap-align: none !important;
        scroll-margin: 100px !important;
    }

    & .slider-class {
        border: 4px solid red;
        scroll-snap-type: none !important;
        scroll-padding-inline: 50px !important;

        scroll-snap-stop: normal !important;
        scroll-snap-align: none !important;
        scroll-margin: 100px !important;

    }
    & .item-class {
        border: 4px solid blue;
        scroll-snap-type: none !important;
        scroll-padding-inline: 50px !important;

        scroll-snap-stop: normal !important;
        scroll-snap-align: none !important;
        scroll-margin: 100px !important;
    }
`;

export const Button = styled.button`
    cursor: pointer;
    position: absolute;
    border: none;
    background-color: rgba(1, 1, 1, 0.4);
    transition: background-color 500ms;
    display: flex;
    align-items: center;
    top: 0;
    border-radius: 5px;
    --width: 100px;

    height: 100%;
    width: var(--width);

    & > img {
        height: 45px;
        opacity: 0;
        filter: invert(0.9);
        pointer-events: none;
        transition: opacity 500ms;
    }

    &.disabled {
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

export const Items = styled.article`
    position: relative;
    & .items-wrapper {
        height: 100%;
        display: flex;
        justify-content: left;
        gap: 10px;
    }
`;

export const Item = styled.article`
    min-width: ${props => `${props.coverW}px`};
    width: ${props => `${props.coverW}px`};
`;

export const PaginationPages = styled.div`
    position: absolute;
    top: -20px;
    right: 6px;
    width: 10vw;
    height: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 7px;

    & .page {
        background-color: rgba(255, 255, 255, 0.4);
        height: 80%;
        width: 20px;
        transition: background-color 500ms;
        border-radius: 2px;

        &.active {
            background-color: rgba(255, 255, 255, 0.85);
        }
    }

    @media (max-width: 1024px) {
        display: none;
        visibility: hidden;
    }
`;
