import * as React from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import useMedia from '../useMedia';
import Com from "../css/common.module.css";
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Data from "../data/news.json";
import tudoiLogo from "../resources/img/logo.png";
import Top1 from '../resources/img/top1.jpg';
import Top2 from '../resources/img/top2.jpg';
import "../css/common.css"
import "../css/home.css"
import { Link } from "react-router-dom";
import {
  school,
  narita2,
  orympic,
  bellserl,
  school2,
} from "../resources/img/homeGallery";

const mainImg = {
  height: "100%",
  backgroundColor: "fff",
  display: "flex",
}

const newsImg = {
  marginLeft: "32px",
  height: "180px",
  width: "300px",
  objectFit: "cover",
  paddingLeft: "24px",
}

const artistImg = {
  width: "100%",
  position: "relative",
  flex: "3"
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
  padding: "20px 0 30px 0",
  whiteSpace: "pre-wrap",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  wordBreak: "break-all",
}

const sec = {
  marginTop: "36px",
}

const h1 = {
  fontSize: "20px",
}

const imgDammy = {
  objectFit: "cover",
  width: "100%",
  height: "100%",
  opacity: 0,
}

const none = {}

const Home = () => {
  const isMobile = useMedia('(max-width: 1000px)');
  const newsList = [];
  const news = Object.values(Data.news).reverse();
  // ギャラリーに写真追加する際はこちら
  let imageNames = [school, narita2, orympic, school2, bellserl];

  for (let i = 0; i < 3; i += 1){
      newsList.push(
          <div style={newsArea}>
              <div>
                  <p style={{fontSize: "16px"}}>{news[i].title}</p>
                  <p style={{fontSize: "12px", color: "#8c8c8c"}}>{news[i].date}</p>
                  <div className="eachNews">{news[i].contents}</div>
              </div>
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
              <img class="image" src={Top1} />
              <img class="image" src={Top2} />
              <img style={imgDammy} src={Top2} />
            </div>
              <div style={logoBlock}>
                <img style={logo} src={tudoiLogo} alt="集-tsudoi-" />
            </div>
          </section>
        </div>
        <div className={Com.sp}>
          <div style={artistImg}>
            <img class="image" src={Top1} />
            <img class="image" src={Top2} />
            <img  style={imgDammy} src={Top2} />
          </div>
        </div>
        <main className={isMobile ? "homePhMain" : "homeMain"}>
          <section style={isMobile ? none : sec}>
            <div style={{display: "flex"}}>
              <h1 style={h1}>NEWS</h1>
              <div style={{justifyItems: "center", margin: "0.67em 0 0 auto"}}>
                <Link to="/tsudoi-hp/news" style={{fontSize: 30, marginBottom: "-2px"}}>
                  <KeyboardDoubleArrowRightIcon style={{fontSize: 32, color: "black"}}/>
                </Link>
              </div>
            </div>
            <div style={{borderBottom: "solid #cccccc 1px",}}>{newsList}</div>
          </section>
          <section style={sec}>
            <h1 style={h1}>GALLARY</h1>
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
            <h1 style={h1}>YouTube</h1>
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