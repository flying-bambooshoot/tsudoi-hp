import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
import All from '../resources/img/all.jpg';
import X from "../resources/img/logo-black.png";
import "../css/introduction.css"
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

    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
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
                        <img className="fadeIn" src={All} alt="" style={img} />
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div>
                            <div style={{paddingBottom: "36px"}}>
                                <p>
                                    『集-tsudoi-』<br /><br />
                                    中原正人、川﨑愛実、藤﨑健太、野口新、枩原茜、須賀行亮の 6 名で 2021 年に結成。<br />
                                    全員がどの流派にも属さず活動する異色の団体。<br /><br />
                                    津軽三味線の本領である民謡曲のみならず、現代的なリズムやハーモニーを取り入れたオリジナル楽曲など、津軽三味線の合奏の可能性を追求している。
                                </p>
                            </div>
                            <div>
                                <div>
                                    <p style={{borderBottom: "solid #cccccc 1px", fontSize: "16px"}}>受賞歴</p>
                                </div>
                                <div>
                                    <p style={year}>2021年</p>
                                    <p style={content}>第9回津軽三味線津軽民謡全国大会 inびわ湖 団体独奏曲部門 優勝</p>
                                    <p style={year}>2022年</p>
                                    <p style={content}>第40回津軽三味線世界大会 団体の部 優勝</p>
                                    <p style={year}>2023年</p>
                                    <p style={contents}>第26回津軽三味線コンクール全国大会 合奏 銀獅子賞(10人以下)部門 優勝</p>
                                    <p style={content}>第11回津軽三味線津軽民謡全国大会 inびわ湖 団体独奏曲部門 優勝</p>
                                    <p style={year}>2024年</p>
                                    <p style={content}>第27回津軽三味線コンクール全国大会 合奏 銀獅子賞(10人以下)部門 優勝</p>
                                    <p style={year}>2025年</p>
                                    <p style={content}>第28回津軽三味線コンクール全国大会 合奏 銀獅子賞(10人以下)部門 優勝</p>
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
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>中原 正人</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/shijimidaimajin" target='_blank'>
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={nakahara} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>川﨑 愛実</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/tsugarumanami" target='_blank'>
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={kawasaki} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>藤崎 健太</p>
                                {/* </div>
                                <div style={{margin: "2px 0 0 6px"}}> */}
                                </div>
                            </div>
                            <img src={fujisaki} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>野口 新</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/ara527_shami" target='_blank'>
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={noguchi} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>須賀 行亮</p>
                                </div>
                                <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/Shamisen_SugA" target='_blank'>
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div>
                            </div>
                            <img src={suga} alt="" style={img} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{display: "flex", alignItems: "flex-end"}}>
                        <div className='fadeUp'>
                            <div style={{display: "flex"}}>
                                <div style={{margin: "10px 0 10px 0", paddingRight: "4px"}}>
                                    <p style={{margin: 0}}>枩原 茜</p>
                                </div>
                                {/* <div style={{margin: "12px 0 0 6px"}}>
                                    <a href="https://x.com/kappaakane" target='_blank'>
                                        <img src={X} alt="" style={snsIcon} />
                                    </a>
                                </div> */}
                            </div>
                            <img src={matsubara} alt="" style={img} />
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