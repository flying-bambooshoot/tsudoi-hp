import { Link } from "react-router-dom";
import { useI18n } from "../i18n";

// NEWS の記事 1 件分の表示。NEWS の一覧（src/pages/news.jsx）と記事のページ（src/pages/newsArticle.jsx）で使う。
// isPage: 記事のページでは、タイトルをページの見出し（h1）にして、写真をすぐ読み込む。
//         一覧では、タイトルを記事のページ（/news/<slug>）へのリンクにする

const newsArea = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderTop: "solid #cccccc 1px",
    padding: "20px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
}

const title = {
    fontSize: "16px",
    fontWeight: "inherit",
    margin: "1em 0",
}

const titleLink = {
    color: "inherit",
}

const imgBox = {
    width: "300px",
    maxWidth: "100%",
    marginTop: "16px",
}

const img = {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "cover",
    objectPosition: "left bottom",
}

const NewsItem = ({ item, isPage = false }) => {
    const { t, path } = useI18n();
    return (
        <div style={newsArea}>
            <div>
                {isPage ? (
                    <h1 style={title}>{item.title}</h1>
                ) : (
                    <p style={title}>
                        <Link to={path(`/news/${item.slug}`)} style={titleLink}>{item.title}</Link>
                    </p>
                )}
                <p style={{fontSize: "12px", color: "#757575"}}>{item.date}</p>
                <p>{item.contents}</p>
                {/* リンク先がない記事では、空のリンクを出さない。
                    見出し（例: ◆公式サイト◆）があれば、URL は次の行に出す（CMS の入力欄では改行を入れられないため） */}
                {item.link && (
                    <p>{item.linkTitle?.trim() && <>{item.linkTitle.trim()}<br /></>}
                    <a href={item.link} target='_blank' rel="noopener noreferrer">{item.link}</a>
                    </p>
                )}
                {item.map_link && (
                    <p>{item.map_title?.trim() && <>{item.map_title.trim()}<br /></>}
                    <a href={item.map_link} target='_blank' rel="noopener noreferrer">{item.map_link}</a>
                    </p>
                )}
            </div>
            <div style={imgBox}>
                {item.img !== "" && (
                    <img
                        src={`${process.env.PUBLIC_URL}` + item.img}
                        alt={t("news.photoAlt")}
                        style={img}
                        loading={isPage ? "eager" : "lazy"}
                        decoding="async"
                    />
                )}
            </div>
        </div>
    );
};

export default NewsItem;
