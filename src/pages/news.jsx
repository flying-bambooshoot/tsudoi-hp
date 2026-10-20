import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import NewsItem from "../components/NewsItem";
import { useNews } from "../i18n";

const News = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const news = useNews();
    // 記事ごとに全文を表示し、タイトルは記事のページ（/news/<slug>）へのリンクにする
    const newsList = news.map((item) => <NewsItem key={item.slug} item={item} />);

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <div className="pageContent">
                    <main className={isMobile ? "phMain" : "main"}>
                        <section className="title">
                            <h1 className="h2">NEWS</h1>
                        </section>
                        <section>
                            <div>{newsList}</div>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default News;
