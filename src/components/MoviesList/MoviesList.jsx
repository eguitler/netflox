import React, { useState } from "react";
import Carousel from "components/Carousel/Carousel";
import Movie from "components/Movie/Movie";
import styled from "styled-components";
import { useEffect } from "react";

const Title = styled.div`
    font-size: 1.5rem;
`;

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

const MoviesList = ({ title, movies, dataLoaded, responsive = null }) => {
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
    return (
        <div style={{ width: "90%" }}>
            <Title>
                <h2>{title}</h2>
            </Title>
            {!dataLoaded || (dataLoaded && movies.length > 0) ? (
                <Carousel
                    items={
                        dataLoaded
                            ? movies.map((movie) => (
                                  <Movie
                                      src={movie.large_cover_image}
                                      srcSet={`${movie.medium_cover_image} 1024w`}
                                      id={movie.id}
                                  />
                              ))
                            : loadingItems
                    }
                    responsive={responsive}
                />
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
