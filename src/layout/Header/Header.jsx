import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
    StyledHeader,
    StyledNav,
    StyledLogo,
    StyledUserActions,
} from "./StyledHeader";

const Header = () => {
    const [showNavMenu, setShowNavMenu] = useState(false);
    const [showListMenu, setShowListMenu] = useState(false);

    const dropNavRef = useRef();
    const dropListRef = useRef();

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (!dropNavRef.current.contains(e.target) || e.target === null) {
                setShowNavMenu(false);
                setShowListMenu(false);
            }
        });
    }, []);

    return (
        <StyledHeader>
            <div className="content">
                <StyledLogo>
                    <a href="/#">
                        <img src="header/netfloxLogo.png" alt="" />
                    </a>
                </StyledLogo>
                <StyledNav>
                    <div className="content" ref={dropNavRef}>
                        <div
                            className="navMenu1024"
                            onClick={() => setShowNavMenu(!showNavMenu)}
                        >
                            <a href="/#">Discover</a>
                            <img src="triangle_arrow.png" alt="" />
                        </div>
                        <ul className={showNavMenu ? "active" : ""}>
                            <li className="hideMobile">
                                <a href="/#">Home</a>
                            </li>
                            <li>
                                <a href="/#">Movies</a>
                            </li>
                            <li>
                                <a href="/#">TV Shows</a>
                            </li>
                            <li id='myListsWrapper' ref={dropListRef}>
                                <div id='myListsMenu' onClick={() => setShowListMenu(!showListMenu)}>
                                    <a href="/#" >My Lists</a>
                                    <img src="triangle_arrow.png" alt="" />
                                </div>
                                <ul id='myListsDrop' className={showListMenu ? 'active' : ''}>
                                    <li>
                                        <a href="/#">Lista largo simple</a>
                                    </li>
                                    <li>
                                        <a href="/#">Lista nombre super largo</a>
                                    </li>
                                    <li>
                                        <a href="/#">Lista nombre archi mega re extra largo</a>
                                    </li>
                                    <li onClick={ () => alert('new list')}>
                                        <a href="/#">+ New List</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </StyledNav>
                <StyledUserActions>
                    <img id="zoomGlass" src="header/zoomGlass.svg" alt="" />
                    <img
                        id="notificationBell"
                        src="header/notificationBell.svg"
                        alt=""
                    />
                    <img id="userProfile" src="header/userProfile.svg" alt="" />
                </StyledUserActions>
            </div>
        </StyledHeader>
    );
};

export default Header;
