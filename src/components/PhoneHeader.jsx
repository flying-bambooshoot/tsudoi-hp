import React from 'react';
import Com from "../pages/common.module.css";
import tudoiLogo from "../resources/img/logo.png";
import { TemporaryDrawer } from "./Drawer";

const header = {
    display: "flex",
    width: "auto",
    height: "60px",
    backgroundColor: "rgb(22,22,22)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
}

const logo = {

}

const logoImg = {
    height: "45px",
}

const menuButton = {
    position: "absolute",
    right: 0,
}

const PhoneHeader = () => {
    return (
        <header className={Com.sp}>
            <div style={header}>
                <img src={tudoiLogo} style={logoImg} />
                <div style={menuButton}>
                    <TemporaryDrawer />
                </div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css"></link>
            <meta name="viewport" content="width=device-width"></meta>
            </div>
        </header>
    );
};

export default PhoneHeader;