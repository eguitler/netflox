import React from "react";

const Footer = () => {
    return (
        <div style={{ height: "100px", display: "grid", placeItems: "center", backgroundColor: '#111'}}>
            <p>
                Designed and developed by{" "}
                <a
                    href="https://eguitler.ar"
                    target="_blank"
                    rel="noreferrer nofollow"
                >
                    Ezequiel Guitler
                </a>
                .
            </p>
        </div>
    );
};

export default Footer;
