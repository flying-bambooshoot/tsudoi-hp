// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// ここにあなたのサイトのURLを設定
const baseUrl = 'https://tsudoi-shamisen.com/';

// サイトに存在するページ一覧
const pages = [
  '/',
  '/news',
  '/introduction',
  '/gallery',
  '/contact',
];

const sitemap = new SitemapStream({ hostname: baseUrl });
pages.forEach((page) => {
  sitemap.write({ url: page, changefreq: 'weekly', priority: 0.8 });
});
sitemap.end();

streamToPromise(sitemap).then((data) => {
  createWriteStream('./public/sitemap.xml').write(data.toString());
  console.log('sitemap.xml generated!');
});