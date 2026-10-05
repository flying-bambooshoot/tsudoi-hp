import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import Grid from '@mui/material/Unstable_Grid2';
import All from '../resources/img/all.jpg';
import X from "../resources/img/logo-black.png";
import "../css/introduction.css"
import { useI18n } from "../i18n";
import Lines from "../components/Lines";
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

const year = {
    marginBottom: "3px",
    color: "#8c8c8c",
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
            <main className={isMobile ? "phMain" : "main"}>
                <Breadcrumb />
                <section className="title">
                    <h1 className="h2">INTRODUCTION/MEMBER</h1>
                </section>
                <div style={{padding: "20px 0"}}>
                <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6}>
                        <img className="fadeIn" src={All} alt="" style={img} />
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
                                    <p style={{borderBottom: "solid #cccccc 1px", fontSize: "16px"}}>{t("introduction.awardsHeading")}</p>
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
                <div style={{padding: "42px 8px 0 8px"}}>
                    <p style={{borderBottom: "solid #cccccc 1px", fontSize: "18px", marginBottom: "0"}}>MEMBER</p>
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
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={nakahara} alt="" style={img} loading="lazy" decoding="async" />
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
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={kawasaki} alt="" style={img} loading="lazy" decoding="async" />
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
                            <img src={fujisaki} alt="" style={img} loading="lazy" decoding="async" />
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
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={noguchi} alt="" style={img} loading="lazy" decoding="async" />
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
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={suga} alt="" style={img} loading="lazy" decoding="async" />
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
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div> */}
                            </div>
                            <img src={matsubara} alt="" style={img} loading="lazy" decoding="async" />
                        </div>
                    </Grid>
                </Grid>
                </div>
            </main>
            </div>
            <Footer/>
        </>
    );
};

export default Intro;