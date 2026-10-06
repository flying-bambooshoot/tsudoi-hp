import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import Grid from '@mui/material/Unstable_Grid2';
import { trackEvent } from "../analytics";
import { useI18n } from "../i18n";
import Lines from "../components/Lines";
import {
    school,
    narita2,
    orympic,
    bellserl
  } from "../resources/img/homeGallery";

const img = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
}

const imgContainer = {
    aspectRatio: "16 / 9",
}

const section = {
    paddingTop: 16,
}

const note = {
    marginTop: "48px",
    paddingTop: "12px",
    borderTop: "solid #eeeeee 1px",
    color: "#8c8c8c",
}

const Intro = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t, tOptional } = useI18n();
    const languageNote = tOptional("contact.languageNote");

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
            <Header />
            <PhoneHeader />
            <div className="pageContent">
            <main className={isMobile ? "phMain" : "main"}>
                <Breadcrumb />
                <section className="title">
                    <h1 className="h2">CONTACT US</h1>
                </section>
                <div style={{padding: "12px 8px"}}>
                    <div style={{margin: "12px 0"}}>
                    <Grid container spacing={isMobile ? 1 : 2}>
                        <Grid item xs={6} style={imgContainer}><img src={school} alt="" style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={narita2} alt="" style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={orympic} alt="" style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={bellserl} alt="" style={img} /></Grid>
                    </Grid>
                    </div>
                    <div>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>{t("contact.requestHeading")}</p>
                        </div>
                        <p><Lines text={t("contact.requestBody")} /></p>
                        <p>{t("contact.requestFirstStep")}</p>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>{t("contact.songsHeading")}</p>
                        </div>
                        <p>{t("contact.songsBody")}</p>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>{t("contact.formationHeading")}</p>
                        </div>
                        <p>{t("contact.formationBody")}</p>
                        {/* <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>料金について</p>
                        </div>
                        <p>
                            東京で6人での演奏の場合、30分10万円～<br />
                            和装の場合は追加料金をいただきます。<br />
                            別途交通費をいただきます。
                        </p>
                        <p>
                            ご予算や会場などシチュエーションに応じて少人数での演奏も承ります。まずはご相談ください。
                        </p> */}
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>{t("contact.priceHeading")}</p>
                        </div>
                        <p><Lines text={t("contact.priceBase")} /></p>
                        {t("contact.priceExtra")}
                        <p>{t("contact.priceSmallGroup")}</p>
                        {t("contact.priceProposal")}
                        <p>{t("contact.priceDisclaimer")}</p>
                    </div>
                    <div>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>{t("contact.contactHeading")}</p>
                        </div>
                        {languageNote && <p>{languageNote}</p>}
                        <p>{t("contact.emailLabel")}<a href="mailto:tsudoi.shamisen@gmail.com" onClick={() => trackEvent("contact_email_click", { location: "contact_page" })}>tsudoi.shamisen@gmail.com</a></p>
                    </div>
                    {/* アクセス解析の表記は注記として小さく表示する */}
                    <div style={note}>
                        <p style={{fontSize: "13px", fontWeight: "bold", margin: "0 0 4px"}}>{t("contact.analyticsHeading")}</p>
                        <p style={{fontSize: "12px", margin: 0}}>
                            {t("contact.analyticsBody")}
                            <a href={t("contact.analyticsLinkUrl")} target="_blank" rel="noopener noreferrer">{t("contact.analyticsLinkText")}</a>
                            {t("contact.analyticsAfterLink")}
                        </p>
                    </div>
                </div>
            </main>
            </div>
            </div>
            <Footer/>
        </>
    );
};

export default Intro;