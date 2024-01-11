import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import All from '../resources/img/all.jpg';
import {
    akane,
    arata,
    suga,
    manami,
    masako,
    uji,
  } from "../resources/img/member";

  const body = {
    height: "auto",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
  }
  
  const phBody = {
    height: "auto",
    margin: "auto 150px",
    fontSize: "16px",
    fontWeight: "bold",
    lineHeight: 1.5,
    letterSpacing: "0.06em",
    fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
  }

  const main = {
    margin: "24px 0",
    padding: "12px",
    backgroundColor: "fff",
  }

  
const phMain = {
    padding: "0 12px 12px 12px",
    backgroundColor: "fff",
}

const title = {
    padding: "10px 10px",
    backgroundColor: "rgb(22,22,22)",
    color: "white",
}

const h1 = {
    margin: 0,
}

const img = {
    objectFit: "cover",
    width: "100%",
    height: "100%",
}

const imgContainer = {
    aspectRatio: "16 / 9",
}

const Intro = () => {
    const isMobile = useMedia('(max-width: 1000px)');

    return (
        <>
            <body style={isMobile ? body : phBody}>
            <Header />
            <PhoneHeader />
            <main style={isMobile ? main : phMain}>
                <section style={title}>
                    <h2 style={h1}>INTRODUCTION / MEMBER</h2>
                </section>
                <div style={{padding: "20px 0"}}>
                <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6} style={{marginBottom: "20px"}}>
                        <img src={All} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>
                                『集-tsudoi-』<br /><br />
                                中原正人、川﨑愛実、藤﨑健太、野口新、枩原茜、須賀行亮の 6 名で 2021 年に結成。<br />
                                全員がどの流派にも属さず活動する異色の団体。<br /><br />
                                津軽三味線の本領である民謡曲のみならず、現代的なリズムやハーモニーを取り入れたオリジナル楽曲など、<br />
                                津軽三味線の合奏の可能性を追求している。<br /><br />
                            </p>
                            <p>
                                【受賞歴】<br />
                                2021年<br />
                                第9回津軽三味線津軽民謡全国大会 inびわ湖 団体独奏曲部門 優勝<br /><br />
                                2022年<br />
                                第40回津軽三味線世界大会 団体の部 優勝<br /><br />
                                2023年<br />
                                第26回津軽三味線コンクール全国大会 合奏 銀獅子賞(10人以下)部門 優勝<br /><br />
                                2023年<br />
                                第11回津軽三味線津軽民謡全国大会 inびわ湖 団体独奏曲部門 優勝
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={masako} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>中原 正人</p>
                            <p>
                            つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、<br/>
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={manami} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>川﨑 愛実</p>
                            <p>
                            つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、<br/>
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={uji} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>藤崎 健太</p>
                            <p>
                            つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、<br/>
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={arata} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>野口 新</p>
                            <p>
                            つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、<br/>
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={suga} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>須賀 行亮</p>
                            <p>
                            つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、<br/>
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={akane} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>枩原 茜</p>
                            <p>
                            つれづれなるまゝに、日暮らし、硯にむかひて、心にうつりゆくよしなし事を、<br/>
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                </Grid>
                </div>
            </main>
            </body>
            <Footer/>
        </>
    );
};

export default Intro;