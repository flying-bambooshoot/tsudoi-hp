// npm run build の直後に自動で実行される（package.json の "postbuild"）。
//
// GitHub Pages は SPA のルーティングに対応していないため、何もしないと
// "/news" などは HTTP 404 で返り、Google に「存在しないページ」と判断される。
// そこで build/index.html を元に、ページごとの HTML を生成する。
//
//   /news  →  build/news.html （GitHub Pages は拡張子なしの URL で .html を返す）
//
// あわせて、ページ別の <title> / description / canonical と sitemap.xml も出力する。

const fs = require("fs");
const path = require("path");
const { SITE_URL, pages } = require("./pages");

const buildDir = path.join(__dirname, "..", "build");
const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");

const escapeHtml = (text) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const renderHtml = (page) => {
  const url = SITE_URL + page.path;
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${escapeHtml(page.description)}">`
    )
    .replace("</head>", `<link rel="canonical" href="${url}"></head>`);

  // 置換に失敗したまま公開しないよう、結果を検証する
  if (!html.includes(`<title>${escapeHtml(page.title)}</title>`) || !html.includes('rel="canonical"')) {
    throw new Error(`${page.path} の HTML 生成に失敗しました。public/index.html の <head> を確認してください。`);
  }
  return html;
};

for (const page of pages) {
  const fileName = page.path === "/" ? "index.html" : `${page.path.slice(1)}.html`;
  fs.writeFileSync(path.join(buildDir, fileName), renderHtml(page));
  console.log(`generated: build/${fileName}`);
}

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((page) => `  <url><loc>${SITE_URL}${page.path}</loc></url>\n`).join("") +
  "</urlset>\n";
fs.writeFileSync(path.join(buildDir, "sitemap.xml"), sitemap);
console.log("generated: build/sitemap.xml");
