import React from "react";
import { StyledMiniModal } from "./MoviePreviewMiniModalStyles";

const MoviePreviewMiniModal = ({ active, itemW, itemH, movieData }) => {
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
                        {movieData.genres.slice(0, 4).map((genre) => (
                            <p>{genre}</p>
                        ))}
                    </div>
                </div>
                <div className="description">
                    <p>{movieData.description_intro}</p>
                </div>
                <div className="button-wrapper">
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
                </div>
            </div>
        </StyledMiniModal>
    );
};

export default MoviePreviewMiniModal;
