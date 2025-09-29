import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Grid from '@mui/material/Unstable_Grid2';
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
                    <h2 className="h2">CONTACT US</h2>
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
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>ご依頼について</p>
                        </div>
                        <p>パーティ/式典/お祭りなどでの演奏を承ります。<br/>
                        楽曲や演奏時間についてはイベントに合わせて柔軟に対応可能です。</p>
                        <p>まずはお気軽にどのようなイベントでの演奏をご希望なのか、メールまたは電話にてお知らせください。</p>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>曲目</p>
                        </div>
                        <p>民謡/現代曲/カバーなど様々な楽曲の演奏が可能です。演奏する曲目についてはイベントに合わせてご相談ください。</p>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>編成</p>
                        </div>
                        <p>2～6人</p>
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
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>料金について</p>
                        </div>
                        <p>
                            6名編成でのご依頼の場合<br />
                            30分：¥100,000〜（税込）
                        </p>
                            和装での出演をご希望の場合は、追加料金を頂戴いたします。
                            また、交通費は別途ご負担をお願いしております。
                        <p>
                            会場の規模やご予算、ご希望の雰囲気に応じて、2〜5名の少人数編成での演奏も可能です。
                        </p>
                            ご希望内容を伺った上で、最適なプランをご提案いたしますので、まずはお気軽にご相談ください。
                        <p>
                            ※表示価格はあくまで目安となります。演奏内容や拘束時間、会場の場所によって料金は変動する場合がございます。
                        </p>
                    </div>
                    <div>
                        <div style={section}>
                            <p style={{borderBottom: "solid #cccccc 1px", fontSize: "20px"}}>連絡先</p>
                        </div>
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