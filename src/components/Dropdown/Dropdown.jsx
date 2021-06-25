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
    responsive = null,
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

    if (responsive && responsive !== "undefined") {
        responsive.forEach((setting) => {
            const respWidth = Object.keys(setting)[0];
            if (window.matchMedia(`(max-width: ${respWidth}px)`).matches) {
                const set = setting[respWidth];
                position =
                    set.position && set.position !== "undefined"
                        ? set.position
                        : position;
                width =
                    set.width && set.width !== "undefined" ? set.width : width;
                maxWidth =
                    set.maxWidth && set.maxWidth !== "undefined"
                        ? set.maxWidth
                        : maxWidth;
                textWrap =
                    set.textWrap && set.textWrap !== "undefined"
                        ? set.textWrap
                        : textWrap;
            }
        });
    }

    const positionFixed = {
        left: position.left ?? "auto",
        top: position.top ?? "auto",
        right: position.right ?? "auto",
        bottom: position.bottom ?? "auto",
    };

    return (
        <Container
            onMouseEnter={() => openDrop()}
            onMouseLeave={() => closeDrop()}
            ref={menuRef}
        >
            <StyledMenu>{menuItem}</StyledMenu>
            <ContainerTmp ref={dropRef} position={positionFixed}>
                <StyledDrop width={width} maxWidth={maxWidth}>
                    {items.map((item, i) => (
                        <StyledItem
                            onClick={item.onClick}
                            cursorType={item.cursorType ?? "pointer"}
                            className={item.class}
                            textWrap={textWrap}
                            key={i}
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
