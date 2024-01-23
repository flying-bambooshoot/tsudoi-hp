import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import {
    narita1,
    narita2,
    orympic,
    shamicore
  } from "../resources/img/homeGallery";

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
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>
            <body style={isMobile ? body : phBody}>
            <Header />
            <PhoneHeader />
            <main style={isMobile ? main : phMain }>
                <section style={title}>
                    <h2 style={h1}>CONTACT US</h2>
                </section>
                <div style={{padding: "12px 8px"}}>
                    <div style={{margin: "12px 0"}}>
                    <Grid container spacing={isMobile ? 1 : 2}>
                        <Grid item xs={6} style={imgContainer}><img src={narita1} alt="" style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={narita2} alt="" style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={orympic} alt="" style={img} /></Grid>
                        <Grid item xs={6} style={imgContainer}><img src={shamicore} alt="" style={img} /></Grid>
                    </Grid>
                    </div>
                    <div>
                        <h3>ご依頼について</h3>
                        <p>パーティ/式典/お祭りなどでの演奏を承ります。<br/>
                        楽曲や演奏時間についてはイベントに合わせて柔軟に対応可能です。</p>
                        <div>[曲目]</div>
                        <p>民謡/現代曲/カバーなど様々な楽曲の演奏が可能です。<br/>演奏する曲目についてはイベントに合わせてご相談ください。</p>
                        <div>[編成]</div>
                        <p>2～6人</p>
                        <div>[金額]</div>
                        <p>東京での演奏の場合、30分10万円～<br />
                        和装の場合は</p>
                    </div>
                    <div>
                        <h3>連絡先</h3>
                        <p>メールアドレス：tsudoi.shamisen@gmail.com<br/>
                        電話番号：080-6744-3905</p>
                    </div>
                </div>
            </main>
            </body>
            <Footer/>
        </>
    );
};

export default Intro;