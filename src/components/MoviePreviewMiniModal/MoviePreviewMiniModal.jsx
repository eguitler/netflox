import React from "react";
import { StyledMiniModal } from "./MoviePreviewMiniModalStyles";
import { connect } from "react-redux";
import { ADD_TO_WATCH_LATER, REMOVE_FROM_WATCH_LATER } from "store";

const MoviePreviewMiniModal = ({
    active,
    itemW,
    itemH,
    movieData,
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

    if (!movieData) movieData = emptyData;

    movieData.yt_trailer_code =
        movieData.yt_trailer_code ?? emptyData.yt_trailer_code;
    movieData.torrent =
        movieData.torrents.length > 0
            ? movieData.torrents[0]
            : emptyData.torrent;

    // change implementation of Movie in order to check IDs
    movieData.watchLater = Boolean(
        watchLater.find((movie) => movie.id === movieData.id)
    );

    const getPosY = () => {
        const difference = Math.abs(400 - itemH) / 2;
        const value = 400 > itemH ? -difference : difference;

        return value;
    };
    const getPosX = () => {
        const value = Math.abs(350 - itemW) / -2;
        return value;
    };

    return (
        <StyledMiniModal
            className={active ? "active" : ""}
            posX={getPosX()}
            posY={getPosY()}
        >
            <div className="trailer-wrapper">
                {movieData.yt_trailer_code ? (
                    <iframe
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${movieData.yt_trailer_code}`}
                    ></iframe>
                ) : movieData.background_image ? (
                    <img src={movieData.background_image} alt="" />
                ) : (
                    <p>TRAILER NOT AVAILABLE</p>
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
                            onClick={() => removeFromWatchLater(movieData.id)}
                            alt=""
                        />
                    ) : (
                        <img
                            className="icon add"
                            src="icons/add.svg"
                            onClick={() => addToWatchLater(movieData)}
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MoviePreviewMiniModal);
