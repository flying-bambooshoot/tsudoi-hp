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
import newsJa from "../data/news.json";
import newsEn from "../data/news.en.json";
import newsZhHant from "../data/news.zh-Hant.json";
import newsZhHans from "../data/news.zh-Hans.json";

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

// NEWS の翻訳。news.json の各記事と date（日付）で対応付ける
const newsTranslations = {
  en: newsEn,
  "zh-Hant": newsZhHant,
  "zh-Hans": newsZhHans,
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
  return useMemo(
    () => ({
      language,
      // 訳文を取得する。配列やオブジェクトの訳文は t(key, { returnObjects: true })
      t: i18next.getFixedT(language.code),
      // その言語にだけある訳文を取得する（無ければ空文字。日本語へのフォールバックはしない）
      tOptional: (key) => i18next.getResource(language.code, "translation", key) || "",
      // サイト内リンクの URL（例: path("/news") → 英語ページなら "/en/news"）
      path: (pagePath) => localizePath(language, pagePath),
    }),
    [language]
  );
};

// NEWS の一覧を新しい順で返す。翻訳が無い記事・項目は日本語のまま表示する
export const useNews = () => {
  const { language } = useI18n();
  return useMemo(() => {
    const translations = newsTranslations[language.code] || {};
    return newsJa.news
      .map((item) => ({ ...item, ...translations[item.date] }))
      .reverse();
  }, [language]);
};
