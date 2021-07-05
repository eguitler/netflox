import React, { useEffect, useRef, useState } from "react";
import { StyledMovie } from "./MovieStyles";
import MoviePreviewMiniModal from "components/MoviePreviewMiniModal/MoviePreviewMiniModal";
import { getMovieDetails } from "services/movies";

const Movie = ({ id, src, srcset }) => {
    const [movieData, setMovieData] = useState(null);
    const [hover, setHover] = useState(false);
    const movieRef = useRef();

    const getHeight = () => {
        if (movieRef.current)
            return movieRef.current.getBoundingClientRect().height;
    };
    const getWidth = () => {
        if (movieRef.current)
            return movieRef.current.getBoundingClientRect().width;
    };

    useEffect(() => {
        if (hover && !movieData) {
            getMovieDetails(id).then((data) => setMovieData(data));
        }
    }, [hover, id, movieData]);
    return (
        <StyledMovie
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ref={movieRef}
        >
            <img
                className="movie-cover"
                src={src}
                srcSet={srcset}
                alt=""
                loading="lazy"
            />
            {hover && (
                <MoviePreviewMiniModal
                    active={hover}
                    itemH={getHeight()}
                    itemW={getWidth()}
                    movieData={movieData}
                />
            )}
        </StyledMovie>
    );
};

export default Movie;
