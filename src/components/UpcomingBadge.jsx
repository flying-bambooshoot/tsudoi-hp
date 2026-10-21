import { useI18n } from "../i18n";

// 出演日がまだ来ていない出演の記事に付ける「出演予定 2026.10.17」の印。
// NEWS の一覧・TOP の NEWS 欄・記事のページで使う（出演日を過ぎると自動で消える。src/i18n/index.js の useNews）

const badge = {
    display: "inline-block",
    margin: "0 0 6px",
    padding: "1px 8px",
    fontSize: "12px",
    lineHeight: 1.6,
    color: "#ffffff",
    backgroundColor: "#b3261e",
    borderRadius: "3px",
    whiteSpace: "nowrap",
}

const UpcomingBadge = ({ item }) => {
    const { t } = useI18n();
    if (!item.upcoming) return null;
    return <span style={badge}>{t("news.upcoming", { date: item.performanceDate })}</span>;
};

export default UpcomingBadge;
