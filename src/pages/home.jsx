import { useEffect } from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import useMedia from '../useMedia';
import Com from "../css/common.module.css";
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useI18n, useNews } from "../i18n";
import tudoiLogo from "../resources/img/logo.png";
import Top1 from '../resources/img/top1.jpg';
import Top2 from '../resources/img/top2.jpg';
import "../css/common.css"
import "../css/home.css"
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import {
  school,
  narita2,
  orympic,
  bellserl,
  school2,
  ajisai,
  toshima,
} from "../resources/img/homeGallery";

const mainImg = {
  height: "100%",
  backgroundColor: "fff",
  display: "flex",
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

// 各セクションの見出し（h1 だった頃と同じ見た目にする）
const sectionHeading = {
  fontSize: "20px",
  margin: "0.67em 0",
}

// 画面には表示せず、検索エンジンやスクリーンリーダーにだけ伝える
const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
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
  const { t, path } = useI18n();
  const news = useNews();

  useEffect(() => {
    // 画像やコンテンツのロードが終わるまで少し待つ
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50); // 50ms 遅らせるだけで安定

    return () => clearTimeout(timer);
  }, []);

  // ギャラリーに写真追加する際はこちら
  let imageNames = [ajisai, toshima, school2, school, narita2, orympic, bellserl];

  // NEWSは新しいものから3件まで表示する（3件未満でもそのまま動作する）
  const newsList = news.slice(0, 3).map((item) => (
      <div key={`${item.date}-${item.title}`} style={newsArea}>
          <div>
              <p style={{fontSize: "16px"}}>{item.title}</p>
              <p style={{fontSize: "12px", color: "#8c8c8c"}}>{item.date}</p>
              <div className="eachNews">{item.contents}</div>
          </div>
      </div>
  ));
  
  return (
    <>
      <div className={isMobile ? "phBody" : "body"}>
        <Header />
        <PhoneHeader />
        <div className={Com.pc}>
          <section style={mainImg}>
            <div style={artistImg}>
              <img className="image" src={Top1} alt="" />
              <img className="image" src={Top2} alt="" />
              <img style={imgDammy} src={Top2} alt="" />
            </div>
            <div style={logoBlock}>
              <img style={logo} src={tudoiLogo} alt={t("common.logoAlt")} />
            </div>
          </section>
        </div>
        <div className={Com.sp}>
          <div style={artistImg}>
            <img className="image" src={Top1} alt="" />
            <img className="image" src={Top2} alt="" />
            <img style={imgDammy} src={Top2} alt="" />
          </div>
        </div>
        <main className={isMobile ? "homePhMain" : "homeMain"}>
          {/* ページの主題（グループ名）。画面上はロゴ画像で示しているため非表示にする */}
          <h1 style={visuallyHidden}>{t("common.siteName")}</h1>
          <section style={isMobile ? none : sec}>
            <div style={{display: "flex"}}>
              <h2 style={sectionHeading}>NEWS</h2>
              <div style={{justifyItems: "center", margin: "0.67em 0 0 auto"}}>
                <Link to={path("/news")} style={{fontSize: 30, marginBottom: "-2px"}}>
                  <KeyboardDoubleArrowRightIcon style={{fontSize: 32, color: "black"}}/>
                </Link>
              </div>
            </div>
            <div style={{borderBottom: "solid #cccccc 1px",}}>{newsList}</div>
          </section>
          <section style={sec}>
            <h2 style={sectionHeading}>GALLERY</h2>
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
              rewind: true,
              gap: '1rem',
              objectFit: 'cover',
            }}>
              { imageNames.map(slide => (
                <SplideSlide key={slide.src}>
                  <img src={slide} alt={slide} loading="lazy" decoding="async" />
                </SplideSlide>
              ))}
            </Splide>
          </section>
          <section style={sec}>
            <h2 style={sectionHeading}>YouTube</h2>
            <div style={isMobile ? phoneMovie : section}>
              <div style={youtube}>
                <iframe style={iframe} width="560" height="315" src="https://www.youtube.com/embed/0svTkQUk_eM?si=Bs7BNxMQ0XHi9TEF" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              <div style={youtube}>
                <iframe style={iframe} width="560" height="315" src="https://www.youtube.com/embed/mBdbPXmQxXY?si=oKyRt-LXfYBU-NoF" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
            </div>
          </section>
        </main>
        {/* <script>new Splide( '.splide' ).mount();</script> */}
      </div>
      <Footer/>
    </>
  );
};

export default Home;