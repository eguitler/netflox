import React, { useEffect } from "react";
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
    const dropNavRef = useRef();

    const [showDiscoveryMenu, setShowDiscoveryMenu] = useState(
        window.innerWidth <= 1024 && window.innerWidth > 768
    );
    const [showMobileMenu, setShowMobileMenu] = useState(
        window.innerWidth <= 768
    );

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

    const discoveryItems = [
        { content: "Home" },
        { content: "Movies" },
        { content: "TV Shows" },
        {
            content: (
                <Dropdown
                    menuItem={"My Lists"}
                    items={myListsItems}
                    maxWidth="500px"
                    textWrap="nowrap"
                    position={{ left: "105%", top: "-10px" }}
                    addTriangle={true}
                    triangleRotation="-90"
                    nestedDropdown={true}
                    // responsive={[{ 768: { position: { left: 0, top: 0 } } }]}
                />
            ),
        },
    ];

    const menuItems = [
        { content: "Home" },
        { content: "Movies" },
        { content: "TV Shows" },
        {
            content: (
                <Dropdown
                    menuItem={"My Lists"}
                    items={myListsItems}
                    maxWidth="500px"
                    textWrap="nowrap"
                    position={
                        showMobileMenu
                            ? { top: "100%", right: "0" }
                            : { top: "100%", left: "0" }
                    }
                    addTriangle={true}
                    triangleRotation="-180"
                    // responsive={[{ 768: { position: { left: 0, top: 0 } } }]}
                />
            ),
        },
    ];

    useEffect(() => {
        window.addEventListener("resize", () => {
            const screenW = window.innerWidth;
            setShowDiscoveryMenu(screenW <= 1024 && screenW > 768);
            setShowMobileMenu(screenW <= 768);
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
                        {showDiscoveryMenu ? (
                            <Dropdown
                                menuItem={"Discover"}
                                items={discoveryItems}
                                width="100%"
                                textWrap="nowrap"
                                addTriangle={true}
                                triangleRotation="-180"
                            />
                        ) : (
                            <ul>
                                {menuItems.map((item, i) => (
                                    <li key={i}>
                                        {item.content}
                                    </li>
                                ))}
                            </ul>
                        )}
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
