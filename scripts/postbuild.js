// npm run build の直後に自動で実行される（package.json の "postbuild"）。
//
// GitHub Pages は SPA のルーティングに対応していないため、何もしないと
// "/news" などは HTTP 404 で返り、Google に「存在しないページ」と判断される。
// そこで build/index.html を元に、言語別・ページ別の HTML を生成する。
//
//   /news     →  build/news.html     （GitHub Pages は拡張子なしの URL で .html を返す）
//   /en/      →  build/en/index.html
//   /en/news  →  build/en/news.html
//
// あわせて、ページ別の <html lang> / <title> / description / canonical / hreflang / OGP、
// 構造化データ（JSON-LD）と sitemap.xml も出力する。

const fs = require("fs");
const path = require("path");
const { SITE_URL, SITE_NAME, languages, pages } = require("./pages");
const { musicGroup, videoObjects, jsonLdScript } = require("./structured-data");
const { newsPages } = require("./news");

// NEWS の記事のページ（/news/2026-10-06 など）。src/content/news/ の記事から作る
const articlePages = newsPages();

const buildDir = path.join(__dirname, "..", "build");
const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const pageUrl = (language, page) =>
  SITE_URL + language.prefix + (page.path === "/" ? "/" : page.path);

const outputFile = (language, page) => {
  const fileName = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  return path.join(language.prefix.slice(1), fileName);
};

// ページを開いて最初に表示される大きな写真（LCP の画像）を先読みする。
// このサイトは JS が動いてから画面を組み立てるため、何もしないと JS の読み込み・実行が
// 終わるまで写真の読み込みが始まらない。HTML に preload を書いておくと、すぐに読み込みが始まる。
// ビルド後のファイル名には識別用の文字列が付くため、asset-manifest.json から実際の URL を引く。
const assetManifest = JSON.parse(fs.readFileSync(path.join(buildDir, "asset-manifest.json"), "utf8")).files;
const LCP_IMAGES = {
  "/": "static/media/top1.webp",
  "/introduction": "static/media/all.webp",
};
const preloadLink = (page) => {
  // NEWS の記事のページでは、記事の写真（public/img のファイル）を先読みする
  if (page.image) return `<link rel="preload" as="image" href="${page.image}" fetchpriority="high">`;
  const key = LCP_IMAGES[page.path];
  if (!key) return "";
  // 画像の名前や形式を変えたときに、先読みが黙って外れないようにする
  if (!assetManifest[key]) {
    throw new Error(`${key} が asset-manifest.json にありません。scripts/postbuild.js の LCP_IMAGES を確認してください。`);
  }
  return `<link rel="preload" as="image" href="${assetManifest[key]}" fetchpriority="high">`;
};

// 同じページの各言語版の場所を Google に伝える（x-default は日本語版）
const hreflangLinks = (page) =>
  languages
    .map((language) => `<link rel="alternate" hreflang="${language.code}" href="${pageUrl(language, page)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${pageUrl(languages[0], page)}">`)
    .join("");

// SNS（X・Facebook・LINE など）で URL を共有したときのカード表示（OGP）。
// 画像は全ページ共通で、トップのロゴを同じ暗い背景に載せた public/ogp.png（1200×630）。
// ロゴは中央の 600×360 に収めてあり、正方形に切り抜かれる表示でも欠けない。
const OGP_IMAGE = { url: `${SITE_URL}/ogp.png`, width: 1200, height: 630 };
const OGP_LOCALES = { ja: "ja_JP", en: "en_US", "zh-Hant": "zh_TW", "zh-Hans": "zh_CN" };
// NEWS の記事のページは、記事の写真があればそれをカードの画像にする（大きさは記事ごとに違うので書かない）
const ogpImageTags = (page) =>
  page.image
    ? [["og:image", `${SITE_URL}${page.image}`]]
    : [
        ["og:image", OGP_IMAGE.url],
        ["og:image:width", OGP_IMAGE.width],
        ["og:image:height", OGP_IMAGE.height],
      ];
const ogpTags = (language, page, title, description) =>
  [
    ["og:type", page.image !== undefined ? "article" : "website"],
    ["og:site_name", escapeHtml(SITE_NAME[language.code])],
    ["og:title", title],
    ["og:description", description],
    ["og:url", pageUrl(language, page)],
    ["og:locale", OGP_LOCALES[language.code]],
    ...languages
      .filter((other) => other !== language)
      .map((other) => ["og:locale:alternate", OGP_LOCALES[other.code]]),
    ...ogpImageTags(page),
    // 画像の説明。記事の写真は記事のタイトル、共通の画像はサイト名
    ["og:image:alt", page.image ? title : escapeHtml(SITE_NAME[language.code])],
  ]
    .map(([property, content]) => `<meta property="${property}" content="${content}">`)
    .concat('<meta name="twitter:card" content="summary_large_image">')
    .join("");

const renderHtml = (language, page) => {
  const title = escapeHtml(page.title[language.code]);
  const description = escapeHtml(page.description[language.code]);
  const home = pages.find((p) => p.path === "/");
  const structuredData =
    jsonLdScript(musicGroup(language, pageUrl(language, home), home.description[language.code])) +
    // 動画は TOP ページにだけ埋め込んでいるので、TOP ページにだけ付ける
    (page.path === "/" ? videoObjects().map(jsonLdScript).join("") : "");
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${language.code}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(
      "</head>",
      `${preloadLink(page)}<link rel="canonical" href="${pageUrl(language, page)}">${hreflangLinks(page)}${ogpTags(language, page, title, description)}${structuredData}</head>`
    );

  // 置換に失敗したまま公開しないよう、結果を検証する
  const ok =
    html.includes(`<html lang="${language.code}">`) &&
    html.includes(`<title>${title}</title>`) &&
    html.includes(`content="${description}"`) &&
    html.includes('rel="canonical"') &&
    html.includes('<meta property="og:image" content="https://') &&
    html.includes('"@type":"MusicGroup"');
  if (!ok) {
    throw new Error(
      `${language.prefix}${page.path} の HTML 生成に失敗しました。public/index.html の <html> / <head> を確認してください。`
    );
  }
  // 中国語のページでは、中国語に無い日本の異体字を通常の字に置き換える（例: 藤﨑 → 藤崎）。
  // 画面側の置き換え（src/i18n/index.js）と同じ規則。上の検証の後に行う
  return language.code.startsWith("zh") ? html.replace(/﨑/g, "崎") : html;
};

// 固定のページ（TOP・NEWS 一覧など）と NEWS の記事のページ。
// 記事は news/2026-10-06.html のように news/ フォルダに出力する。GitHub Pages では、
// /news は news.html、/news/2026-10-06 は news/2026-10-06.html が返る（2026-10-21 にフォークで確認）
const allPages = [...pages, ...articlePages];

for (const language of languages) {
  for (const page of allPages) {
    const file = outputFile(language, page);
    fs.mkdirSync(path.dirname(path.join(buildDir, file)), { recursive: true });
    fs.writeFileSync(path.join(buildDir, file), renderHtml(language, page));
    if (!articlePages.includes(page)) console.log(`generated: build/${file.replace(/\\/g, "/")}`);
  }
}
console.log(`generated: NEWS の記事のページ ${articlePages.length} 件 × ${languages.length} 言語`);

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  languages
    .flatMap((language) => allPages.map((page) => `  <url><loc>${pageUrl(language, page)}</loc></url>\n`))
    .join("") +
  "</urlset>\n";
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log("generated: build/sitemap.xml");
