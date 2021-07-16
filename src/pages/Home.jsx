/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import Footer from "layout/Footer/Footer";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";

import { getNewUploads } from "services/movies";
import { initMovies } from "store";
import MoviePreviewMiniModal from "components/MoviePreviewMiniModal/MoviePreviewMiniModal";
import Carousel from "components/Carousel/Carousel";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    min-height: 100vh;
    overflow-x: hidden;
    padding-bottom: 80px;

    .title-wrapper {
        width: 100%;
        display: grid;
        place-items: center;
        margin-top: 15px;

        .title {
            font-weight: 100;
            text-align: center;

            .full-name {
                font-weight: 500;
            }

            .second-sentence {
                margin-left: 1ch;

                @media screen and (max-width: 600px) {
                    margin-left: 0;
                    font-size: 1.2rem;
                }
            }
        }
    }
`;

const Home = ({ user, premiereList, watchLaterList, modal }) => {
    const newUpdatesResponsive = {
        3000: {
            slidesPerView: 7,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 6,
        },
        469: {
            slidesPerView: 4,
        },
        0: {
            slidesPerView: 2,
        },
    };
    // replace this by custom hook
    const dispatch = useDispatch();
    useEffect(() => {
        getNewUploads().then((movies) => {
            dispatch(initMovies(movies));
        });
    }, [dispatch, watchLaterList]);
    return (
        <>
            <Container>
                <div className="title-wrapper">
                    <h1 className="title">
                        <div>
                            Hi{" "}
                            <span className="full-name">
                                {user.displayName}
                            </span>
                            !
                        </div>
                        <div>
                            <span className="second-sentence">
                                Your favourites movies are waiting for you!{" "}
                            </span>
                        </div>
                    </h1>
                </div>
                <Carousel
                    title={premiereList.title}
                    movies={premiereList.movies}
                    dataLoaded={premiereList.loaded}
                    responsive={newUpdatesResponsive}
                    infinite={true}
                />
                <Carousel
                    title={watchLaterList.title}
                    movies={watchLaterList.movies}
                    dataLoaded={premiereList.loaded}
                    infinite={false}
                />
            </Container>
            {modal.active && (
                <MoviePreviewMiniModal
                    info={modal.info}
                    id={modal.id}
                    itemRef={modal.ref}
                />
            )}
            <Footer />
        </>
    );
};

const mapStateToProps = (state) => ({
    premiereList: state.movies.premiere,
    watchLaterList: state.movies.watchLater,
    user: state.user.user,
    modal: state.modal,
});

export default connect(mapStateToProps)(Home);
