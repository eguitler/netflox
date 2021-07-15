import React, { useRef } from "react";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { Button, PaginationPages } from "./MoviesListStyles";

const ButtonGroup = ({
    goToSlide,
    carouselState,
    totalItems,
    carouselRef,
    infinite,
}) => {
    const { slidesToShow } = carouselState;
    const { currentSlide } = carouselState;

    const [firstNextDone, setFirstNextDone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [currentPage, setCurrentPage] = useState(0);

    const prevDisabled = !firstNextDone;

    const countPages = Math.ceil(totalItems / slidesToShow);

    const prevButtonRef = useRef();
    const nextButtonRef = useRef();

    const handleNext = () => {
        const activeItems = currentIndex + slidesToShow;
        const restingItems = totalItems - activeItems;

        if (!infinite && restingItems === 0) return;

        if (!firstNextDone) setFirstNextDone(true);
        nextButtonRef.current.setAttribute("disabled", true);

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

        carouselRef.current.swiper.el.addEventListener(
            "transitionend",
            () => {
                nextButtonRef.current.removeAttribute("disabled");
            },
            {
                once: true,
            }
        );
            // console.log("INDEX: ", newIndex, ' -- SLIDE: ', currentSlide)
        console.log("PEDO: ", carouselRef.current.swiper.activeIndex)
        const currentSlideDos = carouselRef.current.swiper.activeIndex
        carouselRef.current.swiper.slideToLoop(currentSlideDos + unitsForwards, 300);
        setCurrentIndex(newIndex);
    };

    const handlePrev = () => {
        const restingItems = currentIndex;
        if ((!infinite && restingItems === 0) || !firstNextDone) return;

        prevButtonRef.current.setAttribute("disabled", true);
        
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

        carouselRef.current.swiper.el.addEventListener(
            "transitionend",
            () => {
                prevButtonRef.current.removeAttribute("disabled");
            },
            {
                once: true,
            }
        );

        carouselRef.current.swiper.slideToLoop(newIndex, 300);
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
            {((totalItems > slidesToShow) && !isMobile) && (
                <>
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
            )}
        </>
    );
};

export default ButtonGroup;
