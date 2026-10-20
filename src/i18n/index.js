// 多言語対応の仕組み。
//
// 表示する言語は URL で決まる（/en/... なら英語）。
// App.js で言語ごとにルートを分け、LanguageProvider で「このページの言語」を配下に伝える。
// 各コンポーネントは useI18n() で、その言語の訳文と URL を取得する。
//
// 訳文が無いキーは日本語にフォールバックする（翻訳漏れがあっても空欄にならない）。

import { createContext, useContext, useEffect, useMemo } from "react";
import i18next from "i18next";
import { DEFAULT_LANGUAGE, localizePath } from "./languages";
import ja from "../locales/ja.json";
import en from "../locales/en.json";
import zhHant from "../locales/zh-Hant.json";
import zhHans from "../locales/zh-Hans.json";

i18next.init({
  resources: {
    ja: { translation: ja },
    en: { translation: en },
    "zh-Hant": { translation: zhHant },
    "zh-Hans": { translation: zhHans },
  },
  lng: DEFAULT_LANGUAGE.code,
  fallbackLng: DEFAULT_LANGUAGE.code,
  returnEmptyString: false,
  interpolation: { escapeValue: false },
});

// NEWS の記事。src/content/news/ に 1 記事 1 ファイル（例: 2026-10-06.json）で置き、
// ファイルの中に言語ごとの内容（ja・en・zh-Hant・zh-Hans）を書く。
// 日付（date）・リンク・写真（img）は日本語（ja）にだけ書けばよい。
// ファイルを追加するだけで一覧に載る（webpack の require.context でフォルダ内を全部読み込む）
const newsContext = require.context("../content/news", false, /\.json$/);
const newsEntries = newsContext
  .keys()
  .filter((key) => key.startsWith("./"))
  .map((key) => ({ key, entry: newsContext(key) }))
  // 新しい順。同じ日付の記事はファイル名の逆順（後から追加したものが上）
  .sort((a, b) => b.entry.ja.date.localeCompare(a.entry.ja.date) || b.key.localeCompare(a.key))
  .map(({ entry }) => entry);

// 日付はファイルには 2026-10-06 の形で書き、画面には 2026.10.6 の形で表示する
const displayDate = (isoDate) => isoDate.split("-").map(Number).join(".");

// 中国語には無い日本の異体字を、中国語のページでは通常の字に置き換えて表示する（オーナーの指定）。
// 例: 藤﨑 → 藤崎。元のデータ（訳文・NEWS）は正しい表記で書き、表示するときだけ置き換える。
// scripts/postbuild.js でも、中国語ページの HTML に同じ置き換えをしている
const CHINESE_GLYPHS = [[/﨑/g, "崎"]];
const isChinese = (language) => language.code.startsWith("zh");
const toChineseGlyphs = (value) => {
  if (typeof value === "string") {
    return CHINESE_GLYPHS.reduce((text, [from, to]) => text.replace(from, to), value);
  }
  if (Array.isArray(value)) return value.map(toChineseGlyphs);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, v]) => [key, toChineseGlyphs(v)]));
  }
  return value;
};

const LanguageContext = createContext(DEFAULT_LANGUAGE);

export const LanguageProvider = ({ language, children }) => {
  useEffect(() => {
    document.documentElement.lang = language.code;
  }, [language]);

  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
};

export const useI18n = () => {
  const language = useContext(LanguageContext);
  return useMemo(() => {
    const t = i18next.getFixedT(language.code);
    const glyphs = isChinese(language) ? toChineseGlyphs : (value) => value;
    return {
      language,
      // 訳文を取得する。配列やオブジェクトの訳文は t(key, { returnObjects: true })
      t: (...args) => glyphs(t(...args)),
      // その言語にだけある訳文を取得する（無ければ空文字。日本語へのフォールバックはしない）
      tOptional: (key) => glyphs(i18next.getResource(language.code, "translation", key) || ""),
      // サイト内リンクの URL（例: path("/news") → 英語ページなら "/en/news"）
      path: (pagePath) => localizePath(language, pagePath),
    };
  }, [language]);
};

// NEWS の一覧を新しい順で返す。翻訳が無い記事・項目は日本語のまま表示する
export const useNews = () => {
  const { language } = useI18n();
  return useMemo(() => {
    const news = newsEntries.map((entry) => ({
      ...entry.ja,
      ...entry[language.code],
      date: displayDate(entry.ja.date),
      img: entry.ja.img || "",
    }));
    return isChinese(language) ? toChineseGlyphs(news) : news;
  }, [language]);
};
