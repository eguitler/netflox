import styled from "styled-components";

export const Container = styled.div`
    position: relative;
`;

export const StyledMenu = styled.div`
    cursor: pointer;
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: ${(props) => (props.nestedDropdown ? "10px 25px" : "0")};
    width: 100%;

    span {
        display: flex;
        place-items: center;
    }
`;

export const ContainerTmp = styled.div`
    display: none;
    visibility: hidden;
    opacity: 0;

    position: absolute;
    left: ${(props) => props.position.left};
    right: ${(props) => props.position.right};
    top: ${(props) => props.position.top};
    bottom: ${(props) => props.position.bottom};
    margin-top: 10px;
`;

export const StyledDrop = styled.ul`
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    /* overflow: hidden; */

    background-color: #333;
    box-shadow: 5px 6px 6px rgba(1, 1, 1, 0.2);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledItem = styled.li`
    min-width: 100%;
    width: 100%;

    &:hover {
        background-color: #444;
    }

    & > a {
        cursor: ${(props) => props.cursorType};
        display: block;
        padding: ${(props) => props.dropChild};

        /* overflow: hidden; */
        user-select: none;

        text-overflow: ellipsis;
        white-space: ${(props) => props.textWrap};
        /* width: 5ch; */
    }

    &.divider {
        height: 1px;
        width: 100%;
        border-top: 1px solid #555;

        & a {
            padding: 0;
        }
    }
`;
