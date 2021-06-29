import styled from "styled-components";

export const StyledMovie = styled.div`
    position: relative;
    /* height: 100%; */
    /* width: 100%; */
    /* max-width: 420px; */
    border: 2px solid;
        cursor: pointer;


    & .movie-cover {
        width: 100%;
        object-fit: cover;
        user-select: none;
        border-radius: 5px;

        /* transition: transform 500ms; */
    }

    & > p {
        position: absolute;
        bottom: -20px;
        left: 0;
    }
`;

