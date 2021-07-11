import React, { useRef } from "react";
import { useState } from "react";
import { Button, PaginationPages } from "./MoviesListStyles";

const ButtonGroup = ({
    goToSlide,
    carouselState,
    totalItems,
    carouselRef,
    infinite,
}) => {
    const { currentSlide, slidesToShow } = carouselState;

    const [firstNextDone, setFirstNextDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentPage, setCurrentPage] = useState(0);

    const prevDisabled = !firstNextDone && currentIndex === 0;

    const countPages = Math.ceil(totalItems / slidesToShow);

    const prevButtonRef = useRef();
    const nextButtonRef = useRef();

    const handleNext = () => {
        if (!firstNextDone) setFirstNextDone(true);
        nextButtonRef.current.setAttribute("disabled", true);

        const activeItems = currentIndex + slidesToShow;
        const restingItems = totalItems - activeItems;
        if (!infinite && restingItems === 0) return;

        const unitsForwards =
            restingItems >= slidesToShow || restingItems === 0
                ? slidesToShow
                : restingItems;
        const newIndex =
            currentIndex + unitsForwards < totalItems
                ? currentIndex + unitsForwards
                : 0;

        const newPage = currentPage + 1 > countPages - 1 ? 0 : currentPage + 1;
        setCurrentPage(newPage);

        carouselRef.current.listRef.current.addEventListener(
            "transitionend",
            () => {
                nextButtonRef.current.removeAttribute("disabled");
            },
            {
                once: true,
            }
        );

        goToSlide(currentSlide + unitsForwards);
        setCurrentIndex(newIndex);
    };

    const handlePrev = () => {
        prevButtonRef.current.setAttribute("disabled", true);

        const restingItems = currentIndex;
        if (!infinite && restingItems === 0) return;

        const unitsBackwards =
            restingItems >= slidesToShow || restingItems === 0
                ? slidesToShow
                : restingItems;
        const newIndex =
            currentIndex - unitsBackwards >= 0
                ? currentIndex - unitsBackwards
                : totalItems - unitsBackwards;

        const newPage = currentPage - 1 < 0 ? countPages - 1 : currentPage - 1;
        setCurrentPage(newPage);

        carouselRef.current.listRef.current.addEventListener(
            "transitionend",
            () => {
                prevButtonRef.current.removeAttribute("disabled");
            },
            {
                once: true,
            }
        );

        goToSlide(currentSlide - unitsBackwards);
        setCurrentIndex(newIndex);
    };

    return (
        <>
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
            <Button
                ref={prevButtonRef}
                className={`left ${prevDisabled ? "disabled" : ""}`}
                onClick={() => handlePrev()}
            >
                <img src="icons/arrow.svg" alt="" />
            </Button>
            <Button
                ref={nextButtonRef}
                className={"right"}
                onClick={() => handleNext()}
            >
                <img src="icons/arrow.svg" alt="" />
            </Button>
        </>
    );
};

export default ButtonGroup;
