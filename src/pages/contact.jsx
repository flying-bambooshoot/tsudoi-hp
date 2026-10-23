import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import { trackEvent } from "../analytics";
import ContactForm from "../components/ContactForm";
import Faq from "../components/Faq";
import { useI18n } from "../i18n";
import Lines from "../components/Lines";
import { responsive } from "../responsiveImage";
import { NewTabNote } from "../components/VisuallyHidden";
import site from "../data/site.json";
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

// 上の写真 4 枚の表示の幅（2 列。PC は本文の幅が決まっているので約 505px）
const PHOTO_SIZES = "(min-width: 1100px) 520px, 50vw";

const imgContainer = {
    aspectRatio: "16 / 9",
}

const section = {
    paddingTop: 16,
}

// 区切りの見出し。読み上げソフトや検索エンジンに見出しと伝わるよう h2 にし、見た目は以前の p と同じにする
const sectionHeading = {
    borderBottom: "solid #cccccc 1px",
    fontSize: "20px",
    margin: "1em 0",
}

const note = {
    marginTop: "48px",
    paddingTop: "12px",
    borderTop: "solid #eeeeee 1px",
    color: "#757575",
}

const Contact = () => {
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
                <section className="title">
                    <h1 className="h2">CONTACT US</h1>
                </section>
                <div style={{padding: "12px 8px"}}>
                    <div style={{margin: "12px 0"}}>
                    <Grid container spacing={isMobile ? 1 : 2}>
                        <Grid item xs={6} style={imgContainer}><img src={school} {...responsive("homeGallery/school.webp", school, PHOTO_SIZES)} alt={t("photos.school")} style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={narita2} {...responsive("homeGallery/narita_stage.webp", narita2, PHOTO_SIZES)} alt={t("photos.naritaStage")} style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={orympic} {...responsive("homeGallery/orympic.webp", orympic, PHOTO_SIZES)} alt={t("photos.tokyo2020")} style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={bellserl} {...responsive("homeGallery/bellserl.webp", bellserl, PHOTO_SIZES)} alt={t("photos.cultureStage")} style={img} /></Grid>
                    </Grid>
                    </div>
                    <div>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.requestHeading")}</h2>
                        </div>
                        <p><Lines text={t("contact.requestBody")} /></p>
                        <p>{t("contact.requestFirstStep")}</p>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.songsHeading")}</h2>
                        </div>
                        <p>{t("contact.songsBody")}</p>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.formationHeading")}</h2>
                        </div>
                        <p>{t("contact.formationBody")}</p>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.priceHeading")}</h2>
                        </div>
                        <p><Lines text={t("contact.priceBase")} /></p>
                        {t("contact.priceExtra")}
                        <p>{t("contact.priceSmallGroup")}</p>
                        {t("contact.priceProposal")}
                        <p>{t("contact.priceDisclaimer")}</p>
                    </div>
                    <div>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.faq.heading")}</h2>
                        </div>
                        <Faq />
                    </div>
                    <div>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.formHeading")}</h2>
                        </div>
                        <ContactForm />
                    </div>
                    <div>
                        <div style={section}>
                            <h2 style={sectionHeading}>{t("contact.contactHeading")}</h2>
                        </div>
                        {languageNote && <p>{languageNote}</p>}
                        <p>{t("contact.emailLabel")}<a href={`mailto:${site.email}`} onClick={() => trackEvent("contact_email_click", { location: "contact_page" })}>{site.email}</a></p>
                    </div>
                    {/* アクセス解析の表記は注記として小さく表示する */}
                    <div style={note}>
                        <p style={{fontSize: "13px", fontWeight: "bold", margin: "0 0 4px"}}>{t("contact.analyticsHeading")}</p>
                        <p style={{fontSize: "12px", margin: 0}}>
                            {t("contact.analyticsBody")}
                            <a href={t("contact.analyticsLinkUrl")} target="_blank" rel="noopener noreferrer">{t("contact.analyticsLinkText")}<NewTabNote /></a>
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

export default Contact;