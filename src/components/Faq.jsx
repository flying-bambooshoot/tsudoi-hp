import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";

// よくある質問。質問を押すと回答が開く（HTML 標準の details / summary を使うため、
// JavaScript がなくても開閉でき、キーボードや読み上げソフトでも操作できる）。
// 質問と回答は src/locales/*.json の contact.faq.items に書く。
// 回答には、表（table: { head, rows }）と注記（note）を任意で付けられる。

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

const table = {
    width: "calc(100% - 8px)",
    margin: "0 4px 12px",
    borderCollapse: "collapse",
    fontSize: "0.95em",
}

const cell = {
    padding: "8px",
    border: "solid #dddddd 1px",
    textAlign: "left",
}

// 「演奏料の100%」などが途中で改行されないよう、日本語・中国語でも語の途中で折り返さない
const valueCell = {
    ...cell,
    wordBreak: "keep-all",
}

const headCell = {
    ...cell,
    backgroundColor: "#f5f5f5",
}

const note = {
    ...answer,
    fontSize: "0.9em",
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
                    {faq.table && (
                        <table style={table}>
                            <thead>
                                <tr>
                                    {faq.table.head.map((text) => <th key={text} style={headCell} scope="col">{text}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {faq.table.rows.map((row) => (
                                    <tr key={row[0]}>
                                        {row.map((text, i) => <td key={i} style={i === 0 ? cell : valueCell}>{text}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {faq.note && <p style={note}>{faq.note}</p>}
                </details>
            ))}
        </div>
    );
};

export default Faq;
