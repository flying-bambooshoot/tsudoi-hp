// サイトのページ一覧と、検索結果に表示されるタイトル・説明文の定義（言語別）。
// label はパンくずリストのページ名（src/components/Breadcrumb.jsx と同じ表記にする）。
// ページを追加したら、src/App.js の pages と合わせてここにも追記する。
// （scripts/postbuild.js が、この一覧から言語別・ページ別の HTML と sitemap.xml を生成する）

const SITE_URL = "https://tsudoi-shamisen.com";

// src/i18n/languages.js と同じ一覧（こちらは Node.js 用）
const languages = [
  { code: "ja", prefix: "" },
  { code: "en", prefix: "/en" },
  { code: "zh-Hant", prefix: "/zh-hant" },
  { code: "zh-Hans", prefix: "/zh-hans" },
];

const SITE_NAME = {
  ja: "津軽三味線 集-tsudoi-",
  en: 'Tsugaru Shamisen "Tsudoi"',
  "zh-Hant": "津輕三味線 集-tsudoi-",
  "zh-Hans": "津轻三味线 集-tsudoi-",
};

const pages = [
  {
    path: "/",
    label: "HOME",
    title: SITE_NAME,
    description: {
      ja: "中原正人、川﨑愛実、藤﨑健太、野口新、枩原茜、須賀行亮の 6 名で 2021 年に結成。全員がどの流派にも属さず活動する異色の団体。津軽三味線の本領である民謡曲のみならず、現代的なリズムやハーモニーを取り入れたオリジナル楽曲など、津軽三味線の合奏の可能性を追求している。",
      en: "Tsugaru shamisen ensemble formed in 2021 by six independent players. Award-winning performances of traditional folk songs and original pieces. Available for parties, ceremonies, festivals, and events in Japan.",
      "zh-Hant": "2021年組成的津輕三味線6人團體，成員皆不隸屬於任何流派。演奏傳統民謠與融入現代節奏的原創樂曲，曾多次在全國大賽中奪冠。承接派對、典禮、祭典等活動演出。",
      "zh-Hans": "2021年组成的津轻三味线6人团体，成员均不隶属于任何流派。演奏传统民谣与融入现代节奏的原创乐曲，曾多次在全国大赛中夺冠。承接派对、典礼、祭典等活动演出。",
    },
  },
  {
    path: "/news",
    label: "NEWS",
    title: {
      ja: `NEWS | ${SITE_NAME.ja}`,
      en: `News | ${SITE_NAME.en}`,
      "zh-Hant": `最新消息 | ${SITE_NAME["zh-Hant"]}`,
      "zh-Hans": `最新消息 | ${SITE_NAME["zh-Hans"]}`,
    },
    description: {
      ja: "津軽三味線 集-tsudoi- の最新情報。大会での受賞結果や、イベント・ステージへの出演情報をお知らせします。",
      en: 'Latest news from Tsugaru Shamisen "Tsudoi": competition results and upcoming performances at events and stages.',
      "zh-Hant": "津輕三味線 集-tsudoi- 的最新消息。發布比賽獲獎結果，以及活動與舞台的演出資訊。",
      "zh-Hans": "津轻三味线 集-tsudoi- 的最新消息。发布比赛获奖结果，以及活动与舞台的演出信息。",
    },
  },
  {
    path: "/introduction",
    label: "INTRODUCTION/MEMBER",
    title: {
      ja: `グループ紹介・メンバー | ${SITE_NAME.ja}`,
      en: `About & Members | ${SITE_NAME.en}`,
      "zh-Hant": `團體介紹・成員 | ${SITE_NAME["zh-Hant"]}`,
      "zh-Hans": `团体介绍・成员 | ${SITE_NAME["zh-Hans"]}`,
    },
    description: {
      ja: "2021年結成、流派に属さない津軽三味線6人組「集-tsudoi-」の紹介。津軽三味線世界大会、津軽三味線コンクール全国大会など受賞歴多数。メンバーのプロフィールを掲載しています。",
      en: 'About Tsugaru Shamisen "Tsudoi", a six-member ensemble formed in 2021. Winners of the Tsugaru Shamisen World Competition and the National Tsugaru Shamisen Concours. Meet the members.',
      "zh-Hant": "2021年組成、不隸屬任何流派的津輕三味線6人團體「集-tsudoi-」。曾獲津輕三味線世界大會、津輕三味線大賽全國大會等多項冠軍。介紹團體成員。",
      "zh-Hans": "2021年组成、不隶属任何流派的津轻三味线6人团体「集-tsudoi-」。曾获津轻三味线世界大会、津轻三味线大赛全国大会等多项冠军。介绍团体成员。",
    },
  },
  {
    path: "/contact",
    label: "CONTACT US",
    title: {
      ja: `演奏のご依頼・お問い合わせ | ${SITE_NAME.ja}`,
      en: `Book a Performance | ${SITE_NAME.en}`,
      "zh-Hant": `演出邀約・聯絡我們 | ${SITE_NAME["zh-Hant"]}`,
      "zh-Hans": `演出邀请・联系我们 | ${SITE_NAME["zh-Hans"]}`,
    },
    description: {
      ja: "パーティ・式典・お祭りなどでの津軽三味線の演奏を承ります。民謡から現代曲・カバーまで、2〜6人の編成でイベントに合わせてご相談可能です。料金・連絡先はこちら。",
      en: "Book a live Tsugaru shamisen performance in Japan for parties, ceremonies, festivals, and corporate events. Folk songs, contemporary pieces, and covers with 2 to 6 players. Fees and contact details.",
      "zh-Hant": "承接派對、典禮、祭典等活動的津輕三味線演出。從民謠到現代曲、翻奏曲，可依活動安排2～6人編制。費用與聯絡方式請見此頁。",
      "zh-Hans": "承接派对、典礼、祭典等活动的津轻三味线演出。从民谣到现代曲、翻奏曲，可根据活动安排2～6人编制。费用与联系方式请见此页。",
    },
  },
];

module.exports = { SITE_URL, languages, pages };
