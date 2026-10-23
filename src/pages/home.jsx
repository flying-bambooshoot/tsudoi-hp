import { useEffect } from "react";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMedia from '../useMedia';
import Com from "../css/common.module.css";
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { Splide } from '@splidejs/react-splide';
import { useI18n, useNews } from "../i18n";
import tudoiLogo from "../resources/img/logo.png";
import Top1 from '../resources/img/top1.webp';
import Top2 from '../resources/img/top2.webp';
import "../css/common.css"
import "../css/home.css"
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { trackEvent } from "../analytics";
import UpcomingBadge from "../components/UpcomingBadge";
import BookingScenes from "../components/BookingScenes";
import YouTubeLite from "../components/YouTubeLite";
import videoData from "../data/videos.json";
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
  // img の width・height 属性は縦横比の確保に使う。高さは幅に合わせて自動で決める
  height: "auto",
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
  // PC では 2 列に並べ、3 本目以降は次の段に折り返す（スマートフォンは縦に並ぶ）
  flex: "0 0 calc(50% - 0.5rem)",
  width: "100%",
  aspectRatio: "16 / 9",
  paddingBottom: "12px",
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

// 「演奏のご依頼」セクション
const bookingSection = {
  marginTop: "36px",
  marginBottom: "48px",
}

const bookingBody = {
  borderTop: "solid #cccccc 1px",
  paddingTop: "20px",
}

const bookingButtonArea = {
  display: "flex",
  justifyContent: "center",
  marginTop: "24px",
}

