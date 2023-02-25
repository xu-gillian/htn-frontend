import React, { useState } from "react";
import { useLoginState } from "../context/loginState-context";
import { TEvent } from "../types/Events.types";

// navigation component
type NavBarProps = {
    allEvents: TEvent[],
    setDisplayEvents: any,
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const [navColour, setNavColour] = useState(false);
    const { loginState, setLoginState } = useLoginState();
    const [loginText, setLoginText] = useState("Login");

    // change nav colour when scrolling
    const changeNavColour = () => {
        if (window.scrollY >= 200) {
            setNavColour(true);
        } else {
            setNavColour(false);
        }
    }
    window.addEventListener('scroll', changeNavColour);


    // handle the login state here - when it changes, change which events are displayed
    const loginHandler = () => {
        setLoginState(!loginState);
        if (loginState) {
            props.setDisplayEvents(props.allEvents);
            setLoginText("Logout");
        } else {
            props.setDisplayEvents(props.allEvents.filter((ev: TEvent) => ev.permission === "public"));
            setLoginText("Login");
        }
    }


    return (
        <div className={navColour ? 'nav-top active' : 'nav-top'}>
            <button className="login" onClick={loginHandler}>{loginText}</button>
        </div>
    );
}

export default NavBar;