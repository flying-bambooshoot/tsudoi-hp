import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import NewsListItem from "../components/NewsListItem";
import { useNews } from "../i18n";
import Subheading from "../components/Subheading";

const yearHeading = {
    margin: "32px 0 0",
    padding: "0 20px 8px",
    fontSize: "18px",
}

// 記事を年ごとに分ける（記事は新しい順に並んでいるので、年も新しい順になる）。日付は "2026.10.6" の形
const groupByYear = (news) =>
    news.reduce((groups, item) => {
        const year = item.date.split(".")[0];
        const last = groups[groups.length - 1];
        if (last && last.year === year) last.items.push(item);
        else groups.push({ year, items: [item] });
        return groups;
    }, []);

const News = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const news = useNews();

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <div className="pageContent">
                    <main className={isMobile ? "phMain" : "main"}>
                        <section className="title">
                            <h1 className="h2">NEWS<Subheading name="news" /></h1>
                        </section>
                        {/* 一覧はタイトル・日付・本文の冒頭だけ。全文は記事のページ（/news/<slug>）で読む */}
                        {groupByYear(news).map(({ year, items }) => (
                            <section key={year}>
                                <h2 style={yearHeading}>{year}</h2>
                                <div style={{ borderBottom: "solid #cccccc 1px" }}>
                                    {items.map((item) => <NewsListItem key={item.slug} news={item} isMobile={isMobile} />)}
                                </div>
                            </section>
                        ))}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default News;
