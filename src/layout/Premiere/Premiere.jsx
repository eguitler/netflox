import React, { useEffect, useState } from "react";
import Carousel from "components/Carousel/Carousel";
import axios from "axios";
import Movie from "components/Movie/Movie";

const Premiere = () => {
    const fetchingData = async (query = "") => {
        const baseURL = "https://yts.mx/api/v2/list_movies.json";
        const response = await axios.get(`${baseURL}?${query}`);
        const movies = await response.data;
        return movies.data;
    };

    const [newFilms, setNewFilms] = useState([]);
    const [horrorFilms, setHorrorFilms] = useState([]);
    const [fantasyFilms, setFantasyFilms] = useState([]);

    useEffect(() => {
        // Fetching last added
        fetchingData("limit=30").then((data) => {
            if (newFilms.length === 0) setNewFilms(data.movies);
        });

        fetchingData("genre=horror&sort_by=year").then((data) => {
            if (horrorFilms.length === 0) setHorrorFilms(data.movies);
        });

        fetchingData("genre=fantasy&sort_by=year").then((data) => {
            if (fantasyFilms.length === 0) setFantasyFilms(data.movies);
        });
    }, [fantasyFilms, horrorFilms, newFilms]);

    return (
        <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
            <div style={{ width: "95%" }}>
                <Carousel
                    title="New uploads"
                    items={newFilms.map((film) => (
                        <Movie
                            src={film.large_cover_image}
                            id={film.id}
                            year={film.year}
                            yt_trailer={film.yt_trailer_code}
                        />
                    ))}
                    infinite={true}
                />
                <Carousel
                    title="Horror Films"
                    itemsPerPage={10}
                    items={horrorFilms.map((film) => (
                        <Movie src={film.large_cover_image} year={film.year} />
                    ))}
                    infinite={true}
                />
                <Carousel
                    title="Fantasy Films"
                    itemsPerPage={10}
                    items={fantasyFilms.map((film) => (
                        <Movie src={film.large_cover_image} year={film.year} />
                    ))}
                    infinite={true}
                />
            </div>
        </div>
    );
};

export default Premiere;
