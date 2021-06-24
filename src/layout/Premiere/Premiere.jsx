import React, { useEffect, useState } from "react";
import Carousel from "components/Carousel/Carousel";
import Movie from "components/Movie/Movie";
import { fetchingData } from "services/api";

const Premiere = ({ setPremiereList }) => {
    const [data, setData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const updateData = () => {
        setPremiereList(async (list) => {
            const data = await fetchingData(list.baseURL, list.query);
            list.movies = data.movies;
            setData(list);
            setDataLoaded(true);
        });
    };

    useEffect(() => {
        try {
            updateData();
        } catch (err) {
            console.log("error:", err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div style={{ width: "90%" }}>
            {!dataLoaded ? (
                "Loading..."
            ) : (
                <Carousel
                    title={data.title}
                    itemsPerPage={data.itemsPerPage}
                    items={data.movies.map((movie) => (
                        <Movie
                            src={movie.large_cover_image}
                            id={movie.id}
                            year={movie.year}
                            yt_trailer={movie.yt_trailer_code}
                        />
                    ))}
                    infinite={data.infinite}
                />
            )}
        </div>
    );
};

export default Premiere;
