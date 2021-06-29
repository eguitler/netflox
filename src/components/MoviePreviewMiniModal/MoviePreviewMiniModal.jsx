import React, { useEffect, useRef, useState } from "react";
import { StyledMiniModal } from "./MoviePreviewMiniModalStyles";

const MoviePreviewMiniModal = ({ active, itemW, itemH, movieData }) => {
    const getPosY = () => {
        const difference = Math.abs(400 - itemH) / 2;
        const value = 400 > itemH ? -difference : difference;

        return value;
    };
    const getPosX = () => {
        const value = Math.abs(350 - itemW) / -2;
        return value;
    };

    const trailerCode = movieData.yt_trailer_code ?? null;
    const torrent = movieData.torrents ? movieData.torrents[0] : null;

    return (
        <StyledMiniModal
            className={active ? "active" : ""}
            posX={getPosX()}
            posY={getPosY()}
        >
            <div className="trailer-wrapper">
                {trailerCode ? (
                    <iframe
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${movieData.yt_trailer_code}`}
                    ></iframe>
                ) : (
                    <p>TRAILER NOT AVAILABLE</p>
                )}
            </div>
            <div className="info-description">
                <div className='title-genres-wrapper'>
                    <p className="title">{movieData.title}</p>
                    <div className="year-genres">
                        <p>{movieData.year}</p>
                        {movieData.genres.map((genre) => (
                            <p>{genre}</p>
                        ))}
                    </div>
                </div>
                <div className="description">
                    <p>{movieData.description_intro}</p>
                </div>
                <div className="button-wrapper">
                    <a href={torrent.url} download>
                        <img src="icons/download.svg" alt="" />
                        {torrent ? `.torrent (${torrent.size})` : "NO TORRENTS"}
                    </a>
                </div>
            </div>
        </StyledMiniModal>
    );
};

export default MoviePreviewMiniModal;
