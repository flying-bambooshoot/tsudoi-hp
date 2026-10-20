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
                {item.img !== "" && <img src={`${process.env.PUBLIC_URL}` + item.img} alt={t("news.photoAlt")} style={img} loading="lazy" decoding="async" />}
            </div>
        </div>
    ));
    
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