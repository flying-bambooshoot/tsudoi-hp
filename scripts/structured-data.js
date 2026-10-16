// 構造化データ（JSON-LD）を言語別に作る。scripts/postbuild.js から呼ばれる。
//
// Google に「このサイトは音楽グループ（MusicGroup）のサイトで、こういう情報がある」と伝えるための記述。
// ページの見た目には影響しない。
// メンバー名と受賞歴は src/locales/*.json（画面に表示している訳文）から組み立てるので、
// 受賞歴などを更新するときは訳文ファイルだけを直せばよい。

const path = require("path");
const { SITE_URL } = require("./pages");

const loadLocale = (code) => require(path.join(__dirname, "..", "src", "locales", `${code}.json`));

// 全言語・全ページで同じグループとして扱われるよう、共通の ID を付ける
const GROUP_ID = `${SITE_URL}/#musicgroup`;

const SNS = [
  "https://x.com/tsudoi_shamisen",
  "https://www.instagram.com/tsudoi_shamisen",
  "https://www.youtube.com/channel/UCvELpZfQ5fD4i-b8NfyXm9w",
];

const GENRE = {
  ja: ["津軽三味線", "民謡"],
  en: ["Tsugaru shamisen", "Japanese folk music"],
  "zh-Hant": ["津輕三味線", "日本民謠"],
  "zh-Hans": ["津轻三味线", "日本民谣"],
};

// language: scripts/pages.js の languages の要素 / homeUrl: その言語の TOP の URL / description: その言語の TOP の説明文
const musicGroup = (language, homeUrl, description) => {
  const locale = loadLocale(language.code);
  const { members, awards } = locale.introduction;

  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": GROUP_ID,
    name: locale.common.siteName,
    alternateName: ["集-tsudoi-", "Tsudoi"],
    url: homeUrl,
    description,
    image: `${SITE_URL}/img/artist_photo.jpg`,
    foundingDate: "2021",
    genre: GENRE[language.code],
    member: Object.values(members).map((name) => ({ "@type": "Person", name })),
    award: awards.flatMap((award) => award.items.map((item) => `${award.year} ${item}`)),
    email: "tsudoi.shamisen@gmail.com",
    sameAs: SNS,
  };
};

// TOP ページに埋め込んでいる YouTube 動画の情報（VideoObject）。
// Google に「このページで見られる動画」と伝え、検索結果で動画として表示されやすくする。
// 動画の一覧は画面と同じ src/data/videos.json から読み込むので、画面と食い違わない。
// Google の決まりで、動画を見られるページ（TOP）にだけ付ける。
const { videos } = require(path.join(__dirname, "..", "src", "data", "videos.json"));

const videoObjects = () =>
  videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: `https://www.youtube.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    // 動画の作者として、このサイトの MusicGroup を指す
    creator: { "@id": GROUP_ID },
  }));

// <script type="application/ld+json"> として埋め込む文字列を作る。
// JSON の中に "</script>" などが含まれても HTML が壊れないよう、"<" をエスケープする
const jsonLdScript = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;

module.exports = { musicGroup, videoObjects, jsonLdScript };
