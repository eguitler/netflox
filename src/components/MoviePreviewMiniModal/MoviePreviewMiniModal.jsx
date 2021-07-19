import React, { useEffect, useState, useRef } from "react";
import { isDesktop, isMobile, isTablet } from "react-device-detect";
import { connect } from "react-redux";

import { getMovieDetails } from "services/movies";
import { StyledMiniModal } from "./MoviePreviewMiniModalStyles";
import {
    ADD_TO_WATCH_LATER,
    REMOVE_FROM_WATCH_LATER,
    MODAL_CLOSE,
} from "store";

const MoviePreviewMiniModal = ({
    id,
    itemRef,
    info,
    isOpened,
    closeModal,
    watchLater,
    addToWatchLater,
    removeFromWatchLater,
}) => {
    const emptyData = {
        title: "Loading data...",
        yt_trailer_code: "",
        year: "",
        genres: [],
        description_intro: "",
    };

    const [movieData, setMovieData] = useState(emptyData);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showRemoveBtn, setShowRemoveBtn] = useState(false);

    const width = 360;
    const extraHeight = movieData.title.length > 30 ? 40 : 0;
    const height =
        itemRef.getBoundingClientRect().height > 440
            ? itemRef.getBoundingClientRect().height + extraHeight
            : 440 + extraHeight;

    const diffV = (height - info.height) / 2;
    const [posTop, setPosTop] = useState(info.top - diffV);

    const diffH = (width - info.width) / 2;
    let posLeft = info.left - diffH;

    if (posLeft < 100) {
        posLeft = info.left;
    } else if (posLeft + width > window.innerWidth - 100) {
        posLeft = posLeft - diffH;
    }

    const modalRef = useRef();

    const handleAddToWatchLater = () => {
        addToWatchLater(movieData);
        setMovieData({ ...movieData, watchLater: true });
    };

    const handleRemoveFromWatchLater = () => {
        removeFromWatchLater(movieData.id);
        setMovieData({ ...movieData, watchLater: false });
        if (window.innerWidth > 768) closeModal();
    };

    const getRating = (originalRating = 0) => {
        const newRating = Math.round(originalRating / 2);
        return (
            <>
                {Array(newRating).fill(
                    <img
                        className="star star-full"
                        src="icons/full-star.png"
                        alt=""
                    ></img>
                )}
                {Array(5 - newRating).fill(
                    <img
                        className="star star-empty"
                        src="icons/empty-star.png"
                        alt=""
                    ></img>
                )}
            </>
        );
    };

    useEffect(() => {
        if (!isMobile) {
            window.addEventListener(
                "scroll",
                () => {
                    setPosTop(itemRef.getBoundingClientRect().top - diffV);
                },
                { capture: true }
            );
        }
    }, [diffV, itemRef, isOpened]);

    useEffect(() => {
        getMovieDetails(id).then((data) => {
            setMovieData({
                ...data,
                watchLater: Boolean(
                    watchLater.find((movie) => movie.id === data.id)
                ),
            });
            setDataLoaded(true);
        });
    }, [id, watchLater]);
    return (
        <StyledMiniModal
            width={width}
            height={height}
            posLeft={posLeft}
            posTop={posTop}
            onMouseLeave={
                isMobile || isTablet || (isDesktop && window.innerWidth > 768)
                    ? () => closeModal()
                    : undefined
            }
            ref={modalRef}
        >
            <div className="media-info-wrapper">
                <div className="media-wrapper">
                    <div className="trailer-wrapper">
                        {dataLoaded ? (
                            movieData.yt_trailer_code ? (
                                <iframe
                                    title="Trailer"
                                    src={`https://www.youtube.com/embed/${movieData.yt_trailer_code}?autoplay=1`}
                                    frameborder="0"
                                    allow="fullscreen"
                                ></iframe>
                            ) : movieData.background_image ? (
                                <img
                                    className="img-bg"
                                    src={movieData.background_image}
                                    alt=""
                                />
                            ) : (
                                <p>TRAILER NOT AVAILABLE</p>
                            )
                        ) : (
                            <div className="loading-spinner">
                                <img src="loading-spinner.gif" alt="" />
                            </div>
                        )}
                    </div>
                    <div className="cover-wrapper">
                        <img src={movieData.medium_cover_image} alt="" />
                    </div>
                </div>
                <div className="info-description">
                    <div className="title-close-wrapper">
                        <p className="title" title={movieData.title}>
                            {movieData.title}
                        </p>
                        <div className="close-wrapper">
                            <img
                                className="close"
                                src="icons/close.svg"
                                alt=""
                                onClick={() => closeModal()}
                            />
                        </div>
                    </div>
                    <div className="year-genres">
                        <p>{movieData.year}</p>
                        {movieData.genres.slice(0, 3).map((genre, i) => (
                            <p key={i}>{genre}</p>
                        ))}
                    </div>
                    <div className="rating">{getRating(movieData.rating)}</div>
                    <div className="description">
                        <p>{movieData.description_intro}</p>
                    </div>
                </div>
            </div>
            <div className="buttons-wrapper">
                {/* <a href="/#">Watch</a> */}
                <button className="btn btn-primary">
                    <img src="icons/triangle-filled.png" alt="" />
                    Watch
                </button>
                <button className="btn-icon-description">
                    <img src="icons/download.png" alt="" />
                    Download
                </button>
                {movieData.watchLater ? (
                    <button
                        className={`btn-icon-description ${
                            showRemoveBtn ? "remove" : "tick"
                        }`}
                        onMouseOver={() => setShowRemoveBtn(true)}
                        onMouseLeave={() => setShowRemoveBtn(false)}
                        onClick={() => handleRemoveFromWatchLater()}
                    >
                        <img
                            src={
                                showRemoveBtn
                                    ? "icons/close.svg"
                                    : "icons/tick.png"
                            }
                            alt=""
                        />
                        {showRemoveBtn ? "Remove" : "Added"}
                    </button>
                ) : (
                    <button
                        className="btn-icon-description"
                        onClick={() => handleAddToWatchLater()}
                    >
                        <img src="icons/plus.png" alt="" />
                        Add
                    </button>
                )}
            </div>
        </StyledMiniModal>
    );
};

const mapStateToProps = (state) => ({
    watchLater: state.movies.watchLater.movies,
    isOpened: state.modal.active,
});

const mapDispatchToProps = (dispatch) => {
    return {
        addToWatchLater: (movie) => {
            dispatch({
                type: ADD_TO_WATCH_LATER,
                payload: movie,
            });
        },
        removeFromWatchLater: (id) => {
            dispatch({
                type: REMOVE_FROM_WATCH_LATER,
                payload: id,
            });
        },
        closeModal: () => {
            dispatch({
                type: MODAL_CLOSE,
            });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviePreviewMiniModal);
