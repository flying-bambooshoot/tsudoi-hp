import * as React from "react";
import useMedia from '../useMedia';
import Com from "./common.module.css";
import { Button } from "@mui/material";
/* ↓これ追加 */
import styled from "@emotion/styled";
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Data from "../data/news.json";
import tudoiLogo from "../resources/img/logo.png";
import {
  narita1,
  narita2,
  orympic,
  shamicore
} from "../resources/img/homeGallery";
// import { generateSlides } from '../utils';

const phBody = {
  height: "auto",
  marginBottom: "24px", 
  fontSize: "14px",
  fontWeight: "bold",
  lineHeight: 1.5,
  letterSpacing: "0.06em",
  fontFamily: "'Helvetica', 'Helvetica Neue', 'YakuHanJP', '游ゴシック体', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Osaka', 'ＭＳ Ｐゴシック', sans-serif",
}

const body = {
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

const phoneMain = {
  padding: "12px",
  backgroundColor: "fff",
}

const mainImg = {
  height: "100%",
  backgroundColor: "fff",
  display: "flex",
}

const newsImg = {
  marginLeft: "auto",
  height: "150px",
  width: "auto"
}

const artistImg = {
  width: "100%",
  flex: "3"
}

const img = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
}

const logoBlock = {
  width: "100%",
  backgroundColor: "rgb(22,22,22)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "2"
}

const logo = {
  width: "40%",
}

const section = {
  display: "flex",
  flexWrap: "wrap",
  height: "auto",
  gap: "0 1rem",
}

const phoneMovie = {
  height: "auto",
  gap: "0 1rem",
}

const slide = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
}

const youtube = {
  flex: 1,
  width: "100%",
  aspectRatio: "16 / 9",
}

const iframe = {
  width: "100%",
  height: "100%",
}

const newsArea = {
  borderTop: "solid #cccccc 1px",
  padding: "20px",
  whiteSpace: "pre-wrap",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const sec = {
  marginTop: "36px"
}

const none = {}

const Home = () => {
  const isMobile = useMedia('(max-width: 1000px)');
  const newsList = [];
  const news = Object.values(Data.news).reverse();
  let imageNames = [narita1, narita2, orympic, shamicore]

  for (let i = 0; i < 3; i += 1){
      newsList.push(
          <div style={newsArea}>
              <div>
                <p>{news[i].title}</p>
                <p>{news[i].linkTitle}
                  <a href={news[i].link} target='_blank'>{news[i].link}</a>
                </p>
                <p>{news[i].date}</p>
              </div>
              <img className={Com.pc} src={`${process.env.PUBLIC_URL}` + news[i].img} alt="写真" style={newsImg} />
          </div>
      );
  }
  
  return (
    <>
      <body style={isMobile ? phBody : body}>
      <Header />
      <PhoneHeader />
        <div className={Com.pc}>
          <section style={mainImg}>
            <div style={artistImg}>
              <img style={img} src="img/LINE_ALBUM_候補写真_23122525.jpg" alt="集-tsudoi-" />
            </div>
            <div style={logoBlock}>
              <img style={logo} src={tudoiLogo} alt="集-tsudoi-" />
            </div>
          </section>
        </div>
        <div className={Com.sp} style={artistImg}>
            <img style={img} src="img/LINE_ALBUM_候補写真_23122525.jpg" alt="集-tsudoi-" />
        </div>
        <main style={isMobile ? phoneMain : main}>
          <section style={isMobile ? none : sec}>
            <h1>NEWS</h1>
            <div style={{borderBottom: "solid #cccccc 1px",}}>{newsList}</div>
          </section>
          <section style={sec}>
            <h1>GALLARY</h1>
            <Splide style={slide} aria-label="My Favorite Images"
            options={{
              perPage: 1,
              mediaQuery: 'min',
              breakpoints: {
                640: {
                  perPage: 3,
                  heightRatio: 0.2,
                },
              },
              type: 'loop',
              autoplay: true,
              speed: 1000,
              cover: true,
              heightRatio: 0.6,
              // fixedHeight: '60%',
              rewind: 'true',
              gap: '1rem',
              objectFit: 'cover',
            }}>
              { imageNames.map(slide => (
                <SplideSlide key={slide.src}>
                  <img src={slide} alt={slide}/>
                </SplideSlide>
              ))}
            </Splide>
          </section>
          <section style={sec}>
            <h1>YouTube</h1>
            <div style={isMobile ? phoneMovie : section}>
              <div style={youtube}>
                <iframe style={iframe} width="560" height="315" src="https://www.youtube.com/embed/0svTkQUk_eM?si=Bs7BNxMQ0XHi9TEF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
              <div style={youtube}>
                <iframe style={iframe} width="560" height="315" src="https://www.youtube.com/embed/tz4BXV5OGmA?si=11xNGNmjcGAvw-G-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>
          </section>
        </main>
        <script>new Splide( '.splide' ).mount();</script>
      </body>
      <Footer/>
    </>
  );
};

export default Home;