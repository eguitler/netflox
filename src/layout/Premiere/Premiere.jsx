import React, { useEffect, useState } from "react";
import Carousel from "components/Carousel/Carousel";
import Movie from "components/Movie/Movie";
import { fetchingData } from "services/api";

const Premiere = ({ setPremiereList }) => {
    const [data, setData] = useState(null);

    const updateData = () => {
        setPremiereList(async (list) => {
            const data = await fetchingData(list.baseURL, list.query);
            list.movies = data.movies;
            setData(list);
        });
    };

    useEffect(() => {
        if (!data) {
            try {
                updateData();
            } catch (err) {
                console.log("error:", err);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div style={{ width: "90%" }}>
            {!data ? (
                "Loading..."
            ) : (
                <Carousel
                    title={data.title}
                    items={data.movies.map((movie) => (
                        <Movie
                            src={movie.large_cover_image}
                            srcset={`${movie.medium_cover_image} 1024w`}
                            id={movie.id}
                        />
                    ))}
                    infinite={data.infinite}
                    responsive={{
                        desktop: {
                            breakpoint: { max: 4000, min: 1024 },
                            items: 5,
                        },
                        tablet: {
                            breakpoint: { max: 1024, min: 750 },
                            items: 4,
                        },
                        bigMobile: {
                            breakpoint: { max: 750, min: 480 },
                            items: 3,
                        },
                        mobile: {
                            breakpoint: { max: 480, min: 0 },
                            items: 2,
                        },
                    }}
                />
            )}
        </div>
    );
};

export default Premiere;
