import React from "react";
import { StyledMiniModal } from "./MoviePreviewMiniModalStyles";
import { connect } from "react-redux";
import { ADD_TO_WATCH_LATER, REMOVE_FROM_WATCH_LATER } from "store";
import { MODAL_CLOSE } from "store";
import { useEffect } from "react";
import { getMovieDetails } from "services/movies";
import { useState } from "react";
import { useRef } from "react";
import { isMobile } from "react-device-detect";

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
        torrents: [],
        torrent: { url: "", size: "" },
        year: "",
        genres: [],
        description_intro: "",
    };

    const [movieData, setMovieData] = useState(emptyData);
    const [dataLoaded, setDataLoaded] = useState(false);

    const width = 350;
    const height =
        itemRef.getBoundingClientRect().height > 400
            ? itemRef.getBoundingClientRect().height
            : 400;

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
        closeModal();
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
                torrent: data.torrents[0],
                watchLater: Boolean(
                    watchLater.find((movie) => movie.id === data.id)
                ),
            });
            setDataLoaded(true);
        });
    }, []);
    return (
        <StyledMiniModal
            width={width}
            height={height}
            posLeft={posLeft}
            posTop={posTop}
            onMouseLeave={() => closeModal()}
            ref={modalRef}
        >
            <div className="trailer-wrapper">
                {dataLoaded ? (
                    movieData.yt_trailer_code ? (
                        <iframe
                            title="Trailer"
                            src={`https://www.youtube.com/embed/${movieData.yt_trailer_code}`}
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
            <div className="info-description">
                <div className="title-genres-wrapper">
                    <p className="title" title={movieData.title}>
                        {movieData.title}
                    </p>
                    <div className="year-genres">
                        <p>{movieData.year}</p>
                        {movieData.genres.slice(0, 3).map((genre, i) => (
                            <p key={i}>{genre}</p>
                        ))}
                    </div>
                </div>
                <div className="description">
                    <p>{movieData.description_intro}</p>
                </div>
                <div className="buttons-wrapper">
                    <a
                        href={movieData.torrent.url}
                        className={!movieData.torrent ? "disabled" : ""}
                        download
                    >
                        <img src="icons/download.svg" alt="" />
                        {movieData.torrent
                            ? `.torrent (${movieData.torrent.size})`
                            : "NO TORRENT"}
                    </a>
                    {movieData.watchLater ? (
                        <img
                            className="icon tick"
                            src="icons/tick.svg"
                            onClick={() => handleRemoveFromWatchLater()}
                            alt=""
                        />
                    ) : (
                        <img
                            className="icon add"
                            src="icons/add.svg"
                            onClick={() => handleAddToWatchLater()}
                            alt=""
                        />
                    )}
                </div>
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
