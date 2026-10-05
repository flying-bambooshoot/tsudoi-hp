import React from 'react';
import useMedia from '../useMedia';
import Com from "../css/common.module.css";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Instagram from "../resources/img/Instagram_Glyph_White.png";
import X from "../resources/img/logo-white.png";
import YouTube from "../resources/img/youtube.png";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics";
import { useI18n } from "../i18n";

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
const snsIcon = {
    margin: "0 24px 0 0",
    height: "26px",
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
    color: "white",
    fontSize: "14px",
    letterSpacing: "0.06em",
    textDecoration: "none",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
}

const link = {
    paddingBottom: "18px",
}

const blank = {}

const Footer = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t, path } = useI18n();
    const handleCopyClick = () => {
        navigator.clipboard.writeText("tsudoi.shamisen@gmail.com");
        trackEvent("contact_email_copy", { location: "footer" });
        window.alert(t("footer.emailCopied"));
    };

    return (
        <footer style={isMobile ? phoneFooter : footer}>
                <div className={Com.sp} style={{padding: "24px 0 24px 0"}}>
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
                </div>
                <div style={isMobile ? blank : contactInfo}>
                    <div style={footerWord}>
                        <div>
                            <EmailIcon style={icon}/>
                        </div>
                        <div style={{ textDecoration:"underline"}} onClick={handleCopyClick}>tsudoi.shamisen@gmail.com</div>
                    </div>
                    <div className={Com.sp}>
                        <div style={footerWord}>
                            <div><LocalPhoneIcon style={icon}/></div><a href={t("contact.phoneHref")} style={{color: "white"}} onClick={() => trackEvent("contact_phone_click", { location: "footer" })}>{t("contact.phoneDisplay")}</a>
                        </div>
                    </div>
                    <div className={Com.pc}>
                        <div style={footerWord}>
                            <div><LocalPhoneIcon style={icon}/></div><div>{t("contact.phoneDisplay")}</div>
                        </div>
                    </div>
                </div>
                <div style={isMobile ? phoneIcons : icons}>
                    <a href="https://twitter.com/tsudoi_shamisen" target='_blank'>
                        <img src={X} alt="" style={snsIcon} loading="lazy" decoding="async" />
                    </a>
                    <a href="https://www.instagram.com/tsudoi_shamisen" target='_blank'>
                        <img src={Instagram} alt="" style={snsIcon} loading="lazy" decoding="async" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCvELpZfQ5fD4i-b8NfyXm9w" target='_blank'>
                        <img src={YouTube} alt="" style={snsIcon} loading="lazy" decoding="async" />
                    </a>
                </div>
        </footer>
    );
};

export default Footer;