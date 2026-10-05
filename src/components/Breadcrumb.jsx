import React from "react";
import { Link, useLocation } from "react-router-dom";
import Com from "../css/common.module.css";
import { splitPath } from "../i18n/languages";
import { useI18n } from "../i18n";

// パンくずリストに表示するページ名（メニューと同じ表記、全言語共通）。
// scripts/pages.js の label にも同じ対応表があるので、変更するときは両方を直す
const PAGE_LABELS = {
    "/news": "NEWS",
    "/introduction": "INTRODUCTION/MEMBER",
    "/contact": "CONTACT US",
};

const list = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "0 0 8px",
    padding: 0,
    listStyle: "none",
    fontSize: "13px",
    color: "#8c8c8c",
}

const homeLink = {
    color: "#555555",
    textDecoration: "none",
}

const separator = {
    margin: "0 8px",
}

const currentPage = {
    color: "black",
}

// PC 用のパンくずリスト（例: HOME › NEWS）。スマホではヘッダーのロゴから HOME に戻る
const Breadcrumb = () => {
    const { t, path } = useI18n();
    const { path: pagePath } = splitPath(useLocation().pathname);
    const label = PAGE_LABELS[pagePath];
    if (!label) return null; // TOP など、対応表にないページでは表示しない

    return (
        <nav aria-label={t("common.breadcrumb")} className={Com.pc}>
            <ol style={list}>
                <li>
                    <Link to={path("/")} style={homeLink}>HOME</Link>
                    <span style={separator} aria-hidden="true">›</span>
                </li>
                <li aria-current="page" style={currentPage}>{label}</li>
            </ol>
        </nav>
    );
};

export default Breadcrumb;
