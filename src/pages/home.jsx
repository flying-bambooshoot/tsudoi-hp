import * as React from "react";
import useMedia from '../useMedia';
import Com from "../css/common.module.css";
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Data from "../data/news.json";
import tudoiLogo from "../resources/img/logo.png";
import Top from '../resources/img/top.jpg';
import "../css/common.css"
import { Link } from "react-router-dom";
import {
  narita1,
  narita2,
  orympic,
  shamicore
} from "../resources/img/homeGallery";

const mainImg = {
  height: "100%",
  backgroundColor: "fff",
  display: "flex",
}

const newsImg = {
  marginLeft: "auto",
  height: "150px",
  width: "auto",
  paddingLeft: "24px",
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
  paddingBottom: "12px",
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
                  <p style={{fontSize: "20px"}}>{news[i].title}</p>
                  <p style={{fontSize: "15px"}}>{news[i].date}</p>
                  <p>{news[i].contents}</p>
                  <p>{news[i].linkTitle}
                  <a href={news[i].link} target='_blank'>{news[i].link}</a>
                  </p>
              </div>
              <img className={Com.pc} src={`${process.env.PUBLIC_URL}` + news[i].img} alt="写真" style={newsImg} />
          </div>
      );
  }
  
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className={isMobile ? "phBody" : "body"}>
      <Header />
      <PhoneHeader />
        <div className={Com.pc}>
          <section style={mainImg}>
            <div style={artistImg}>
              <img style={img} src={Top} alt="集-tsudoi-" />
            </div>
            <div style={logoBlock}>
              <img style={logo} src={tudoiLogo} alt="集-tsudoi-" />
            </div>
          </section>
        </div>
        <div className={Com.sp} style={artistImg}>
            <img style={img} src={Top} alt="集-tsudoi-" />
        </div>
        <main className={isMobile ? "homePhMain" : "homeMain"}>
          <section style={isMobile ? none : sec}>
            <h1>NEWS</h1>
            <div style={{borderBottom: "solid #cccccc 1px",}}>{newsList}</div>
            <div style={{textDecoration: "underline", padding: "24px 12px 0 0", margin: "0 0 0 auto", width: "120px"}}>
              <Link to="/tsudoi-hp/news" style={{fontSize: "18px"}}>もっと見る…</Link>
            </div>
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