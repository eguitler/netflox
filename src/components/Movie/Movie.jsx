import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { StyledMovie } from "./MovieStyles";
import MoviePreviewMiniModal from "components/MoviePreviewMiniModal/MoviePreviewMiniModal";

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
        const fetchingData = async (with_images = false, with_cast = false) => {
            const baseURL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=${with_images}&with_cast=${with_cast}`;
            const response = await axios.get(baseURL);
            const data = await response.data;
            return data.data.movie;
        };

        if (hover && !movieData) {
            try {
                fetchingData(true, true).then((data) => setMovieData(data));
            } catch (err) {
                console.log("err: ", err);
            }
        }
    }, [hover, id, movieData]);
    return (
        <StyledMovie
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            ref={movieRef}
        >
            <img className="movie-cover" src={src} srcset={srcset} alt="" loading="lazy" />
            {hover &&
                <MoviePreviewMiniModal
                    active={hover}
                    itemH={getHeight()}
                    itemW={getWidth()}
                    movieData={movieData}
                />
            }
        </StyledMovie>
    );
};

export default Movie;
