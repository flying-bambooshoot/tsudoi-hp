// 対応言語の一覧。
// code   : 翻訳ファイルと hreflang で使う言語コード
// prefix : URL の先頭に付くパス（日本語は付けない）
// label  : 言語切り替えメニューに表示する名前
//
// 言語を追加する場合は、ここに追記し、src/locales と src/data に翻訳ファイルを追加する。
// （scripts/pages.js にも同じ一覧があるので合わせて追記すること）
export const LANGUAGES = [
  { code: "ja", prefix: "", label: "日本語" },
  { code: "en", prefix: "/en", label: "English" },
  { code: "zh-Hant", prefix: "/zh-hant", label: "繁體中文" },
  { code: "zh-Hans", prefix: "/zh-hans", label: "简体中文" },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

// "/en/news" → { language: English, path: "/news" } のように、URL を言語とページに分ける
export const splitPath = (pathname) => {
  const language =
    LANGUAGES.find(
      (lang) => lang.prefix && (pathname === lang.prefix || pathname.startsWith(lang.prefix + "/"))
    ) || DEFAULT_LANGUAGE;
  const path = pathname.slice(language.prefix.length) || "/";
  return { language, path };
};

// ページのパスに言語の prefix を付ける（例: "/news" → "/en/news"、"/" → "/en/"）
export const localizePath = (language, path) =>
  path === "/" ? `${language.prefix}/` : `${language.prefix}${path}`;
