import React from "react";
import Movie from "components/Movie/Movie";
import styled from "styled-components";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Title, CarouselWrapper } from "./MoviesListStyles";
import ButtonGroup from "./ButtonGroup";
import { useRef } from "react";
import { isMobile } from "react-device-detect";

const LoadingItem = styled.div`
    border: 1px solid;
    width: 100%;
    height: 40vh;
    border-radius: 4px;
    background-color: #1a1a1a;
    border: 1px solid #555;
    animation: loading 1s infinite alternate ease;

    @keyframes loading {
        from {
            opacity: 0.9;
        }
        to {
            opacity: 0.3;
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
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 10,
            slidesToSlide: 10,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 8,
            slidesToSlide: 8,
        },
        tablet: {
            breakpoint: { max: 1024, min: 469 },
            items: 5,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 468, min: 0 },
            items: 2,
            slidesToSlide: 1,
        },
    };

    const getCurrentItemsCount = () => {
        // const defaultSetting = {
        //     desktop: {
        //         breakpoint: { max: 4000, min: 1024 },
        //         items: 8,
        //     },
        //     tablet: {
        //         breakpoint: { max: 1024, min: 750 },
        //         items: 5,
        //     },
        //     bigMobile: {
        //         breakpoint: { max: 750, min: 480 },
        //         items: 4,
        //     },
        //     mobile: {
        //         breakpoint: { max: 480, min: 0 },
        //         items: 3,
        //     },
        // };

        // if (!responsive) responsive = defaultSetting;

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

    infinite = infinite && movies.length > getCurrentItemsCount() && !isMobile;
    const carouselRef = useRef();
    return (
        <div style={{ width: "90%" }}>
            <Title>
                <h2>{title}</h2>
            </Title>
            {!dataLoaded || (dataLoaded && movies.length > 0) ? (
                <CarouselWrapper>
                    <Carousel
                        responsive={responsive}
                        swipeable={isMobile}
                        draggable={isMobile}
                        infinite={infinite}
                        arrows={false}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        customButtonGroup={
                            <ButtonGroup
                                totalItems={movies.length}
                                carouselRef={carouselRef}
                                infinite={infinite}
                            />
                        }
                        additionalTransfrom={0}
                        showDots={false}
                        renderDotsOutside={false}
                        transitionDuration={550}
                        customTransition={"all 500ms"}
                        containerClass="carousel-container"
                        ref={carouselRef}
                    >
                        {dataLoaded
                            ? movies.map((movie) => (
                                  <Movie
                                      key={movie.id}
                                      src={movie.large_cover_image}
                                      srcSet={`${movie.medium_cover_image} 1024w`}
                                      id={movie.id}
                                  />
                              ))
                            : loadingItems}
                    </Carousel>
                </CarouselWrapper>
            ) : (
                <div>
                    <p>
                        This list is empty! You can add movies yout favourite
                        movies here!
                    </p>
                </div>
            )}
        </div>
    );
};

export default MoviesList;
