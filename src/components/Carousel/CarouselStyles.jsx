import styled from "styled-components";

export const Container = styled.section`
    width: 100%;
    position: relative;
    margin-bottom: 100px;
    padding-top: 13px;
`;

export const Title = styled.div`
    font-size: 2rem;
    margin-bottom: 5px;
`;

export const Items = styled.article`
    position: relative;

    & .items-wrapper {
        width: ${(props) => props.width};
        display: flex;
        justify-content: left;
        gap: 10px;
    }
`;

export const PaginationPages = styled.div`
    position: absolute;
    top: -20px;
    right: 0;
    width: 10vw;
    height: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 7px;
    z-index: 19;

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
`;

export const Item = styled.article`
    width: 100%;
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
        height: 50px;
        opacity: 0;
        filter: invert(0.9);
        pointer-events: none;
        transition: opacity 500ms;
    }

    &.disabled {
        display: none;
        visibility: hidden;
    }

    &:hover {
        background-color: rgba(1, 1, 1, 0.7);
        img {
            opacity: 1;
        }
    }

    &.right {
        right: ${props => `calc( (var(--width) + ${props.margin}px) * -1)`};
        justify-content: flex-start;
        padding-left: 7px;

        & > img {
            transform: rotate(-90deg);
        }
    }

    &.left {
        left: ${props => `calc( (var(--width) + ${props.margin}px) * -1)`};
        justify-content: flex-end;
        padding-right: 7px;

        & > img {
            transform: rotate(90deg);
        }
    }
`;
