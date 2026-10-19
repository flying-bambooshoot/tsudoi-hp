import { useEffect, useRef, useState } from "react";
import useMedia from "../useMedia";
import { useI18n } from "../i18n";
import { trackEvent } from "../analytics";
import contactFormConfig from "../data/contactForm.json";

// お問い合わせフォーム。送信内容は Formspree（https://formspree.io）が受け取り、登録したメールアドレスに届く。
// このサイトにはサーバーが無いため、送信の受け取りを外部サービスに任せている。
// 迷惑送信の判定は Formspree に任せる。見えない入力欄（ハニーポット）は、ブラウザの自動入力で
// 埋まって正しい問い合わせが迷惑送信と判定されたため、使わない。
// 送信先のフォーム ID は src/data/contactForm.json で設定する。

const FORMSPREE_URL = `https://formspree.io/f/${contactFormConfig.formspreeId}`;

// 返事がこの時間を過ぎても来ない場合は、失敗として扱う（「送信中…」のまま止まらないようにする）
const TIMEOUT_MS = 20000;

// 空白だけの入力を受け付けない項目（required は空白だけの入力を空とみなさないため、送信前に確かめる）
const NOT_BLANK_FIELDS = ["name", "message"];

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
    // iPhone は 16px 未満の入力欄に触れると画面を拡大するため、16px にする
    fontSize: "16px",
}

const textarea = {
    ...input,
    minHeight: "230px",
    resize: "vertical",
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
    // 完了メッセージに表示する、入力されたメールアドレス（打ち間違いに気づいてもらうため）
    const [sentEmail, setSentEmail] = useState("");
    const successRef = useRef(null);

    // 送信が終わるとフォームが短い完了メッセージに置き換わり、画面の外に出ることがあるため、
    // 完了メッセージまでスクロールし、読み上げソフトにも伝わるようフォーカスを移す
    useEffect(() => {
        if (status === "success" && successRef.current) {
            successRef.current.scrollIntoView({ block: "center" });
            successRef.current.focus({ preventScroll: true });
        }
    }, [status]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        for (const name of NOT_BLANK_FIELDS) {
            const element = form.elements[name];
            if (!element.value.trim()) {
                element.setCustomValidity(t("contact.form.blank"));
                element.reportValidity();
                return;
            }
        }

        setStatus("sending");
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
        // 失敗の種類（HTTP の番号・時間切れ・通信断）。GA4 に記録する。個人情報は含めない
        let failure = null;
        try {
            const response = await fetch(FORMSPREE_URL, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" },
                signal: controller.signal,
            });
            if (!response.ok) failure = String(response.status);
        } catch (error) {
            failure = error.name === "AbortError" ? "timeout" : "network";
        } finally {
            clearTimeout(timer);
        }

        if (failure) {
            setStatus("error");
            // 送信の失敗（Formspree の障害・上限超過・通信エラーなど）を GA4 に記録し、気づけるようにする
            trackEvent("contact_form_error", { location: "contact_page", reason: failure });
            return;
        }
        setSentEmail(form.elements.email.value);
        setStatus("success");
        // Formspree は迷惑送信と判定した場合も成功を返すため、このイベントは判定に関係なく記録される。
        // GA4 のカスタム インサイトでこの件数を知らせ、通知メールが届かなかった問い合わせに気づけるようにしている
        trackEvent("contact_form_submit", { location: "contact_page" });
    };

    // 空白だけの入力で出したエラーを、入力し直したら消す
    const clearBlankError = (event) => event.target.setCustomValidity("");

    if (status === "success") {
        // 迷惑送信と判定されて届かなかった場合や、メールアドレスを打ち間違えた場合に備え、
        // 返信がなければ連絡し直してもらうよう案内する
        return (
            <div style={message} role="status" tabIndex={-1} ref={successRef}>
                <p style={{ margin: "0 0 8px" }}>{t("contact.form.success", { email: sentEmail })}</p>
                <p style={{ margin: 0 }}>{t("contact.form.noReply")}</p>
            </div>
        );
    }

    const required = <span style={requiredMark}>{t("contact.form.required")}</span>;

    return (
        <form onSubmit={handleSubmit}>
            {/* 届くメールの件名と、どの言語のページから送られたか */}
            <input type="hidden" name="_subject" value={t("contact.form.subject")} />
            <input type="hidden" name="language" value={language.code} />

            <div style={field}>
                <label style={label} htmlFor="contact-name">{t("contact.form.name")}{required}</label>
                <input style={input} id="contact-name" name="name" type="text" autoComplete="name" required onInput={clearBlankError} />
            </div>
            <div style={field}>
                <label style={label} htmlFor="contact-organization">{t("contact.form.organization")}</label>
                <input style={input} id="contact-organization" name="organization" type="text" autoComplete="organization" placeholder={t("contact.form.organizationPlaceholder")} />
            </div>
            <div style={field}>
                <label style={label} htmlFor="contact-email">{t("contact.form.email")}{required}</label>
                <input style={input} id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div style={field}>
                <label style={label} htmlFor="contact-phone">{t("contact.form.phone")}</label>
                <input style={input} id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder={t("contact.form.phonePlaceholder")} />
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
                <label style={label} htmlFor="contact-message">{t("contact.form.message")}{required}</label>
                <textarea style={textarea} id="contact-message" name="message" placeholder={t("contact.form.messagePlaceholder")} required onInput={clearBlankError} />
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
