/* eslint-disable no-unused-vars */

import React, { Fragment, useState } from "react";
import Footer from "layout/Footer/Footer";
import { connect } from "react-redux";
import MoviesList from "components/MoviesList/MoviesList";
import styled from "styled-components";

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

const Home = ({ premiereList, watchLaterList }) => {
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

    return (
        <>
            <Container>
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
});

export default connect(mapStateToProps)(Home);
