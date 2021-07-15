import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useRef } from "react";
import { Container, Title } from "./MoviesListStyles";

import Movie from "components/Movie/Movie";
import CarouselButton from "components/Carousel/CarouselButton";
import CarouselPagination from "components/Carousel/CarouselPagination";

import { isMobile, isTablet } from "react-device-detect";

import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

const LoadingItem = styled.div`
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

const MoviesList = ({
    title,
    movies,
    dataLoaded,
    infinite = false,
    responsive = null,
}) => {
    const loadingItems = [
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
        <LoadingItem id={Math.random()} />,
    ];

    responsive = responsive ?? {
        3000: {
            // items: 10,
            slidesPerView: 10,
            spaceBetween: 20,
        },
        1024: {
            // items: 8,
            slidesPerView: 9,
        },
        469: {
            // items: 5,
            slidesPerView: 3,
        },
        0: {
            // items: 2,
            slidesPerView: 2,
        },
    };

    const getCurrentItemsCount = () => {
        let itemsPerPageTmp = [];
        const currentWidth = window.innerWidth;
        Object.keys(responsive).forEach((minWidth) => {
            if (minWidth <= currentWidth)
                itemsPerPageTmp = responsive[minWidth].slidesPerView;
        });
        return itemsPerPageTmp;
    };

    const swiperRef = useRef();
    const itemsPerPage = getCurrentItemsCount();

    const touchSupport = window.innerWidth <= 1024;
    infinite = infinite && movies.length > itemsPerPage && !touchSupport;

    const [prevHidden, setPrevHidden] = useState(true);
    const [nextHidden, setNextHidden] = useState(false);

    const handlePrev = () => {
        setNextHidden(false);
        if (!infinite && swiperRef.current.swiper.realIndex === 0) {
            setPrevHidden(true);
        }
    };
    const handleNext = () => {
        setPrevHidden(false);
        if (
            !infinite &&
            swiperRef.current.swiper.realIndex + itemsPerPage === movies.length
        ) {
            setNextHidden(true);
        }
    };

    useEffect(() => {
        if (movies.length > itemsPerPage) {
            setNextHidden(false);
        } else {
            setNextHidden(true);
        }
    }, [movies.length]);

    return (
        <Container>
            <Title>
                <h2>{title}</h2>
            </Title>
            {!dataLoaded || (dataLoaded && movies.length > 0) ? (
                <>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={0}
                        slidesPerView={itemsPerPage}
                        slidesPerGroup={itemsPerPage}
                        className="swiper-class"
                        freeMode={true}
                        responsive={responsive}
                        loop={infinite}
                        navigation={{
                            nextEl: ".btn-next",
                            prevEl: ".btn-prev",
                        }}
                        pagination={{
                            el: ".pagination",
                            bulletActiveClass: "active-bullet",
                            bulletClass: "bullet",
                            clickable: true,
                        }}
                        allowTouchMove={isMobile || isTablet}
                    >
                        {dataLoaded
                            ? movies.map((movie) => (
                                  <SwiperSlide>
                                      <Movie
                                          key={movie.id}
                                          src={movie.large_cover_image}
                                          srcSet={`${movie.medium_cover_image} 1024w`}
                                          id={movie.id}
                                      />
                                  </SwiperSlide>
                              ))
                            : Array(itemsPerPage)
                                  .fill("")
                                  .map((item) => (
                                      <SwiperSlide>
                                          <LoadingItem />
                                      </SwiperSlide>
                                  ))}
                        <CarouselPagination
                            className="pagination"
                            disabled={movies.length <= itemsPerPage}
                            // bulletClass="bullet"
                            // activeBulletClass="active-bullet"
                        />
                        <CarouselButton
                            side="left"
                            className="btn-prev"
                            hidden={prevHidden}
                            disabled={isMobile || isTablet}
                            onClick={handlePrev}
                        />
                        <CarouselButton
                            side="right"
                            className="btn-next"
                            hidden={nextHidden}
                            disabled={isMobile || isTablet}
                            onClick={handleNext}
                        />
                    </Swiper>
                </>
            ) : (
                <div>
                    <p>
                        This list is empty! You can add your favourite movies
                        here!
                    </p>
                </div>
            )}
        </Container>
    );
};

export default MoviesList;
