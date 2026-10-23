import React from 'react';
import { NavLink } from "react-router-dom";
import Com from "../css/common.module.css";
import { TemporaryDrawer } from "./Drawer";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n";

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

// PC のヘッダーに並べるページへのリンク（SITE_REVIEW_2026-10 の R-53）。
// 以前はメニューボタン（ハンバーガー）の中にしかなく、PC ではページの一覧が見えなかった。
// SNS へのリンクはメニューボタンの中に残す
const nav = {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "4px",
}

const navLink = {
    // 押しやすいよう、文字の周りにも押せる範囲を取る
    display: "inline-block",
    padding: "10px 12px",
    color: "black",
    fontSize: "14px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    letterSpacing: "0.06em",
    textDecoration: "none",
    borderBottom: "solid transparent 2px",
}

// 今いるページは下線で示す
const activeNavLink = {
    ...navLink,
    borderBottom: "solid black 2px",
}

const PAGES = [
    { to: "/", label: "HOME", end: true },
    { to: "/news", label: "NEWS" },
    { to: "/introduction", label: "INTRODUCTION/MEMBER" },
    { to: "/contact", label: "CONTACT US" },
];

const Header = () => {
    const { t, path } = useI18n();
    return (
        <header style={header} className={Com.pc}>
            <div style={row}>
                <nav style={nav} aria-label={t("footer.pages")}>
                    {PAGES.map(({ to, label, end }) => (
                        <NavLink key={to} to={path(to)} end={end} style={({ isActive }) => (isActive ? activeNavLink : navLink)}>
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <LanguageSwitcher style={{marginLeft: "16px", paddingRight: "12px"}} />
                <div>
                    <TemporaryDrawer />
                </div>
            </div>
        </header>
    );
};

export default Header;
