import { useEffect } from "react";
import { Link } from "react-router-dom";
import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { useI18n } from "../i18n";

// 存在しない URL（例: /abc、/en/abc、/news/1999-01-01）を開いたときのページ。
// GitHub Pages は存在しない URL に HTTP 404 を返し、404.html → トップ → 元の URL の順に戻ってくるため、
// 最後にこのページを表示する（以前はどのページにも当てはまらず、真っ白になっていた）。
// 検索結果に出さないよう、表示している間だけ noindex を付ける

const message = {
    padding: "20px",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
}

const links = {
    margin: 0,
    padding: "0 20px 20px 40px",
    lineHeight: 2.2,
}

const NotFound = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t, path } = useI18n();

    useEffect(() => {
        const previousTitle = document.title;
        document.title = `${t("notFound.heading")} | ${t("common.siteName")}`;
        const robots = document.createElement("meta");
        robots.name = "robots";
        robots.content = "noindex";
        document.head.appendChild(robots);
        return () => {
            document.title = previousTitle;
            robots.remove();
        };
    }, [t]);

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <div className="pageContent">
                    <main className={isMobile ? "phMain" : "main"}>
                        <section className="title">
                            <h1 className="h2">{t("notFound.heading")}</h1>
                        </section>
                        <section>
                            <p style={message}>{t("notFound.message")}</p>
                            <ul style={links}>
                                <li><Link to={path("/")}>{t("notFound.toTop")}</Link></li>
                                <li><Link to={path("/news")}>{t("notFound.toNews")}</Link></li>
                                <li><Link to={path("/contact")}>{t("notFound.toContact")}</Link></li>
                            </ul>
                        </section>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;
