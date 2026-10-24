import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useMedia from "../useMedia";
import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";

// 記事ページや INTRODUCTION の最後に置く、演奏のご依頼への案内（SITE_REVIEW_2026-10 の R-05）。
// 以前は依頼ページへのボタンが TOP の一番下にしかなかった。ボタンの見た目は TOP の「演奏のご依頼」と同じ。
// location: GA4 のイベント booking_cta_click で、どこから押されたかを区別する名前
const box = {
    margin: "40px 0 24px",
    padding: "28px 20px",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
};

const lead = {
    margin: "0 0 20px",
    lineHeight: 1.8,
};

const button = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "14px 40px",
    backgroundColor: "rgb(22,22,22)",
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    letterSpacing: "0.06em",
};

const BookingCta = ({ location }) => {
    const isMobile = useMedia("(max-width: 1000px)");
    const { t, path } = useI18n();
    return (
        <aside style={box} aria-label={t("home.booking.heading")}>
            <p style={lead}>{t("bookingCta.lead")}</p>
            <Link
                to={path("/contact")}
                style={isMobile ? { ...button, width: "100%", boxSizing: "border-box" } : button}
                onClick={() => trackEvent("booking_cta_click", { location })}
            >
                {t("home.booking.button")}
                <ArrowForwardIcon style={{ fontSize: 18 }} />
            </Link>
        </aside>
    );
};

export default BookingCta;
