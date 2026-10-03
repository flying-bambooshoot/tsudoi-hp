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
// あわせて、ページ別の <html lang> / <title> / description / canonical / hreflang、
// 構造化データ（JSON-LD）と sitemap.xml も出力する。

const fs = require("fs");
const path = require("path");
const { SITE_URL, languages, pages } = require("./pages");
const { musicGroup, jsonLdScript } = require("./structured-data");

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

// 同じページの各言語版の場所を Google に伝える（x-default は日本語版）
const hreflangLinks = (page) =>
  languages
    .map((language) => `<link rel="alternate" hreflang="${language.code}" href="${pageUrl(language, page)}">`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${pageUrl(languages[0], page)}">`)
    .join("");

const renderHtml = (language, page) => {
  const title = escapeHtml(page.title[language.code]);
  const description = escapeHtml(page.description[language.code]);
  const home = pages.find((p) => p.path === "/");
  const structuredData = jsonLdScript(
    musicGroup(language, pageUrl(language, home), home.description[language.code])
  );
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${language.code}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
    .replace(
      "</head>",
      `<link rel="canonical" href="${pageUrl(language, page)}">${hreflangLinks(page)}${structuredData}</head>`
    );

  // 置換に失敗したまま公開しないよう、結果を検証する
  const ok =
    html.includes(`<html lang="${language.code}">`) &&
    html.includes(`<title>${title}</title>`) &&
    html.includes(`content="${description}"`) &&
    html.includes('rel="canonical"') &&
    html.includes('"@type":"MusicGroup"');
  if (!ok) {
    throw new Error(
      `${language.prefix}${page.path} の HTML 生成に失敗しました。public/index.html の <html> / <head> を確認してください。`
    );
  }
  return html;
};

for (const language of languages) {
  for (const page of pages) {
    const file = outputFile(language, page);
    fs.mkdirSync(path.dirname(path.join(buildDir, file)), { recursive: true });
    fs.writeFileSync(path.join(buildDir, file), renderHtml(language, page));
    console.log(`generated: build/${file.replace(/\\/g, "/")}`);
  }
}

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  languages
    .flatMap((language) => pages.map((page) => `  <url><loc>${pageUrl(language, page)}</loc></url>\n`))
    .join("") +
  "</urlset>\n";
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log("generated: build/sitemap.xml");
