import React from 'react';
import Com from "../css/common.module.css";
import tudoiLogo from "../resources/img/logo.png";
import { TemporaryDrawer } from "./Drawer";
import LanguageSwitcher from "./LanguageSwitcher";
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
    // img の width・height 属性は縦横比の確保に使う。幅は高さに合わせて自動で決める
    width: "auto",
}

// 言語の切り替え（SITE_REVIEW_2026-10 の R-49）。以前はメニューの中にしかなかった。ロゴの左側に置く
const languageSwitcher = {
    position: "absolute",
    left: "8px",
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
                <LanguageSwitcher dark style={languageSwitcher} />
                <img src={tudoiLogo} style={logoImg} alt={t("common.logoAlt")} width="890" height="531" />
                <div style={menuButton}>
                    <TemporaryDrawer />
                </div>
            </div>
        </header>
    );
};

export default PhoneHeader;