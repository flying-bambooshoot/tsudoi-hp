import { useI18n } from "../i18n";

// 英語の見出し（NEWS・GALLERY など）に添える、そのページの言語の小見出し（SITE_REVIEW_2026-10 の R-31）。
// 例: NEWS の下に「お知らせ」。訳は locales の headings。
// 英語のページでは同じ言葉になるので出さない（en.json に headings を置かず、tOptional が空を返す）
const style = {
    display: "block",
    marginTop: "2px",
    fontSize: "13px",
    fontWeight: "normal",
    // 見出しの色を引き継いで少し薄くする（スマホのページ見出しは黒い帯の上なので、灰色の固定色だと読めない）
    color: "inherit",
    opacity: 0.75,
    letterSpacing: "0.04em",
};

const Subheading = ({ name }) => {
    const { tOptional } = useI18n();
    const text = tOptional(`headings.${name}`);
    return text ? <span style={style}>{text}</span> : null;
};

export default Subheading;
