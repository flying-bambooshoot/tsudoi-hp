import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";

// よくある質問。質問を押すと回答が開く（HTML 標準の details / summary を使うため、
// JavaScript がなくても開閉でき、キーボードや読み上げソフトでも操作できる）。
// 質問と回答は src/locales/*.json の contact.faq.items に書く。

const list = {
    margin: 0,
    padding: 0,
}

const item = {
    borderBottom: "solid #eeeeee 1px",
}

const question = {
    padding: "14px 4px",
    cursor: "pointer",
    fontWeight: "bold",
}

const answer = {
    margin: "0 4px 16px",
    whiteSpace: "pre-wrap",
}

const Faq = () => {
    const { t } = useI18n();
    const items = t("contact.faq.items", { returnObjects: true });
    if (!Array.isArray(items) || items.length === 0) return null;

    // どの質問がよく読まれているかを知るため、開いたときに GA4 に記録する（質問の番号のみ）
    const handleToggle = (index) => (event) => {
        if (event.currentTarget.open) {
            trackEvent("faq_open", { location: "contact_page", question: index + 1 });
        }
    };

    return (
        <div style={list}>
            {items.map((faq, index) => (
                <details key={faq.q} style={item} onToggle={handleToggle(index)}>
                    <summary style={question}>{faq.q}</summary>
                    <p style={answer}>{faq.a}</p>
                </details>
            ))}
        </div>
    );
};

export default Faq;
