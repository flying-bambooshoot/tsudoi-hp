// サイトのページ一覧と、検索結果に表示されるタイトル・説明文の定義。
// ページを追加したら、src/App.js の Route と合わせてここにも追記する。
// （scripts/postbuild.js が、この一覧からページ別の HTML と sitemap.xml を生成する）

const SITE_URL = "https://tsudoi-shamisen.com";
const SITE_NAME = "津軽三味線 集-tsudoi-";

const pages = [
  {
    path: "/",
    title: SITE_NAME,
    description:
      "中原正人、川﨑愛実、藤﨑健太、野口新、枩原茜、須賀行亮の 6 名で 2021 年に結成。全員がどの流派にも属さず活動する異色の団体。津軽三味線の本領である民謡曲のみならず、現代的なリズムやハーモニーを取り入れたオリジナル楽曲など、津軽三味線の合奏の可能性を追求している。",
  },
  {
    path: "/news",
    title: `NEWS | ${SITE_NAME}`,
    description:
      "津軽三味線 集-tsudoi- の最新情報。大会での受賞結果や、イベント・ステージへの出演情報をお知らせします。",
  },
  {
    path: "/introduction",
    title: `グループ紹介・メンバー | ${SITE_NAME}`,
    description:
      "2021年結成、流派に属さない津軽三味線6人組「集-tsudoi-」の紹介。津軽三味線世界大会、津軽三味線コンクール全国大会など受賞歴多数。メンバーのプロフィールを掲載しています。",
  },
  {
    path: "/contact",
    title: `演奏のご依頼・お問い合わせ | ${SITE_NAME}`,
    description:
      "パーティ・式典・お祭りなどでの津軽三味線の演奏を承ります。民謡から現代曲・カバーまで、2〜6人の編成でイベントに合わせてご相談可能です。料金・連絡先はこちら。",
  },
];

module.exports = { SITE_URL, SITE_NAME, pages };
