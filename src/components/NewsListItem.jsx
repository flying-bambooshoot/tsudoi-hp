import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import UpcomingBadge from "./UpcomingBadge";

// NEWS の一覧の 1 件分（src/pages/news.jsx で使う）。小さな写真・タイトル・日付・本文の冒頭だけを出し、
// 1 件全体を記事のページ（/news/<slug>）へのリンクにする。全文は記事のページで読む。
// 一覧で全文を並べると、記事が増えるほど画面の組み立てが重くなるため（2026-10-21 の計測で、22 件の全文に
// スマホで約 0.7 秒かかっていた）

const item = {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "16px 20px",
    borderTop: "solid #cccccc 1px",
    color: "inherit",
    textDecoration: "none",
}

const thumb = {
    flex: "0 0 auto",
    width: "120px",
    height: "90px",
    objectFit: "cover",
    backgroundColor: "#f0f0f0",
}

const thumbMobile = {
    ...thumb,
    width: "88px",
    height: "66px",
}

const text = {
    minWidth: 0,
}

const title = {
    margin: "0 0 4px",
    fontSize: "16px",
    textDecoration: "underline",
    wordBreak: "break-all",
}

const date = {
    margin: "0 0 4px",
    fontSize: "12px",
    color: "#757575",
}

// 本文の冒頭は 2 行まで（それ以上は … で省略）
const excerpt = {
    margin: 0,
    fontSize: "14px",
    lineHeight: 1.6,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    wordBreak: "break-all",
}

// 一覧用の小さな写真（240×180）。ビルドのとき scripts/postbuild.js が /img/x.webp から /img/thumb/x.webp を作る。
// 開発用のサーバー（npm start）ではサムネイルが作られないので、読み込めなければ元の写真を使う
const thumbnailPath = (img) => img.replace(/^\/img\//, "/img/thumb/").replace(/\.[^.]+$/, ".webp");
const fallbackToOriginal = (img) => (event) => {
    if (!event.currentTarget.src.endsWith(img)) event.currentTarget.src = `${process.env.PUBLIC_URL}` + img;
};

// 本文の改行をつなげて、冒頭だけを取り出す（画面では CSS でさらに 2 行に収める）
const EXCERPT_LENGTH = 120;
const summarize = (contents = "") => {
    const flat = contents.replace(/\s*\n+\s*/g, " ").trim();
    return flat.length > EXCERPT_LENGTH ? `${flat.slice(0, EXCERPT_LENGTH)}…` : flat;
};

const NewsListItem = ({ news, isMobile }) => {
    const { path } = useI18n();
    return (
        <Link to={path(`/news/${news.slug}`)} style={item}>
            {/* 写真はタイトルと同じ内容を表すので、読み上げでは読まない（alt を空にする）。写真のない記事は灰色の枠 */}
            {news.img !== "" ? (
                <img
                    src={`${process.env.PUBLIC_URL}` + thumbnailPath(news.img)}
                    onError={fallbackToOriginal(news.img)}
                    alt=""
                    width="120"
                    height="90"
                    style={isMobile ? thumbMobile : thumb}
                    loading="lazy"
                    decoding="async"
                />
            ) : (
                <span style={isMobile ? thumbMobile : thumb} aria-hidden="true" />
            )}
            <span style={text}>
                <UpcomingBadge item={news} />
                <span style={{ ...title, display: "block" }}>{news.title}</span>
                <span style={{ ...date, display: "block" }}>{news.date}</span>
                <span style={excerpt}>{summarize(news.contents)}</span>
            </span>
        </Link>
    );
};

export default NewsListItem;
