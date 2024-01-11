import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import useMedia from '../useMedia';
import { useState } from 'react';
import Com from "../pages/common.module.css";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Instagram from "../resources/img/Instagram_Glyph_White.png";
import X from "../resources/img/logo-white.png";

const footer = {
    width: "auto",
    height: "60px",
    backgroundColor: "rgb(22,22,22)",
    display: "flex",
    alignItems: "center",
    padding: "5px",
}
const phoneFooter = {
    width: "auto",
    backgroundColor: "rgb(22,22,22)",
    display: "flex",
    alignItems: "center",
    padding: "10px",
    flexWrap: "wrap",
    padding: "24px 12px",
}
const footerWord = {
    color: "white",
    display: "flex",
    alignItems: "center",
}
const icon = {
    margin: "0 8px 0 0",
}
const snsIcon = {
    margin: "0 18px 0 0",
    height: "36px",
}
const icons = {
    textAlign: "right",
    width: "100%",
    marginRight: "24px",
}
const phoneIcons = {
    width: "100%",
    marginTop: "10px",
}

const contactInfo = {
    marginLeft: "42px",
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
            <div style={isMobile ? blank : contactInfo}>
                <div style={footerWord}>
                    <div>
                        <EmailIcon style={icon}/>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={handleCopyClick}>tsudoi.shamisen@gmail.com</div>
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
            </div>
        </footer>
    );
};

export default Footer;