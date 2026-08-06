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
    const news = Object.values(Data.news).reverse();
    const newsList = news.map((item) => (
        <div key={`${item.date}-${item.title}`} style={newsArea}>
            <div>
                <p style={{fontSize: "16px"}}>{item.title}</p>
                <p style={{fontSize: "12px", color: "#8c8c8c"}}>{item.date}</p>
                <p>{item.contents}</p>
                <p>{item.linkTitle}
                <a href={item.link} target='_blank'>{item.link}</a>
                </p>
            </div>
            <div style={imgBox}>
                {item.img !== "" && <img src={`${process.env.PUBLIC_URL}` + item.img} alt="写真" style={img} />}
            </div>
        </div>
    ));
    
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