import React from 'react';
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Data from "../data/news.json"
import Com from "./common.module.css";

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

const newsArea = {
    borderTop: "solid #cccccc 1px",
    padding: "20px",
    whiteSpace: "pre-wrap",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
}

const img = {
    marginLeft: "auto",
    height: "150px",
    width: "auto",
}

const title = {
    padding: "10px 10px",
    backgroundColor: "rgb(22,22,22)",
    color: "white",
}

const h1 = {
    margin: 0,
}

const News = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const newsList = [];
    const news = Object.values(Data.news).reverse();
    for (let i = 0; i < news.length; i += 1){
        newsList.push(
            <div style={newsArea}>
                <div>
                    <p>{news[i].title}</p>
                    <p>{news[i].date}</p>
                    <p>{news[i].contents}</p>
                    <p>{news[i].linkTitle}
                    <a href={news[i].link} target='_blank'>{news[i].link}</a>
                    </p>
                </div>
                <div>
                <img src={`${process.env.PUBLIC_URL}` + news[i].img} alt="写真" style={img} />
                </div>
            </div>
        );
    }
    
    return (
        <>
            <body style={isMobile ? body : phBody}>
            <Header />
            <PhoneHeader />
                <main style={isMobile ? main : phMain}>
                <section style={title}>
                    <h2 style={h1}>NEWS</h2>
                </section>
                <section>
                    <div>{newsList}</div>
                </section>
                </main>
            </body>
            <Footer />
        </>
    );
};

export default News;