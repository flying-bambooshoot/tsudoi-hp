import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import All from '../resources/img/all.jpg';
import {
    kawasaki,
    matsubara,
    nakahara,
    noguchi,
    suga,
    fujisaki,
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
                        <img src={nakahara} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>中原 正人</p>
                            <p>
                            18歳のときに初代 高橋竹山の演奏に感銘を受け、津軽三味線を始める。
                            伝統的な津軽民謡だけに留まらず、ロック、メタル、民族音楽など多様な音楽を取り入れたジャンルレスな作曲と演奏を得意とする。<br /><br />
                            全国大会では個人、デュオ、団体の3部門でこれまでに9度の優勝を獲得。
                            細川たかし、長山洋子、コロッケなど著名アーティストとの共演も多数。
                            また、『明治大学津軽三味線 響』の講師を務めるなど演奏指導にも力を入れている。
                            </p>
                            <p>
                                Facebook https://www.facebook.com/origamian.masa<br />
                                Instagram https://www.instagram.com/shamisen_masanchu<br />
                                X https://x.com/shijimidaimajin
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={kawasaki} alt="" style={img} />
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
                        <img src={fujisaki} alt="" style={img} />
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
                        <img src={noguchi} alt="" style={img} />
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
                            埼玉県出身。
                            浪人時代に津軽三味線の存在を知り、明治大学進学時に当大学公認サークルの津軽三味線響に入会。<br /><br />
                            楽器未経験から始めて3年で津軽三味線全国大会で個人入賞。
                            代表としては、津軽三味線全国大会、世界大会の団体部門でサークル初出場初入賞。
                            また、当サークル初の主催イベントである第一回定期演奏会にて総監督として尽力。
                            大学卒業後も、津軽三味線の力強い音色を多くの人に聴いてほしいとの思いから活動中。
                            </p>
                            <p>
                                X：https://x.com/shamisen_suga<br />
                                Instagram：https://www.instagram.com/white_0042<br />
                                Facebook：https://www.facebook.com/profile.php?id=61552332433484<br />
                                Youtube：https://www.youtube.com/@suga5008
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src={matsubara} alt="" style={img} />
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