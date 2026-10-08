import React from 'react';
import Com from "../css/common.module.css";
import tudoiLogo from "../resources/img/logo.png";
import { TemporaryDrawer } from "./Drawer";
import { useI18n } from "../i18n";
import { Link } from "react-router-dom";

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

// リンクの余白で帯の高さが変わらないよう、ロゴの大きさに合わせる
const logoLink = {
    display: "flex",
}

const menuButton = {
    position: "absolute",
    right: 0,
}

const PhoneHeader = () => {
    const { t, path } = useI18n();
    return (
        <header className={Com.sp}>
            <div style={header}>
                {/* ロゴを押すと、表示中の言語の HOME へ戻る */}
                <Link to={path("/")} style={logoLink}>
                    <img src={tudoiLogo} style={logoImg} alt={t("common.logoAlt")} />
                </Link>
                <div style={menuButton}>
                    <TemporaryDrawer />
                </div>
            </div>
        </header>
    );
};

export default PhoneHeader;