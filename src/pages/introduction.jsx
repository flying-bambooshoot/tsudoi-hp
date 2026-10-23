import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import All from '../resources/img/all.webp';
import X from "../resources/img/logo-black.png";
import "../css/introduction.css"
import { useI18n } from "../i18n";
import Lines from "../components/Lines";
import Works from "../components/Works";
import Subheading from "../components/Subheading";
import { responsive } from "../responsiveImage";
import { NewTabNote } from "../components/VisuallyHidden";
import {
    kawasaki,
    matsubara,
    nakahara,
    noguchi,
    suga,
    fujisaki,
  } from "../resources/img/member";


const img = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
}

// 写真の表示の幅（PC は 2 列で約 505px、スマホは画面の幅）。集合写真の先読み（scripts/postbuild.js の LCP_IMAGES）にも同じ値を書いている
const PHOTO_SIZES = "(min-width: 1100px) 520px, (min-width: 900px) 50vw, 100vw";

const year = {
    marginBottom: "3px",
    color: "#757575",
    fontSize: "12px",
}

const content = {
    margin: "3px",
}

const contents = {
    margin: "3px",
    paddingBottom: "6px"
}

const snsIcon = {
    width: "18px",
    height: "18px",
    position: "absolute",
    margin: "auto",
}

const Intro = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t } = useI18n();
    const awards = t("introduction.awards", { returnObjects: true });

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
            <Header />
            <PhoneHeader />
            <div className="pageContent">
            <main className={isMobile ? "phMain" : "main"}>
                <section className="title">
                    <h1 className="h2">INTRODUCTION/MEMBER<Subheading name="introduction" /></h1>
                </section>
                <div style={{padding: "20px 0"}}>
                <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6}>
                        <img className="fadeIn" src={All} {...responsive("all.webp", All, PHOTO_SIZES)} alt={t("introduction.groupPhotoAlt")} style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <div style={{paddingBottom: "36px"}}>
                                <p>
                                    {t("introduction.groupName")}<br /><br />
                                    <Lines text={t("introduction.description")} />
                                </p>
                            </div>
                            <div>
                                <div>
                                    {/* 見出しとして伝わるよう h2 にする（見た目は以前の p と同じ） */}
                                    <h2 style={{borderBottom: "solid #cccccc 1px", fontSize: "16px", margin: "1em 0"}}>{t("introduction.awardsHeading")}</h2>
                                </div>
                                <div>
                                    {awards.map((award) => (
                                        <React.Fragment key={award.year}>
                                            <p style={year}>{award.year}</p>
                                            {award.items.map((item, i) => (
                                                // 同じ年に複数ある場合、最後以外は下に余白を空ける
                                                <p key={item} style={i < award.items.length - 1 ? contents : content}>{item}</p>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Works />
                <div style={{padding: "42px 8px 0 8px"}}>
                    <h2 style={{borderBottom: "solid #cccccc 1px", fontSize: "18px", margin: "1em 0 0"}}>MEMBER<Subheading name="member" /></h2>
                </div>
                <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>{t("introduction.members.nakahara")}</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/shijimidaimajin" target='_blank' rel="noopener noreferrer">
                                        <img src={X} alt={t("introduction.xAccountAlt", { name: t("introduction.members.nakahara") })} style={snsIcon} /><NewTabNote />
                                    </a>
                                </div>
                            </div>
                            <img src={nakahara} {...responsive("member/member_nakahara.webp", nakahara, PHOTO_SIZES)} alt={t("introduction.members.nakahara")} style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>{t("introduction.members.kawasaki")}</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/tsugarumanami" target='_blank' rel="noopener noreferrer">
                                        <img src={X} alt={t("introduction.xAccountAlt", { name: t("introduction.members.kawasaki") })} style={snsIcon} /><NewTabNote />
                                    </a>
                                </div>
                            </div>
                            <img src={kawasaki} {...responsive("member/member_kawasaki.webp", kawasaki, PHOTO_SIZES)} alt={t("introduction.members.kawasaki")} style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>{t("introduction.members.fujisaki")}</p>
                                {/* </div>
                                <div style={{margin: "2px 0 0 6px"}}> */}
                                </div>
                            </div>
                            <img src={fujisaki} {...responsive("member/member_uji.webp", fujisaki, PHOTO_SIZES)} alt={t("introduction.members.fujisaki")} style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>{t("introduction.members.noguchi")}</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/ara527_shami" target='_blank' rel="noopener noreferrer">
                                        <img src={X} alt={t("introduction.xAccountAlt", { name: t("introduction.members.noguchi") })} style={snsIcon} /><NewTabNote />
                                    </a>
                                </div>
                            </div>
                            <img src={noguchi} {...responsive("member/member_noguchi.webp", noguchi, PHOTO_SIZES)} alt={t("introduction.members.noguchi")} style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>{t("introduction.members.suga")}</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/Shamisen_SugA" target='_blank' rel="noopener noreferrer">
                                        <img src={X} alt={t("introduction.xAccountAlt", { name: t("introduction.members.suga") })} style={snsIcon} /><NewTabNote />
                                    </a>
                                </div>
                            </div>
                            <img src={suga} {...responsive("member/member_suga.webp", suga, PHOTO_SIZES)} alt={t("introduction.members.suga")} style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>{t("introduction.members.matsubara")}</p>
                                </div>
                                {/* <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/kappaakane" target='_blank' rel="noopener noreferrer">
                                        <img src={X} alt={t("introduction.xAccountAlt", { name: t("introduction.members.matsubara") })} style={snsIcon} /><NewTabNote />
                                    </a>
                                </div> */}
                            </div>
                            <img src={matsubara} {...responsive("member/member_matsubara.webp", matsubara, PHOTO_SIZES)} alt={t("introduction.members.matsubara")} style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                </Grid>
                </div>
            </main>
            </div>
            </div>
            <Footer/>
        </>
    );
};

export default Intro;