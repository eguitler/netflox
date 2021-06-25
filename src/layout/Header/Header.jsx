import React from "react";
import { useRef } from "react";
import { useState } from "react";
import {
    StyledHeader,
    StyledNav,
    StyledLogo,
    StyledUserActions,
} from "./HeaderStyles";

import Dropdown from "components/Dropdown/Dropdown";

const Header = () => {
    const [showNavMenu, setShowNavMenu] = useState(false);
    const dropNavRef = useRef();

    const myListsItems = [
        {
            url: "/#",
            onClick: (e) => {
                console.log("hola");
            },
            content: "here will be your lists!",
        },
        { class: "divider" },
        {
            onClick: () => alert("Here you will create your own lists!"),
            content: <p>+ New List</p>,
        },
    ];

    const notificationItems = [{ content: "You have no notifications yet!" }];

    const profileItems = [
        { content: "Profile" },
        { content: "Settings" },
        { class: "divider" },
        { content: "Log Out" },
    ];
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
                            <li id="myListsWrapper">
                                <Dropdown
                                    menuItem={
                                        <div id="myListsMenu">
                                            <a href="/#">My Lists</a>
                                            <img
                                                src="triangle_arrow.png"
                                                alt=""
                                            />
                                        </div>
                                    }
                                    items={myListsItems}
                                    maxWidth="500px"
                                    textWrap="nowrap"
                                    responsive={[{768: {position:{right:0}}}]}
                                />
                            </li>
                        </ul>
                    </div>
                </StyledNav>
                <StyledUserActions>
                    <img id="zoomGlass" src="header/zoomGlass.svg" alt="" />
                    <Dropdown
                        menuItem={
                            <img
                                id="notificationBell"
                                src="header/notificationBell.svg"
                                alt=""
                            />
                        }
                        items={notificationItems}
                        width="100%"
                        maxWidth="350px"
                        textWrap="nowrap"
                        position={{ right: 0 }}
                    />
                    <Dropdown
                        menuItem={
                            <img
                                id="userProfile"
                                src="header/userProfile.svg"
                                alt=""
                            />
                        }
                        items={profileItems}
                        width="100%"
                        maxWidth="350px"
                        textWrap="nowrap"
                        position={{ right: 0 }}
                    />
                </StyledUserActions>
            </div>
        </StyledHeader>
    );
};

export default Header;
