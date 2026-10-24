import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LANGUAGES, splitPath, localizePath } from "../i18n/languages";
import { useI18n } from "../i18n";

// 言語切り替え。見た目は「地球のアイコン＋今の言語のコード（ja・en など）＋▼」だけにし、
// その上に透明なプルダウン（select）を重ねている。押すとスマホ・PC の標準の選択画面が開く。
// 以前は白い四角のプルダウンをそのまま見せていたが、黒いヘッダーの中で浮いて見えたため変えた（2026-10-24）
const wrapper = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 4px",
    borderRadius: "4px",
    cursor: "pointer",
}

const icon = {
    fontSize: "22px",
}

const code = {
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    letterSpacing: "0.08em",
}

const caret = {
    fontSize: "16px",
    marginLeft: "-2px",
}

// 見た目の上に重ねる、透明なプルダウン。押せる範囲は見た目と同じ
const select = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
    // iPhone は 16px 未満の入力欄をタップすると画面を拡大するため 16px にする
    fontSize: "16px",
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
// dark: 黒い背景（スマホのヘッダー）に置くとき。文字とアイコンを白くする
const LanguageSwitcher = ({ style, onSelect, dark }) => {
    const { language, t } = useI18n();
    const navigate = useNavigate();
    const { path } = splitPath(useLocation().pathname);
    // プルダウンが透明なので、キーボードで選んでいるときは周りに線を出して場所を示す
    const [focused, setFocused] = useState(false);
    const color = dark ? "#e0f2f1" : "#333333";

    const handleChange = (event) => {
        const next = LANGUAGES.find((lang) => lang.code === event.target.value);
        navigate(localizePath(next, path));
        if (onSelect) onSelect();
    };

    return (
        // ドロワー内で使うとき、クリックやキー操作でメニューが閉じないようにする
        <label
            style={{ ...wrapper, color, outline: focused ? `2px solid ${color}` : "none", ...style }}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
        >
            <LanguageIcon style={icon} aria-hidden="true" />
            {/* 今の言語のコード（URL と同じ小文字。例: ja、en、zh-hant） */}
            <span style={code} aria-hidden="true">{language.code.toLowerCase()}</span>
            <ExpandMoreIcon style={caret} aria-hidden="true" />
            <span style={visuallyHidden}>{t("common.languageMenu")}</span>
            <select
                value={language.code}
                onChange={handleChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={select}
            >
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
