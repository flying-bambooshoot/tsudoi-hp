import React from 'react';
import useMedia from '../useMedia';
import Com from "../pages/common.module.css";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Instagram from "../resources/img/Instagram_Glyph_White.png";
import X from "../resources/img/logo-white.png";
import YouTube from "../resources/img/youtube.png";
import { Link } from "react-router-dom";

const footer = {
    width: "auto",
    height: "60px",
    backgroundColor: "rgb(22,22,22)",
    display: "flex",
    alignItems: "center",
    padding: "18px",
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
    padding: "10px",
    flexWrap: "wrap",
    fontSize: "16px",
    padding: "24px",
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
    height: "36px",
}
const icons = {
    textAlign: "right",
    width: "100%",
    marginRight: "24px",
}
const phoneIcons = {
    width: "100%",
    marginTop: "24px",
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
    paddingBottom: "4px",
}

const phoneMaterials = {
    flexFlow: "column"
}

const blank = {}

const Footer = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const handleCopyClick = () => {
        navigator.clipboard.writeText("tsudoi.shamisen@gmail.com");
        window.alert("メールアドレスをコピーしました。");
    };

    return (
        <footer style={isMobile ? phoneFooter : footer}>
                <div className={Com.sp} style={{paddingBottom: "24px"}}>
                    <div style={link}>
                        <Link style={linkWord} key='HOME' to="/tsudoi-hp/">HOME</Link>
                    </div>
                    <div style={link}>
                        <Link style={linkWord} to="/tsudoi-hp/news">NEWS</Link>
                    </div>
                    <div style={link}>
                        <Link style={linkWord} to="/tsudoi-hp/introduction">INTRODUCTION/MEMBER</Link>
                    </div>
                    <div style={link}>
                        <Link style={linkWord} to="/tsudoi-hp/contact">CONTACT US</Link>
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
                            <div><LocalPhoneIcon style={icon}/></div><a href="tel:080-6744-3905" style={{color: "white"}}>080-6744-3905</a>
                        </div>
                    </div>
                    <div className={Com.pc}>
                        <div style={footerWord}>
                            <div><LocalPhoneIcon style={icon}/></div><div>080-6744-3905</div>
                        </div>
                    </div>
                </div>
                <div style={isMobile ? phoneIcons : icons}>
                    <a href="https://twitter.com/tsudoi_shamisen" target='_blank'>
                        <img src={X} alt="" style={snsIcon} />
                    </a>
                    <a href="https://www.instagram.com/tsudoi_shamisen" target='_blank'>
                        <img src={Instagram} alt="" style={snsIcon} />
                    </a>
                    <a href="https://www.youtube.com/channel/UCvELpZfQ5fD4i-b8NfyXm9w" target='_blank'>
                        <img src={YouTube} alt="" style={snsIcon} />
                    </a>
                </div>
        </footer>
    );
};

export default Footer;