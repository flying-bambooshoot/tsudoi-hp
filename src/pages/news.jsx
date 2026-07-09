import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Data from "../data/news.json"

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
    const newsList = [];
    const news = Object.values(Data.news).reverse();
    for (let i = 0; i < news.length; i += 1){
        newsList.push(
            <div style={newsArea}>
                <div>
                    <p style={{fontSize: "16px"}}>{news[i].title}</p>
                    <p style={{fontSize: "12px", color: "#8c8c8c"}}>{news[i].date}</p>
                    <p>{news[i].contents}</p>
                    <p>{news[i].linkTitle}
                    <a href={news[i].link} target='_blank'>{news[i].link}</a>
                    </p>
                </div>
                <div style={imgBox}>
                    {news[i].img !== "" && <img src={`${process.env.PUBLIC_URL}` + news[i].img} alt="写真" style={img} />}
                </div>
            </div>
        );
    }
    
    return (
        <>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </head>
            <body className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <main className={isMobile ? "main" : "phMain" }>
                    <section className="title">
                        <h2 className="h2">NEWS</h2>
                    </section>
                    <section>
                        <div>{newsList}</div>
                    </section>
                </main>
            </body>
            <Footer />
        </>
    );
};

export default News;