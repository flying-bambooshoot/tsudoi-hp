import React from 'react';
import Com from "../pages/common.module.css";
import { TemporaryDrawer } from "./Drawer";

const header = {
    width: "auto",
    height: "60px",
}

const menuButton = {

}

const Header = () => {
    return (
        <header style={header} className={Com.pc}>
            <div>
                <TemporaryDrawer style={menuButton} />
            </div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css"></link>
            <meta name="viewport" content="width=device-width"></meta>
        </header>
    );
};

export default Header;