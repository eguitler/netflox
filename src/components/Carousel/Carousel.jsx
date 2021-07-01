import React, { useEffect, useRef, useState } from "react";
import {
    Container,
    Items,
    Item,
    PaginationPages,
    Title,
    Button,
} from "components/Carousel/CarouselStyles";

const Carousel = ({
    items = [],
    gap = 10,
    infinite = false,
    title = "",
    responsive = null,
}) => {
    const getCurrentItemsCount = () => {
        const defaultSetting = {
            desktop: {
                breakpoint: { max: 4000, min: 1024 },
                items: 8,
            },
            tablet: {
                breakpoint: { max: 1024, min: 750 },
                items: 5,
            },
            bigMobile: {
                breakpoint: { max: 750, min: 480 },
                items: 4,
            },
            mobile: {
                breakpoint: { max: 480, min: 0 },
                items: 3,
            },
        };

        if (!responsive) responsive = defaultSetting;

        let itemsPerPageTmp = [];
        const currentWidth = window.innerWidth;
        Object.values(responsive).forEach((setting) => {
            if (
                setting.breakpoint.max >= currentWidth &&
                setting.breakpoint.min <= currentWidth
            ) {
                itemsPerPageTmp = setting.items;
            }
        });
        return itemsPerPageTmp;
    };

    const [itemsPerPage, setItemsPerPage] = useState(getCurrentItemsCount);

    if (items.length <= itemsPerPage) infinite = false;
    let newItemList = infinite ? [...items, ...items] : [...items];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [prevEnabled, setPrevEnabled] = useState(false);

    const countItems = newItemList.length;
    const totalGaps = gap * countItems;
    const itemsWidth = `calc((100% * ${countItems} + ${totalGaps}px) / ${itemsPerPage})`;

    const itemsRef = useRef();
    const nextButtonRef = useRef();
    const prevButtonRef = useRef();

    const countPages = Math.ceil(items.length / itemsPerPage);

    const nextItem = () => {
        if (currentIndex === 0 && !prevEnabled) setPrevEnabled(true);

        nextButtonRef.current.setAttribute("disabled", true);

        const activeItems = currentIndex + itemsPerPage;
        const restingItems = items.length - activeItems;
        const unitsForwards =
            restingItems >= itemsPerPage || restingItems === 0
                ? itemsPerPage
                : restingItems;
        const newIndex =
            currentIndex + unitsForwards < items.length
                ? currentIndex + unitsForwards
                : 0;

        setCurrentIndex(newIndex);

        const newPage = currentPage + 1 > countPages - 1 ? 0 : currentPage + 1;
        setCurrentPage(newPage);

        const itemWidth = (
            itemsRef.current.firstChild.getBoundingClientRect().width + gap
        ).toFixed(2);
        itemsRef.current.style.transition = `1000ms ease`;
        itemsRef.current.style.transform = `translateX(calc(-1 * ${itemWidth}px * ${unitsForwards}))`;

        const func = () => {
            itemsRef.current.style.transition = "none";
            itemsRef.current.style.transform = "translateX(0)";

            Array(unitsForwards)
                .fill("")
                .map(() => {
                    const first = itemsRef.current.firstChild;
                    itemsRef.current.appendChild(first);
                    return true;
                });
            nextButtonRef.current.removeAttribute("disabled");
        };

        itemsRef.current.addEventListener("transitionend", func, {
            once: true,
        });
    };

    const prevItem = () => {
        if (!prevEnabled) return;

        prevButtonRef.current.setAttribute("disabled", true);

        const restingItems = currentIndex;
        const unitsBackwards =
            restingItems >= itemsPerPage || restingItems === 0
                ? itemsPerPage
                : restingItems;
        const newIndex =
            currentIndex - unitsBackwards >= 0
                ? currentIndex - unitsBackwards
                : items.length - unitsBackwards;

        setCurrentIndex(newIndex);

        const newPage = currentPage - 1 < 0 ? countPages - 1 : currentPage - 1;
        setCurrentPage(newPage);

        Array(unitsBackwards)
            .fill("")
            .map(() => {
                const last = itemsRef.current.lastChild;
                itemsRef.current.prepend(last);
                return true;
            });

        const itemWidth = itemsRef.current.children[0].offsetWidth + gap;
        itemsRef.current.style.transition = `.00001ms`;
        itemsRef.current.style.transform = `translateX( calc( ${itemWidth}px * ${unitsBackwards} * -1))`;

        const func = () => {
            itemsRef.current.style.transition = `1000ms ease`;
            itemsRef.current.style.transform = "translateX(0)";
            itemsRef.current.addEventListener(
                "transitionend",
                () => {
                    prevButtonRef.current.removeAttribute("disabled");
                },
                { once: true }
            );
        };

        itemsRef.current.addEventListener("transitionend", func, {
            once: true,
        });
    };

    /* MOBILE/TABLET TOUCH */

    const [touchPosition, setTouchPosition] = useState(0);
    const [touchDistance, setTouchDistance] = useState(0);
    const [originalOffset, setOriginalOffset] = useState(0);

    const handleTouchPosition = (e) => {
        setTouchPosition(e.touches[0].clientX);
    };

    const handleTouch = (e) => {
        const moveX = e.touches[0].clientX;
        const distance = moveX - touchPosition;
        if (originalOffset + distance <= 0) {
            itemsRef.current.style.marginLeft = `${
                originalOffset + distance
            }px`;
            setTouchDistance(distance);
        }
    };

    const handleTouchEnd = () => {
        setOriginalOffset(originalOffset + touchDistance);
    };

    useEffect(() => {
        window.addEventListener("resize", () => {
            setItemsPerPage(getCurrentItemsCount());
        });
    }, []);
    return (
        <Container>
            <Title>
                <h3>{title}</h3>
            </Title>
            <Items width={itemsWidth}>
                <PaginationPages>
                    {countPages > 1 &&
                        Array(countPages)
                            .fill("")
                            .map((item, i) => (
                                <div
                                    key={i}
                                    className={`page ${
                                        currentPage === i ? "active" : ""
                                    }`}
                                />
                            ))}
                </PaginationPages>

                <div
                    className="items-wrapper"
                    ref={itemsRef}
                    onTouchStart={(e) => handleTouchPosition(e)}
                    onTouchMove={(e) => handleTouch(e)}
                    onTouchEnd={() => handleTouchEnd()}
                >
                    {newItemList.map((item, i) => (
                        <Item key={i} gap={gap}>
                            {item}
                        </Item>
                    ))}
                </div>

                {infinite && (
                    <>
                        <Button
                            onClick={() => prevItem()}
                            ref={prevButtonRef}
                            className={`left ${!prevEnabled ? "disabled" : ""}`}
                            margin={gap}
                        >
                            <img src="icons/arrow.svg" alt="" />
                        </Button>
                        <Button
                            onClick={() => nextItem()}
                            ref={nextButtonRef}
                            className={"right"}
                            margin={gap}
                        >
                            <img src="icons/arrow.svg" alt="" />
                        </Button>
                    </>
                )}
            </Items>
        </Container>
    );
};

export default Carousel;
