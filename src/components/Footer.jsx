import React from 'react';
import useMedia from '../useMedia';
import Com from "../css/common.module.css";
import EmailIcon from '@mui/icons-material/Email';
import Instagram from "../resources/img/Instagram_Glyph_White.png";
import X from "../resources/img/logo-white.png";
import YouTube from "../resources/img/youtube.png";
import { Link, useLocation } from "react-router-dom";
import { trackEvent } from "../analytics";
import { useI18n } from "../i18n";
import { NewTabNote } from "./VisuallyHidden";
import site from "../data/site.json";
import { LANGUAGES, splitPath, localizePath } from "../i18n/languages";

const footer = {
    width: "auto",
    height: "120px",
    backgroundColor: "rgb(22,22,22)",
    display: "flex",
    alignItems: "center",
    padding: "18px 120px",
    boxSizing: "border-box",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
}
const phoneFooter = {
    width: "auto",
    backgroundColor: "rgb(22,22,22)",
    display: "flex",
    flexFlow: "column",
    padding: "24px 24px 36px 24px",
    flexWrap: "wrap",
    boxSizing: "border-box",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: 1.8,
    letterSpacing: "0.06em",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
}
const footerWord = {
    color: "white",
    display: "flex",
    alignItems: "center",
}
const icon = {
    margin: "6px 8px 0 0",
}
// キーボードでも押せるよう button にしている。ブラウザ標準のボタンの見た目を消し、周りの文字と同じ見た目にする
const emailButton = {
    padding: 0,
    border: "none",
    background: "none",
    color: "inherit",
    font: "inherit",
    letterSpacing: "inherit",
    textDecoration: "underline",
    cursor: "pointer",
}
const snsIcon = {
    display: "block",
    height: "26px",
}

// SNS のアイコンのリンク。押せる範囲を周りに 9px 広げ（約 44px 角）、その分だけ外側を詰めて、
// アイコンの位置と間隔（24px）は以前と同じにする（SITE_REVIEW_2026-10 の R-48）
const snsLink = {
    display: "inline-block",
    verticalAlign: "middle",
    padding: "9px",
    margin: "-9px 15px -9px -9px",
}
const icons = {
    textAlign: "right",
    flex: 1,
    minWidth: 0,
}
const phoneIcons = {
    width: "100%",
    marginTop: "40px",
}

const contactInfo = {
    marginLeft: "42px",
}

const linkWord = {
    display: "inline-block",
    padding: "8px 0",
    color: "white",
    fontSize: "14px",
    letterSpacing: "0.06em",
    textDecoration: "none",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
}

// スマホのページへのリンク。押せる範囲を上下に 8px 広げ（高さ約 36px）、その分だけ間隔を詰めて、
// 見た目の位置は以前と同じにする（SITE_REVIEW_2026-10 の R-48）
const link = {
    paddingBottom: "2px",
}

const blank = {}

// 各言語版へのリンク（SITE_REVIEW_2026-10 の R-41）。今見ているページの別の言語版へ移る。
// ヘッダーの言語切り替えはプルダウン（select）で、検索エンジンがリンクとしてたどれないため、
// ふつうのリンク（a href・hreflang）も置いておく。今の言語は白い文字にし、リンクにはしない
const languageLinks = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0 14px",
    marginTop: "6px",
    fontSize: "12px",
    fontWeight: "normal",
    letterSpacing: "0.04em",
}

const languageLink = {
    color: "#aaaaaa",
    textDecoration: "none",
}

const currentLanguage = {
    color: "white",
}

const LanguageLinks = () => {
    const { language, t } = useI18n();
    const { path } = splitPath(useLocation().pathname);
    return (
        <nav style={languageLinks} aria-label={t("common.languageMenu")}>
            {LANGUAGES.map((lang) =>
                lang.code === language.code ? (
                    <span key={lang.code} lang={lang.code} style={currentLanguage} aria-current="true">{lang.label}</span>
                ) : (
                    <Link key={lang.code} to={localizePath(lang, path)} hrefLang={lang.code} lang={lang.code} style={languageLink}>
                        {lang.label}
                    </Link>
                )
            )}
        </nav>
    );
};

const Footer = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t, path } = useI18n();
    const handleCopyClick = () => {
        trackEvent("contact_email_copy", { location: "footer" });
        // コピーできなかったとき（古いブラウザ・権限がない場合など）は、メールアドレスを表示して伝える。
        // 以前は失敗しても「コピーしました」と表示していた
        const failed = () => window.alert(t("footer.emailCopyFailed", { email: site.email }));
        if (!navigator.clipboard) return failed();
        navigator.clipboard.writeText(site.email).then(() => window.alert(t("footer.emailCopied")), failed);
    };

    return (
        <footer style={isMobile ? phoneFooter : footer}>
                {/* スマホだけに出すページへのリンク。読み上げソフトにメニューと伝わるよう nav にする */}
                <nav className={Com.sp} style={{padding: "16px 0 16px 0"}} aria-label={t("footer.pages")}>
                    <div style={link}>
                        <Link style={linkWord} key='HOME' to={path("/")}>HOME</Link>
                    </div>
                    <div style={link}>
                        <Link style={linkWord} to={path("/news")}>NEWS</Link>
                    </div>
                    <div style={link}>
                        <Link style={linkWord} to={path("/introduction")}>INTRODUCTION/MEMBER</Link>
                    </div>
                    <div style={link}>
                        <Link style={linkWord} to={path("/contact")}>CONTACT US</Link>
                    </div>
                </nav>
                <div style={isMobile ? blank : contactInfo}>
                    <div style={footerWord}>
                        <div>
                            <EmailIcon style={icon}/>
                        </div>
                        <button type="button" style={emailButton} onClick={handleCopyClick}>{site.email}</button>
                    </div>
                    <LanguageLinks />
                </div>
                <div style={isMobile ? phoneIcons : icons}>
                    <a href={site.sns.x} target='_blank' rel="noopener noreferrer" style={snsLink}>
                        <img src={X} alt="X" style={snsIcon} loading="lazy" decoding="async" /><NewTabNote />
                    </a>
                    <a href={site.sns.instagram} target='_blank' rel="noopener noreferrer" style={snsLink}>
                        <img src={Instagram} alt="Instagram" style={snsIcon} loading="lazy" decoding="async" /><NewTabNote />
                    </a>
                    <a href={site.sns.youtube} target='_blank' rel="noopener noreferrer" style={snsLink}>
                        <img src={YouTube} alt="YouTube" style={snsIcon} loading="lazy" decoding="async" /><NewTabNote />
                    </a>
                </div>
        </footer>
    );
};

export default Footer;