const bookingButton = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "14px 40px",
  backgroundColor: "rgb(22,22,22)",
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  letterSpacing: "0.06em",
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

  // ギャラリーに写真追加する際はこちら。alt は写真の説明文で、各言語の訳は locales の photos に書く
  const galleryPhotos = [
    { src: ajisai, alt: "photos.ajisai" },
    { src: toshima, alt: "photos.toshima" },
    { src: school2, alt: "photos.school2" },
    { src: school, alt: "photos.school" },
    { src: narita2, alt: "photos.naritaStage" },
    { src: orympic, alt: "photos.tokyo2020" },
    { src: bellserl, alt: "photos.cultureStage" },
  ];

  // NEWSは新しいものから3件まで表示する（3件未満でもそのまま動作する）
  const newsList = news.slice(0, 3).map((item) => (
      <div key={item.slug} style={newsArea}>
          <div>
              {/* タイトルは記事のページ（/news/<slug>）へのリンク。出演日がまだ来ていない出演には「出演予定」の印 */}
              <UpcomingBadge item={item} />
              <p style={{fontSize: "16px"}}><Link to={path(`/news/${item.slug}`)} style={{color: "inherit"}}>{item.title}</Link></p>
              <p style={{fontSize: "12px", color: "#757575"}}>{item.date}</p>
              <div className="eachNews">{item.contents}</div>
          </div>
      </div>
  ));
  
  return (
    <>
      <div className={isMobile ? "phBody" : "body"}>
        <Header />
        <PhoneHeader />
        <div className="pageContent">
        <div className={Com.pc}>
          <section style={mainImg}>
            <div style={artistImg}>
              <img className="image" src={Top1} alt="" width="1046" height="769" />
              <img className="image" src={Top2} alt="" width="1046" height="769" />
              <img style={imgDammy} src={Top2} alt="" width="1046" height="769" />
            </div>
            <div style={logoBlock}>
              <img style={logo} src={tudoiLogo} alt={t("common.logoAlt")} width="890" height="531" />
            </div>
          </section>
        </div>
        <div className={Com.sp}>
          <div style={artistImg}>
            <img className="image" src={Top1} alt="" width="1046" height="769" />
            <img className="image" src={Top2} alt="" width="1046" height="769" />
            <img style={imgDammy} src={Top2} alt="" width="1046" height="769" />
          </div>
        </div>
        <main className={isMobile ? "homePhMain" : "homeMain"}>
          {/* ページの主題（グループ名）。画面上はロゴ画像で示しているため非表示にする */}
          <h1 style={visuallyHidden}>{t("common.siteName")}</h1>
          <section style={isMobile ? none : sec}>
            <div style={{display: "flex"}}>
              <h2 style={sectionHeading}>NEWS</h2>
              <div style={{justifyItems: "center", margin: "0.67em 0 0 auto"}}>
                {/* アイコンだけのリンクなので、読み上げソフト向けにリンク先の名前を付ける */}
                <Link to={path("/news")} style={{fontSize: 30, marginBottom: "-2px"}} aria-label={t("home.newsMore")}>
                  <KeyboardDoubleArrowRightIcon style={{fontSize: 32, color: "black"}}/>
                </Link>
              </div>
            </div>
            <div style={{borderBottom: "solid #cccccc 1px",}}>{newsList}</div>
          </section>
          <section style={sec}>
            <h2 style={sectionHeading}>GALLERY</h2>
            {/* react-splide の SplideSlide は li を出力するが、Splide はスライドに role="tabpanel" を付けるため、
                li では不正な組み合わせになる（アクセシビリティの検査で減点される）。
                そこで hasTrack={false} にして、スライドを div で組み立てている。見た目は同じ */}
            <Splide style={slide} aria-label="GALLERY" hasTrack={false}
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
              // 自動で切り替える。マウスを重ねたとき・キーボードで操作しているときは止まる（Splide の初期設定）。
              // 端末の「視差効果を減らす」「アニメーションを減らす」設定がオンのときは、
              // Splide の初期設定（reducedMotion）で最初から止まった状態になる
              // （一時停止ボタンは 2026-10-23 にデザインの判断で外した）
              autoplay: true,
              // 読み上げソフト向けのボタンの名前（Splide の初期値は英語）
              i18n: {
                prev: t("home.gallery.prev"),
                next: t("home.gallery.next"),
                pageX: t("home.gallery.pageX"),
                slideLabel: t("home.gallery.slideLabel"),
              },
              speed: 1000,
              cover: true,
              heightRatio: 0.6,
              rewind: true,
              gap: '1rem',
              objectFit: 'cover',
            }}>
              <div className="splide__track">
                <div className="splide__list">
                  { galleryPhotos.map(photo => (
                    <div className="splide__slide" key={photo.src}>
                      <img src={photo.src} alt={t(photo.alt)} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </div>
            </Splide>
          </section>
          <section style={sec}>
            <h2 style={sectionHeading}>YouTube</h2>
            <div style={isMobile ? phoneMovie : section}>
              {/* 動画を入れ替える際は src/data/videos.json を編集する（検索エンジン向けの動画情報も同じファイルから作られる） */}
              {videoData.videos.map((video) => (
                <div key={video.id} style={youtube}>
                  <YouTubeLite id={video.id} title={video.title} />
                </div>
              ))}
            </div>
          </section>
          <section style={bookingSection}>
            {/* 英語は「BOOKING」、日本語・中国語はそれぞれの言語の見出しにする */}
            <h2 style={sectionHeading}>{t("home.booking.heading")}</h2>
            <div style={bookingBody}>
              <p>
                {t("home.booking.lead1")}
                <br />
                {t("home.booking.lead2")}
              </p>
              {/* 利用シーン別の紹介（場面ごとの写真・一言・写真の説明） */}
              <BookingScenes />
              <div style={bookingButtonArea}>
                <Link
                  to={path("/contact")}
                  style={isMobile ? { ...bookingButton, width: "100%", boxSizing: "border-box" } : bookingButton}
                  onClick={() => trackEvent("booking_cta_click", { location: "home" })}
                >
                  {t("home.booking.button")}
                  <ArrowForwardIcon style={{ fontSize: 18 }} />
                </Link>
              </div>
            </div>
          </section>
        </main>
        {/* <script>new Splide( '.splide' ).mount();</script> */}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;