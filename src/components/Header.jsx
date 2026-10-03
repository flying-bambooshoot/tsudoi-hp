import React from 'react';
import Com from "../css/common.module.css";
import { TemporaryDrawer } from "./Drawer";
import LanguageSwitcher from "./LanguageSwitcher";

const header = {
    width: "auto",
    height: "60px",
}

// .pc クラスの display: block !important と競合しないよう、横並びは内側の div で行う
const row = {
    display: "flex",
    alignItems: "center",
    height: "100%",
}

const Header = () => {
    return (
        <header style={header} className={Com.pc}>
            <div style={row}>
                <LanguageSwitcher style={{marginLeft: "auto", paddingRight: "12px"}} />
                <div>
                    <TemporaryDrawer />
                </div>
            </div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css"></link>
            <meta name="viewport" content="width=device-width"></meta>
        </header>
    );
};

export default Header;