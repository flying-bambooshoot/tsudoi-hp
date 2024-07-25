import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import All from '../resources/img/all.jpg';
import Instagram from "../resources/img/Instagram_Glyph_White.png";
import X from "../resources/img/logo-white.png";
import YouTube from "../resources/img/youtube.png";
import {
    kawasaki,
    matsubara,
    nakahara,
    noguchi,
    suga,
    fujisaki,
  } from "../resources/img/member";

const item = {
    margin: "12px 0",
}

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

const contents = {
    margin: "3px",
}

const snsIcon = {
    margin: "0 24px 0 0",
    height: "36px",
}

const Intro = () => {
    const isMobile = useMedia('(max-width: 1000px)');

    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>
            <body className={isMobile ? "phBody" : "body"}>
            <Header />
            <PhoneHeader />
            <main className={isMobile ? "main" : "phMain" }>
                <section className="title">
                    <h2 className="h2">INTRODUCTION/MEMBER</h2>
                </section>
                <div style={{padding: "20px 0"}}>
                <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6}>
                        <img src={All} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <div style={{paddingBottom: "36px"}}>
                                <p>
                                    『集-tsudoi-』<br /><br />
                                    中原正人、川﨑愛実、藤﨑健太、野口新、枩原茜、須賀行亮の 6 名で 2021 年に結成。<br />
                                    全員がどの流派にも属さず活動する異色の団体。<br /><br />
                                    津軽三味線の本領である民謡曲のみならず、現代的なリズムやハーモニーを取り入れたオリジナル楽曲など、<br />
                                    津軽三味線の合奏の可能性を追求している。
                                </p>
                            </div>
                            <div>
                                <div>
                                    <p style={{borderBottom: "solid #cccccc 1px", fontSize: "16px"}}>受賞歴</p>
                                </div>
                                <div>
                                    <p style={year}>2021年</p>
                                    <p style={contents}>第9回津軽三味線津軽民謡全国大会 inびわ湖 団体独奏曲部門 優勝</p>
                                    <p style={year}>2022年</p>
                                    <p style={contents}>第40回津軽三味線世界大会 団体の部 優勝</p>
                                    <p style={year}>2023年</p>
                                    <p style={contents}>第26回津軽三味線コンクール全国大会 合奏 銀獅子賞(10人以下)部門 優勝</p>
                                    <p style={contents}>第11回津軽三味線津軽民謡全国大会 inびわ湖 団体独奏曲部門 優勝</p>
                                    <p style={year}>2024年</p>
                                    <p style={contents}>第26回津軽三味線コンクール全国大会 合奏 銀獅子賞(10人以下)部門 優勝</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div style={{padding: "42px 8px 0 8px"}}>
                    <p style={{borderBottom: "solid #cccccc 1px", fontSize: "18px", marginBottom: "0"}}>MEMEBER</p>
                </div>
                <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>中原 正人</p>
                            <div style={{backgroundColor: "#cccccc"}}>
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
                            <img src={nakahara} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>川﨑 愛実</p>
                            <img src={kawasaki} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>藤崎 健太</p>
                            <img src={fujisaki} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>野口 新</p>
                            <img src={noguchi} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>須賀 行亮</p>
                            <img src={suga} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>枩原 茜</p>
                            <img src={matsubara} alt="" style={img} />
                        </div>
                    </Grid>
                </Grid>
                {/* <Grid container spacing={2} style={{margin: "auto"}}>
                    <Grid item xs={12} md={6} style={item}>
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
                                Facebook：https://www.facebook.com/origamian.masa<br />
                                Instagram：https://www.instagram.com<br />/shamisen_masanchu<br />
                                X：https://x.com/shijimidaimajin
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={item}>
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
                    <Grid item xs={12} md={6} style={item}>
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
                    <Grid item xs={12} md={6} style={item}>
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
                    <Grid item xs={12} md={6} style={item}>
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
                    <Grid item xs={12} md={6} style={item}>
                        <img src={matsubara} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <p>枩原 茜</p>
                            <p>
                            幼少期にピアノを始めて以降、合唱/ユーフォニアム/トロンボーン/ベースギター/尺八と常に音楽<br/>
                            大学より明治大学の津軽三味線響に入会し津軽三味線を弾き始める。
                            そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。（Wikipediaより）
                            </p>
                        </div>
                    </Grid>
                </Grid> */}
                </div>
            </main>
            </body>
            <Footer/>
        </>
    );
};

export default Intro;