import React, { useRef } from "react";
import { connect } from "react-redux";
import { isMobile } from "react-device-detect";

import { MODAL_OPEN, MODAL_CLOSE } from "store";
import { StyledMovie } from "./MovieStyles";

const Movie = ({
    id,
    src,
    srcSet,
    openModal,
    closeModal,
    modalOpened,
    modalMovieId,
}) => {
    const movieRef = useRef();

    function handleHover() {
        openModal({
            id,
            info: movieRef.current.getBoundingClientRect(),
            ref: movieRef.current,
        });
    }

    function handleClick() {
        if (modalOpened && modalMovieId === id) {
            closeModal();
        } else {
            closeModal();
            setTimeout(() => {
                openModal({
                    id,
                    info: movieRef.current.getBoundingClientRect(),
                    ref: movieRef.current,
                });
            }, 100);
        }
    }

    return (
        <StyledMovie
            onMouseOver={isMobile ? undefined : () => handleHover()}
            onClick={isMobile ? () => handleClick() : undefined}
            ref={movieRef}
        >
            <img
                className="movie-cover"
                src={src}
                srcSet={srcSet}
                alt=""
                loading="lazy"
            />
        </StyledMovie>
    );
};

const mapStateToProps = (state) => ({
    modalOpened: state.modal.active,
    modalMovieId: state.modal.id,
});

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: ({ id, info, ref }) => {
            dispatch({
                type: MODAL_OPEN,
                payload: { info, id, ref },
            });
        },
        closeModal: () => {
            dispatch({
                type: MODAL_CLOSE,
            });
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
