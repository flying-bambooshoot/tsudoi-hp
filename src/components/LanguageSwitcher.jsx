import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import useMedia from "../useMedia";
import { LANGUAGES, splitPath, localizePath } from "../i18n/languages";
import { useI18n } from "../i18n";

const wrapper = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
}

const icon = {
    fontSize: "20px",
    color: "#555555",
}

const select = {
    padding: "4px 2px",
    border: "solid #cccccc 1px",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "black",
    fontSize: "13px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    cursor: "pointer",
}

// スクリーンリーダー向けのラベル（画面には表示しない）
const visuallyHidden = {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    whiteSpace: "nowrap",
}

// 言語切り替えのプルダウン。選ぶと、今見ているページの別の言語版へ移動する。
// 言語は src/i18n/languages.js の一覧から自動で並ぶので、言語を追加してもここは変更不要。
// onSelect: 言語を選んだ後に実行する処理（ドロワーを閉じるなど）
const LanguageSwitcher = ({ style, onSelect }) => {
    const isMobile = useMedia("(max-width: 1000px)");
    const { language, t } = useI18n();
    const navigate = useNavigate();
    const { path } = splitPath(useLocation().pathname);

    const handleChange = (event) => {
        const next = LANGUAGES.find((lang) => lang.code === event.target.value);
        navigate(localizePath(next, path));
        if (onSelect) onSelect();
    };

    return (
        // ドロワー内で使うとき、クリックやキー操作でメニューが閉じないようにする
        <label
            style={{ ...wrapper, ...style }}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
        >
            <LanguageIcon style={icon} aria-hidden="true" />
            <span style={visuallyHidden}>{t("common.languageMenu")}</span>
            {/* iPhone は 16px 未満の入力欄をタップすると画面を拡大するため、スマホでは 16px にする */}
            <select value={language.code} onChange={handleChange} style={isMobile ? { ...select, fontSize: "16px" } : select}>
                {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} lang={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default LanguageSwitcher;
