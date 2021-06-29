/* eslint-disable no-unused-vars */

import React, { Fragment, useState } from "react";
import Header from "layout/Header/Header";
import Premiere from "layout/Premiere/Premiere";
import MyLists from "layout/MyLists/MyLists";

const Home = () => {
    const [premiereList, setPremiereList] = useState({
        title: "New Uploads",
        itemsPerPage: 6,
        movies: [],
        infinite: true,
        baseURL: "https://yts.mx/api/v2/list_movies.json",
        query: "limit=30",
    });

    const [listsToShow, setListsToShow] = useState([
        {
            id:"01",
            title: "Horror Movies",
            itemsPerPage: 10,
            movies: [],
            infinite: true,
            baseURL: "https://yts.mx/api/v2/list_movies.json",
            query: "limit=30&genre=horror&sort_by=year",
        },
        {
            id:"02",
            title: "Fantasy Movies",
            itemsPerPage: 10,
            movies: [],
            infinite: true,
            baseURL: "https://yts.mx/api/v2/list_movies.json",
            query: "limit=30&genre=fantasy&sort_by=year",
        },
    ]);

    return (
        <Fragment>
            <Header />
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Premiere setPremiereList={setPremiereList} />
                <MyLists setListsToShow={setListsToShow} />
            </div>
        </Fragment>
    );
};

export default Home;
