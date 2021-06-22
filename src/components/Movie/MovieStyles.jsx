import styled from "styled-components";

export const StyledMovie = styled.div`
    position: relative;
    height: 100%;

    & .movie-cover {
        height: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
        user-select: none;

        transition: transform 500ms;
        cursor: pointer;
    }

    & p {
        position: absolute;
        bottom: -20px;
        left: 0;
    }
`;