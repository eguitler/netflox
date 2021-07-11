/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import Footer from "layout/Footer/Footer";
import { connect, useDispatch } from "react-redux";
import MoviesList from "components/MoviesList/MoviesList";
import styled from "styled-components";

import { getNewUploads } from "services/movies";
import { initMovies } from "store";
import MoviePreviewMiniModal from "components/MoviePreviewMiniModal/MoviePreviewMiniModal";

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
                    font-size: 1.2rem;;
                }
            }
        }
    }
`;

const Home = ({ user, premiereList, watchLaterList, modal }) => {
    const newUpdatesResponsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
            slidesToSlide: 7,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 6,
        },
        tablet: {
            breakpoint: { max: 1024, min: 469 },
            items: 4,
            slidesToSlide: 4,
        },
        mobile: {
            breakpoint: { max: 468, min: 0 },
            items: 2,
            slidesToSlide: 2,
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
                <MoviesList
                    title={premiereList.title}
                    movies={premiereList.movies}
                    dataLoaded={premiereList.loaded}
                    responsive={newUpdatesResponsive}
                    infinite={true}
                />
                <MoviesList
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
