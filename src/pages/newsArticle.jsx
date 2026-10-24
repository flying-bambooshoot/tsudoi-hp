import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import NewsItem from "../components/NewsItem";
import NotFound from "./notFound";
import { useI18n, useNews } from "../i18n";

// NEWS の記事 1 件のページ（/news/<slug>、例: /news/2026-10-06）。
// SNS で共有したときのカードや検索結果のタイトルは、scripts/postbuild.js が記事ごとに HTML に書き込む

const backLink = {
    display: "inline-block",
    margin: "20px",
    color: "inherit",
}

const NewsArticle = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t, path } = useI18n();
    const { slug } = useParams();
    const item = useNews().find((news) => news.slug === slug);

    // サイト内のリンクで移動してきた場合も、ブラウザのタブに記事のタイトルを出す（離れるときに元に戻す）
    useEffect(() => {
        if (!item) return undefined;
        const previous = document.title;
        document.title = `${item.title} | ${t("common.titleSuffix")}`;
        return () => {
            document.title = previous;
        };
    }, [item, t]);

    // 存在しない記事（例: /news/1999-01-01）は、ほかの存在しない URL と同じページを出す
    if (!item) return <NotFound />;

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <div className="pageContent">
                    <main className={isMobile ? "phMain" : "main"}>
                        {/* ページの見出し（h1）は記事のタイトルにするため、ここは見出しにしない */}
                        <div className="title">
                            <p className="h2">NEWS</p>
                        </div>
                        <article>
                            <NewsItem item={item} />
                        </article>
                        <Link to={path("/news")} style={backLink}>{t("news.backToList")}</Link>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewsArticle;
