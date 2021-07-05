import React from "react";
import Carousel from "components/Carousel/Carousel";
import Movie from "components/Movie/Movie";

const MoviesList = ({ title, movies, responsive = null }) => {
    return (
        <div style={{ width: "90%" }}>
            {movies.length === 0 ? (
                "Loading..."
            ) : (
                <Carousel
                    title={title}
                    items={movies.map((movie) => (
                        <Movie
                            src={movie.large_cover_image}
                            srcSet={`${movie.medium_cover_image} 1024w`}
                            id={movie.id}
                        />
                    ))}
                    responsive={responsive}
                />
            )}
        </div>
    );
};

export default MoviesList;