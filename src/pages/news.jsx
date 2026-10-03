import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import { useI18n, useNews } from "../i18n";

const newsArea = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderTop: "solid #cccccc 1px",
    padding: "20px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
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

const News = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t } = useI18n();
    const news = useNews();
    const newsList = news.map((item) => (
        <div key={`${item.date}-${item.title}`} style={newsArea}>
            <div>
                <p style={{fontSize: "16px"}}>{item.title}</p>
                <p style={{fontSize: "12px", color: "#8c8c8c"}}>{item.date}</p>
                <p>{item.contents}</p>
                <p>{item.linkTitle}
                <a href={item.link} target='_blank' rel="noopener noreferrer">{item.link}</a>
                </p>
            </div>
            <div style={imgBox}>
                {item.img !== "" && <img src={`${process.env.PUBLIC_URL}` + item.img} alt={t("news.photoAlt")} style={img} loading="lazy" decoding="async" />}
            </div>
        </div>
    ));
    
    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <main className={isMobile ? "main" : "phMain" }>
                    <section className="title">
                        <h1 className="h2">NEWS</h1>
                    </section>
                    <section>
                        <div>{newsList}</div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default News;