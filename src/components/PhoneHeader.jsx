import React from 'react';
import Com from "../css/common.module.css";
import tudoiLogo from "../resources/img/logo.png";
import { TemporaryDrawer } from "./Drawer";
import { useI18n } from "../i18n";

const header = {
    display: "flex",
    width: "auto",
    height: "60px",
    backgroundColor: "rgb(22,22,22)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
}

const logoImg = {
    height: "45px",
}

const menuButton = {
    position: "absolute",
    right: 0,
}

const PhoneHeader = () => {
    const { t } = useI18n();
    return (
        <header className={Com.sp}>
            <div style={header}>
                <img src={tudoiLogo} style={logoImg} alt={t("common.logoAlt")} />
                <div style={menuButton}>
                    <TemporaryDrawer />
                </div>
            </div>
        </header>
    );
};

export default PhoneHeader;