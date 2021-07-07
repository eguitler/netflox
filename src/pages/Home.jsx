/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import Footer from "layout/Footer/Footer";
import { connect, useDispatch } from "react-redux";
import MoviesList from "components/MoviesList/MoviesList";
import styled from "styled-components";

import { getNewUploads } from "services/movies";
import { initMovies } from "store";


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    min-height: 100vh;
    overflow-x: hidden;
    padding-bottom: 80px;
`

const Home = ({ user, premiereList, watchLaterList }) => {
    const newUpdatesResponsive = {
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
    };

    // replace this by custom hook
    const dispatch = useDispatch();
    useEffect(() => {
        getNewUploads().then((movies) => {
            dispatch(initMovies(movies));
        });
    }, [dispatch]);
    return (
        <>
            <Container>
                <p>HOLA {user.displayName}</p>
                <MoviesList
                    title={premiereList.title}
                    movies={premiereList.movies}
                    dataLoaded={premiereList.loaded}
                    responsive={newUpdatesResponsive}
                    />

                <MoviesList
                    title={watchLaterList.title}
                    movies={watchLaterList.movies}
                    dataLoaded={premiereList.loaded}
                />
            </Container>
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    premiereList: state.movies.premiere,
    watchLaterList: state.movies.watchLater,
    user: state.user.user
});

export default connect(mapStateToProps)(Home);
