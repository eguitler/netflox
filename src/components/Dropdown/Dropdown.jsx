import React, { useRef, useState } from "react";
import {
    Container,
    StyledMenu,
    ContainerTmp,
    StyledDrop,
    StyledItem,
} from "./DropdownStyles";

const TYPE = "Dropdown";

const Dropdown = ({
    menuItem,
    items,
    position = {},
    width = "100%",
    maxWidth = "none",
    textWrap = "normal",
    responsive = null,
    addTriangle = false,
    triangleRotation = "0",
    nestedDropdown = false,
    titleAlign = "left",
}) => {
    const dropRef = useRef();
    const menuRef = useRef();
    const triangleRef = useRef();

    const [opened, setOpened] = useState(false);

    const openDrop = () => {
        const transitionDelay = 0;
        const transitionDuration = 300;

        dropRef.current.style.display = "flex";
        dropRef.current.style.visibility = "visible";

        setTimeout(function () {
            dropRef.current.style.transition = `opacity ${transitionDuration}ms ${transitionDelay}ms`;
            dropRef.current.style.opacity = "1";
            if (
                triangleRef.current ||
                typeof triangleRef.current !== "undefined"
            ) {
                triangleRef.current.style.transition = `transform ${transitionDuration}ms ${transitionDelay}ms`;
                triangleRef.current.style.transform = `rotate(${triangleRotation}deg)`;
                setOpened(true);
            }
        }, 20);
    };

    const closeDrop = () => {
        const transitionDelay = window.innerWidth < 768 ? 100 : 300;
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
                if (
                    triangleRef.current ||
                    typeof triangleRef.current !== "undefined"
                ) {
                    triangleRef.current.style.transition = `transform ${transitionDuration}ms `;
                    triangleRef.current.style.transform = "rotate(0)";
                }
                setTimeout(() => {
                    if (stillOpen) {
                        dropRef.current.style.opacity = "1";
                    } else {
                        dropRef.current.style.display = "none";
                        dropRef.current.style.visibility = "hidden";
                        setOpened(false);
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

    const getTypeName = (item) => {
        try {
            return item.content.type.name;
        } catch (error) {
            return undefined;
        }
    };

    return (
        <Container
            onMouseEnter={() => openDrop()}
            onMouseLeave={() => closeDrop()}
            onClick={opened ? () => closeDrop() : () => openDrop()}
            ref={menuRef}
        >
            <StyledMenu nestedDropdown={nestedDropdown} titleAlign={titleAlign}>
                <>
                    <span>{menuItem}</span>
                    {addTriangle && (
                        <img
                            ref={triangleRef}
                            style={{ marginLeft: "5px", height: "10px" }}
                            src="triangle_arrow.png"
                            alt=""
                        />
                    )}
                </>
            </StyledMenu>
            <ContainerTmp ref={dropRef} position={positionFixed}>
                <StyledDrop width={width} maxWidth={maxWidth}>
                    {items.map((item, i) => {
                        const typeName = getTypeName(item);
                        const dropChild = typeName === TYPE;
                        return (
                            <StyledItem
                                dropChild={dropChild ? "0" : "10px 25px"}
                                onClick={item.onClick}
                                cursorType={item.cursorType ?? "pointer"}
                                className={item.class}
                                textWrap={textWrap}
                                key={i}
                            >
                                <a href={item.url}>{item.content}</a>
                            </StyledItem>
                        );
                    })}
                </StyledDrop>
            </ContainerTmp>
        </Container>
    );
};

export default Dropdown;
