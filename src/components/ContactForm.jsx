import { useState } from "react";
import useMedia from "../useMedia";
import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";
import contactFormConfig from "../data/contactForm.json";

// お問い合わせフォーム。送信内容は Formspree（https://formspree.io）が受け取り、登録したメールアドレスに届く。
// このサイトにはサーバーが無いため、送信の受け取りを外部サービスに任せている。
// 送信先のフォーム ID は src/data/contactForm.json で設定する。

const FORMSPREE_URL = `https://formspree.io/f/${contactFormConfig.formspreeId}`;

const field = {
    marginBottom: "16px",
}

const label = {
    display: "block",
    marginBottom: "4px",
    fontSize: "13px",
    fontWeight: "bold",
}

const requiredMark = {
    marginLeft: "6px",
    fontSize: "11px",
    color: "#b00020",
}

const input = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    border: "solid #cccccc 1px",
    borderRadius: 0,
    font: "inherit",
    letterSpacing: "inherit",
}

const textarea = {
    ...input,
    minHeight: "160px",
    resize: "vertical",
}

// 迷惑な自動送信を防ぐための入力欄。人には見えず、ロボットだけが入力する（入力があると Formspree が破棄する）
const honeypot = {
    position: "absolute",
    left: "-10000px",
}

const button = {
    padding: "14px 40px",
    backgroundColor: "rgb(22,22,22)",
    color: "white",
    border: "none",
    font: "inherit",
    fontSize: "16px",
    letterSpacing: "0.06em",
    cursor: "pointer",
}

const note = {
    fontSize: "12px",
    color: "#757575",
}

const message = {
    padding: "12px 16px",
    border: "solid #cccccc 1px",
}

const ContactForm = () => {
    const isMobile = useMedia('(max-width: 1000px)');
    const { t, language } = useI18n();
    // idle: 入力中 / sending: 送信中 / success: 送信完了 / error: 送信失敗
    const [status, setStatus] = useState("idle");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("sending");
        const data = new FormData(event.target);
        try {
            const response = await fetch(FORMSPREE_URL, {
                method: "POST",
                body: data,
                headers: { Accept: "application/json" },
            });
            if (!response.ok) throw new Error(`Formspree: ${response.status}`);
            setStatus("success");
            trackEvent("contact_form_submit", { location: "contact_page" });
        } catch (error) {
            setStatus("error");
        }
    };

    if (status === "success") {
        return <p style={message} role="status">{t("contact.form.success")}</p>;
    }

    const Required = () => <span style={requiredMark}>{t("contact.form.required")}</span>;

    return (
        <form onSubmit={handleSubmit}>
            {/* 届くメールの件名と、どの言語のページから送られたか */}
            <input type="hidden" name="_subject" value={t("contact.form.subject")} />
            <input type="hidden" name="language" value={language.code} />
            <div style={honeypot} aria-hidden="true">
                <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" />
            </div>

            <div style={field}>
                <label style={label} htmlFor="contact-name">{t("contact.form.name")}<Required /></label>
                <input style={input} id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div style={field}>
                <label style={label} htmlFor="contact-email">{t("contact.form.email")}<Required /></label>
                <input style={input} id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div style={isMobile ? {} : { display: "flex", gap: "16px" }}>
                <div style={{ ...field, flex: 1 }}>
                    <label style={label} htmlFor="contact-date">{t("contact.form.eventDate")}</label>
                    <input style={input} id="contact-date" name="eventDate" type="text" placeholder={t("contact.form.eventDatePlaceholder")} />
                </div>
                <div style={{ ...field, flex: 1 }}>
                    <label style={label} htmlFor="contact-venue">{t("contact.form.venue")}</label>
                    <input style={input} id="contact-venue" name="venue" type="text" placeholder={t("contact.form.venuePlaceholder")} />
                </div>
            </div>
            <div style={field}>
                <label style={label} htmlFor="contact-message">{t("contact.form.message")}<Required /></label>
                <textarea style={textarea} id="contact-message" name="message" placeholder={t("contact.form.messagePlaceholder")} required />
            </div>

            <p style={note}>{t("contact.form.privacy")}</p>
            {status === "error" && <p style={message} role="alert">{t("contact.form.error")}</p>}
            <button type="submit" style={isMobile ? { ...button, width: "100%" } : button} disabled={status === "sending"}>
                {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
            </button>
        </form>
    );
};

export default ContactForm;
