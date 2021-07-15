import React from "react";
import { StyledCarouselButton } from "./CarouselButtonStyles";

const CarouselButton = ({ side, className, hidden, disabled, onClick }) => {
    return (
        <StyledCarouselButton
            className={`${side} ${className} ${hidden ? "hidden" : ""} ${disabled ? "disabled" : ""}`}
            disabled={hidden}
            onClick={onClick}
        >
            <img src="icons/arrow.svg" alt="" />
        </StyledCarouselButton>
    );
};

export default CarouselButton;
