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
  // 新しい順。同じ日付の記事は後から追加したもの（2026-10-20-1.json は 2026-10-20.json の後）を上にする。
  // ファイル名の比較は拡張子を除いて行う（"-" と "." の文字の順で逆にならないように）
  .sort((a, b) => {
    const name = (key) => key.replace(/\.json$/, "");
    if (a.entry.ja.date !== b.entry.ja.date) return a.entry.ja.date < b.entry.ja.date ? 1 : -1;
    return name(a.key) < name(b.key) ? 1 : -1;
  })
  // slug は記事のページの URL に使う名前（ファイル名から拡張子を除いたもの。例: /news/2026-10-06）
  .map(({ key, entry }) => ({ slug: key.replace(/^\.\//, "").replace(/\.json$/, ""), entry }));

// 訳の空欄は無視して日本語を表示する（管理画面で訳を空のまま保存すると、"title": "" のように空の値が入るため）
const withoutEmpty = (item = {}) =>
  Object.fromEntries(Object.entries(item).filter(([, value]) => typeof value !== "string" || value.trim() !== ""));

// 日付はファイルには 2026-10-06 の形で書き、画面には 2026.10.6 の形で表示する
const displayDate = (isoDate) => isoDate.split("-").map(Number).join(".");

// 今日の日付（見ている人のパソコン・スマホの日付。2026-10-21 の形）。出演日と比べて、
// 「出演予定」の印と、出演実績に載せるかどうかを決める。見た日で判断するので、出演日を過ぎれば作り直さなくても切り替わる
const today = () => {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
};

// 出演の記事の出演日（performanceDate）。予告の記事では記事の日付と違う。空欄なら記事の日付を使う
const performedOn = (entry) => entry.ja.performanceDate || entry.ja.date;

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

// NEWS の一覧を新しい順で返す。翻訳が無い記事・項目は日本語のまま表示する。
// 各記事の slug で記事のページ（/news/<slug>）へのリンクを作る
export const useNews = () => {
  const { language } = useI18n();
  return useMemo(() => {
    const news = newsEntries.map(({ slug, entry }) => ({
      ...entry.ja,
      ...withoutEmpty(entry[language.code]),
      slug,
      date: displayDate(entry.ja.date),
      img: entry.ja.img || "",
      // 出演日がまだ来ていない出演の記事には「出演予定」の印を付ける（今日の出演も含む）
      upcoming: entry.ja.category === "performance" && !!entry.ja.performanceDate && entry.ja.performanceDate >= today(),
      performanceDate: entry.ja.performanceDate ? displayDate(entry.ja.performanceDate) : "",
    }));
    return isChinese(language) ? toChineseGlyphs(news) : news;
  }, [language]);
};

// NEWS に載せていない出演（結婚式・企業のパーティーなど）。src/content/performances/ に 1 件 1 ファイル。
// 管理画面の「その他の出演実績」から追加する（書き方は src/content/performances/README.md）
const performanceContext = require.context("../content/performances", false, /\.json$/);
const performanceEntries = performanceContext
  .keys()
  .filter((key) => key.startsWith("./"))
  .map((key) => performanceContext(key));

// 出演実績の場面の並び（INTRODUCTION の「出演実績」はこの順に出す）。訳は locales の works.scenes
export const WORK_SCENES = ["festival", "school", "concert", "ceremony", "party", "wedding", "other"];

// INTRODUCTION の「出演実績」。NEWS の記事のうち種類が「出演」のものと、その他の出演実績を合わせ、
// 場面ごと・名前（workTitle）ごとにまとめる。同じ名前は 1 行にし、出演した年を新しい順に並べる。
// 年は、その年の NEWS の記事があれば記事のページへのリンクにする（同じ年に複数あれば新しい方）。
// 返す形: [{ scene, works: [{ title, years: [{ year, slug }] }] }]
export const useWorks = () => {
  const { language } = useI18n();
  return useMemo(() => {
    const local = (entry) => ({ ...entry.ja, ...withoutEmpty(entry[language.code]) });
    // まだ演奏していない出演（出演日が今日より後）は、出演実績に載せない。
    // 予告と事後報告の両方の記事がある出演は、同じ出演日（同じ年）なので 1 回として数える
    const now = today();
    const items = [
      ...newsEntries
        .filter(({ entry }) => entry.ja.category === "performance" && entry.ja.workTitle)
        .map(({ slug, entry }) => ({ entry, slug })),
      ...performanceEntries.filter((entry) => entry.ja && entry.ja.workTitle && entry.ja.date).map((entry) => ({ entry, slug: null })),
    ].filter(({ entry }) => performedOn(entry) <= now).map(({ entry, slug }) => ({
      scene: WORK_SCENES.includes(entry.ja.scene) ? entry.ja.scene : "other",
      key: entry.ja.workTitle,
      title: local(entry).workTitle,
      year: performedOn(entry).slice(0, 4),
      slug,
    }));

    const groups = WORK_SCENES.map((scene) => {
      const byName = new Map();
      for (const item of items.filter((x) => x.scene === scene)) {
        const work = byName.get(item.key) || { title: item.title, years: new Map() };
        // 同じ年に複数あれば、記事のあるもの・新しい記事を優先する（newsEntries は新しい順）
        if (!work.years.has(item.year) || (!work.years.get(item.year) && item.slug)) work.years.set(item.year, item.slug);
        byName.set(item.key, work);
      }
      const works = [...byName.values()]
        .map((work) => {
          const years = [...work.years.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([year, slug]) => ({ year, slug }));
          return { title: work.title, years };
        })
        // 最近出演したものを上に
        .sort((a, b) => b.years[0].year.localeCompare(a.years[0].year) || a.title.localeCompare(b.title));
      return { scene, works };
    }).filter((group) => group.works.length > 0);

    return isChinese(language) ? toChineseGlyphs(groups) : groups;
  }, [language]);
};
