import styled from "styled-components";

export const StyledMovie = styled.div`
    position: relative;
    cursor: pointer;

    & .movie-cover {
        width: 100%;
        object-fit: cover;
        user-select: none;
        border-radius: 5px;
        border: 2px solid rgba(255, 255, 255, .4);
    }

    & > p {
        position: absolute;
        bottom: -20px;
        left: 0;
    }
`;

