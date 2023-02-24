import React, { useState } from "react";

type NavBarProps = {
    loginHandler: any,
    loginText: string,
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const [navColour, setNavColour] = useState(false);

    // change nav colour when scrolling
    const changeNavColour = () => {
        if (window.scrollY >= 200) {
            setNavColour(true);
        } else {
            setNavColour(false);
        }
    }
    window.addEventListener('scroll', changeNavColour);

    return (
        <div className={navColour ? 'nav-top active' : 'nav-top'}>
            <button className="login" onClick={props.loginHandler}>{props.loginText}</button>
        </div>
    );
}

export default NavBar;