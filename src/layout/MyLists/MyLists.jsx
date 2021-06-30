import React, { useEffect, useState } from "react";
import Carousel from "components/Carousel/Carousel";
import Movie from "components/Movie/Movie";
import { Container } from "./MyListsStyles";

import { fetchingData } from "services/api";

const MyLists = ({ setListsToShow }) => {
    const [data, setData] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const updateData = () => {
        setListsToShow((lists) => {
            lists.map(async (list, i) => {
                const data = await fetchingData(list.baseURL, list.query);
                list.movies = data.movies;
                setData([...lists]);
                setDataLoaded(true);
            });
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
        <Container>
            {!dataLoaded
                ? "Loading..."
                : data.map((list) => (
                      <Carousel
                          key={list.id}
                          title={list.title}
                          items={list.movies.map((movie) => (
                              <Movie
                                  src={movie.large_cover_image}
                                  srcset={`${movie.medium_cover_image} 1024w`}
                                  id={movie.id}
                              />
                          ))}
                          infinite={list.infinite}
                      />
                  ))}
        </Container>
    );
};

export default MyLists;
