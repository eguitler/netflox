import styled from "styled-components";

export const StyledCarouselPagination = styled.div`
    position: absolute;
    top: -20px;
    right: 6px;
    width: 10vw;
    height: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 7px;

    &.disabled {
        display: none;
        visibility: hidden;
    }

    & .bullet {
        background-color: rgba(255, 255, 255, 0.4);
        height: 80%;
        width: 20px;
        transition: background-color 500ms;
        border-radius: 2px;

        &.active-bullet {
            background-color: rgba(255, 255, 255, 0.85);
        }
    }

    @media (max-width: 1024px) {
        display: none;
        visibility: hidden;
    }
`;