// NEWS の記事のページ（/news/<slug>）を、scripts/postbuild.js で HTML にするための定義（Node.js 用）。
// 記事は src/content/news/ の 1 記事 1 ファイル（例: 2026-10-06.json → /news/2026-10-06）。
// 画面側の読み込み（src/i18n/index.js の useNews）と同じ規則で、訳の空欄は日本語を使う。

const fs = require("fs");
const path = require("path");
const { SITE_NAME, languages } = require("./pages");

const newsDir = path.join(__dirname, "..", "src", "content", "news");

// 訳の空欄は無視する（管理画面で訳を空のまま保存すると "title": "" のように空の値が入るため）
const withoutEmpty = (item = {}) =>
  Object.fromEntries(Object.entries(item).filter(([, value]) => typeof value !== "string" || value.trim() !== ""));

// 検索結果や SNS のカードに出す説明文。本文の改行をつなげ、長い場合は途中で切る
// （日本語・中国語は 1 文字の情報量が多いので短めにする）
const DESCRIPTION_LENGTH = { ja: 110, en: 200, "zh-Hant": 110, "zh-Hans": 110 };
const summarize = (text, code) => {
  const flat = (text || "").replace(/\s*\n+\s*/g, " ").trim();
  const max = DESCRIPTION_LENGTH[code];
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
};

// 記事ごとのページの定義（scripts/pages.js の pages と同じ形 + 写真）
const newsPages = () =>
  fs
    .readdirSync(newsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const slug = file.replace(/\.json$/, "");
      const entry = JSON.parse(fs.readFileSync(path.join(newsDir, file), "utf8"));
      const local = (code) => ({ ...entry.ja, ...withoutEmpty(entry[code]) });
      return {
        path: `/news/${slug}`,
        title: Object.fromEntries(languages.map(({ code }) => [code, `${local(code).title} | ${SITE_NAME[code]}`])),
        description: Object.fromEntries(languages.map(({ code }) => [code, summarize(local(code).contents, code)])),
        // 記事の写真（例: /img/2027_narita.webp）。無い記事は空文字
        image: entry.ja.img || "",
      };
    });

module.exports = { newsPages };
