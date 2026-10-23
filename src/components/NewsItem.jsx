import { useI18n } from "../i18n";
import UpcomingBadge from "./UpcomingBadge";
import { NewTabNote } from "./VisuallyHidden";

// NEWS の記事 1 件分の全文の表示（記事のページ src/pages/newsArticle.jsx で使う）。
// タイトルをページの見出し（h1）にして、写真はすぐ読み込む。
// NEWS の一覧では、タイトル・日付・本文の冒頭だけの src/components/NewsListItem.jsx を使う

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

const NewsItem = ({ item }) => {
    const { t } = useI18n();
    return (
        <div style={newsArea}>
            <div>
                <UpcomingBadge item={item} />
                <h1 style={title}>{item.title}</h1>
                <p style={{fontSize: "12px", color: "#757575"}}>{item.date}</p>
                <p>{item.contents}</p>
                {/* リンク先がない記事では、空のリンクを出さない。
                    見出し（例: ◆公式サイト◆）があれば、URL は次の行に出す（CMS の入力欄では改行を入れられないため） */}
                {item.link && (
                    <p>{item.linkTitle?.trim() && <>{item.linkTitle.trim()}<br /></>}
                    <a href={item.link} target='_blank' rel="noopener noreferrer">{item.link}<NewTabNote /></a>
                    </p>
                )}
                {item.map_link && (
                    <p>{item.map_title?.trim() && <>{item.map_title.trim()}<br /></>}
                    <a href={item.map_link} target='_blank' rel="noopener noreferrer">{item.map_link}<NewTabNote /></a>
                    </p>
                )}
            </div>
            <div style={imgBox}>
                {item.img !== "" && (
                    <img
                        src={`${process.env.PUBLIC_URL}` + item.img}
                        // 写真の説明（管理画面の「写真の説明」）。空なら「（記事のタイトル）の写真」とする
                        alt={item.imgAlt?.trim() || t("news.photoAlt", { title: item.title })}
                        style={img}
                        decoding="async"
                    />
                )}
            </div>
        </div>
    );
};

export default NewsItem;
