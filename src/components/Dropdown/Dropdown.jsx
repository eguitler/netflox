import React, { useRef } from "react";
import {
    Container,
    StyledMenu,
    ContainerTmp,
    StyledDrop,
    StyledItem,
} from "./DropdownStyles";

const Dropdown = ({
    menuItem,
    items,
    position = {},
    width = "100%",
    maxWidth = "none",
    textWrap = "normal",
}) => {
    const dropRef = useRef();
    const menuRef = useRef();

    const openDrop = () => {
        const transitionDelay = 0;
        const transitionDuration = 300;

        dropRef.current.style.display = "flex";
        dropRef.current.style.visibility = "visible";

        setTimeout(function () {
            dropRef.current.style.transition = `opacity ${transitionDuration}ms ${transitionDelay}ms`;
            dropRef.current.style.opacity = "1";
        }, 20);
    };

    const closeDrop = () => {
        const transitionDelay = 300;
        const transitionDuration = 300;
        let stillOpen = false;

        menuRef.current.addEventListener(
            "mouseenter",
            () => {
                stillOpen = true;
            },
            { once: true }
        );

        setTimeout(() => {
            if (!stillOpen) {
                dropRef.current.style.transition = `opacity ${transitionDuration}ms`;
                dropRef.current.style.opacity = "0";

                setTimeout(() => {
                    if (stillOpen) {
                        dropRef.current.style.opacity = "1";
                    } else {
                        dropRef.current.style.display = "none";
                        dropRef.current.style.visibility = "hidden";
                    }
                }, transitionDuration);
            }
        }, transitionDelay);
    };

    const positionFixed = {
        left: position.left ?? "auto",
        top: position.top ?? "auto",
        right: position.right ?? "auto",
        bottom: position.bottom ?? "auto",
    };

    console.log("DATA: ", width, " -- ", maxWidth);
    return (
        <Container
            onMouseEnter={() => openDrop()}
            onMouseLeave={() => closeDrop()}
            ref={menuRef}
        >
            <StyledMenu>{menuItem}</StyledMenu>
            <ContainerTmp ref={dropRef} position={positionFixed}>
                <StyledDrop width={width} maxWidth={maxWidth}>
                    {items.map((item) => (
                        <StyledItem
                            onClick={item.onClick}
                            cursorType={item.cursorType ?? "pointer"}
                            className={item.class}
                            textWrap={textWrap}
                        >
                            <a href={item.url}>{item.content}</a>
                        </StyledItem>
                    ))}
                </StyledDrop>
            </ContainerTmp>
        </Container>
    );
};

export default Dropdown;
