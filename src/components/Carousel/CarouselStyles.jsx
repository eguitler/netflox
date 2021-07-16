import styled from "styled-components";

export const Container = styled.div`
    width: 90%;

    & .swiper-class {
        overflow: visible;
        position: relative;
    } 

    @media screen and (max-width: 768px) {
        width: 85%;
    }
`;

export const Title = styled.div`
    font-size: 1.5rem;
`;

export const LoadingItem = styled.div`
    border: 1px solid;
    width: 95%;
    height: 40vh;
    border-radius: 4px;
    background-color: #1a1a1a;
    border: 1px solid #555;
    animation: loading .8s infinite alternate ease;

    @keyframes loading {
        from {
            opacity: 0.9;
        }
        to {
            opacity: 0.4;
        }
    }
`;