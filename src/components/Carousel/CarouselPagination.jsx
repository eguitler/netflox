import React from "react";
import { StyledCarouselPagination } from "./CarouselPaginationStyles";

const CarouselPagination = ({ className, disabled }) => {
    return (
        <StyledCarouselPagination
            className={`${className} ${disabled ? "disabled" : ""}`}
        />
    );
};

export default CarouselPagination;
