import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyledMovie } from "./MovieStyles";

const Movie = ({ id, src, year, yt_trailer }) => {
    const [movieData, setMovieData] = useState([]);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        const fetchingData = async (with_images = false, with_cast = false) => {
            const baseURL = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=${with_images}&with_cast=${with_cast}`;
            const response = await axios.get(baseURL);
            const movie = await response.data;
            return movie;
        };

        fetchingData(true, true).then((data) => {
            if (movieData.length === 0) setMovieData(data);
        });

        if (hover) console.log("movieData: ", movieData);
    }, [hover, id, movieData]);
    return (
        <StyledMovie
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img className="movie-cover" src={src} alt="" loading="lazy" />
            <p>{year}</p>

            {hover && (
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        border: "1px solid",
                        top: "0",
                        left: "0",
                    }}
                >
                    {/* {   yt_trailer &&
                        <iframe
                            title="Trailer"
                            width= "100%"
                            src={`https://www.youtube.com/embed/${yt_trailer}`}
                        ></iframe>
                    } */}
                </div>
            )}
        </StyledMovie>
    );
};

export default Movie;
