import React from "react";

const Footer = () => {
    return (
        <div style={{ marginTop: "100px", height: "100px", display: "grid", placeItems: "center", backgroundColor: '#111'}}>
            <p>
                Designed and developed by{" "}
                <a
                    href="https://eguitler.ar"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Ezequiel Guitler
                </a>
                .
            </p>
        </div>
    );
};

export default Footer;
