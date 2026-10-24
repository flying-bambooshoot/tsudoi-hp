import useMedia from '../useMedia';
import Header from "../components/Header";
import PhoneHeader from "../components/PhoneHeader";
import Footer from "../components/Footer";
import Subheading from "../components/Subheading";
import Lines from "../components/Lines";
import { useI18n } from "../i18n";
import { NewTabNote } from "../components/VisuallyHidden";

// プライバシーポリシー（SITE_REVIEW_2026-10 の R-67）。
// お問い合わせフォームで名前・メールアドレス・電話番号などを預かっているため、取り扱いを示す。
// 文章は locales の privacy（sections の順に見出し・本文・箇条書きを並べる）

const body = {
    padding: "12px 8px 24px",
    lineHeight: 1.9,
}

const sectionHeading = {
    borderBottom: "solid #cccccc 1px",
    fontSize: "18px",
    margin: "2em 0 0.8em",
}

const list = {
    margin: "0.5em 0",
    paddingLeft: "1.5em",
}

const established = {
    marginTop: "2.5em",
    textAlign: "right",
    fontSize: "14px",
    color: "#555555",
}

// 本文の中の URL（https://…）をリンクにする。外部のページなので新しいタブで開く
const URL_PATTERN = /(https:\/\/[^\s）)」]+)/;
const Linkified = ({ text }) =>
    text.split(URL_PATTERN).map((part, i) =>
        URL_PATTERN.test(part) ? (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}<NewTabNote /></a>
        ) : (
            <Lines key={i} text={part} />
        )
    );

const Privacy = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t } = useI18n();
    const sections = t("privacy.sections", { returnObjects: true });

    return (
        <>
            <div className={isMobile ? "phBody" : "body"}>
                <Header />
                <PhoneHeader />
                <div className="pageContent">
                    <main className={isMobile ? "phMain" : "main"}>
                        <section className="title">
                            <h1 className="h2">PRIVACY POLICY<Subheading name="privacy" /></h1>
                        </section>
                        <div style={body}>
                            <p>{t("privacy.intro")}</p>
                            {sections.map((section) => (
                                <section key={section.title}>
                                    <h2 style={sectionHeading}>{section.title}</h2>
                                    {section.body && <p><Linkified text={section.body} /></p>}
                                    {section.items && (
                                        <ul style={list}>
                                            {section.items.map((item) => <li key={item}><Linkified text={item} /></li>)}
                                        </ul>
                                    )}
                                </section>
                            ))}
                            <p style={established}>{t("privacy.established")}</p>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Privacy;
