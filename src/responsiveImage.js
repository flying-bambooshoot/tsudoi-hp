// 写真の <img srcset> を組み立てる。縮小版（幅 640px・1024px）は、ビルドの前に scripts/resize-images.js が
// public/img/sized/ に作る。対象と大きさは src/resources/img/responsive.json。
//
// 使い方: <img src={school} {...responsive("homeGallery/school.webp", school, "180px")} />
//   - 第 1 引数: src/resources/img/ からのファイルの場所（responsive.json のキー）
//   - 第 2 引数: import した元の写真の URL（いちばん大きい候補として使う）
//   - 第 3 引数: 表示する幅（sizes。例 "180px"、"(min-width: 900px) 505px, 100vw"）
// 返すもの: srcSet・sizes と、元の写真の width・height（表示のずれを防ぐための大きさの指定）

import config from "./resources/img/responsive.json";

// scripts/resize-images.js と同じ規則
const variantName = (file, width) => `${file.replace(/\.[^.]+$/, "").replace(/\//g, "_")}-${width}.webp`;

// TOP のギャラリーの写真の表示の幅（スマホは 1 枚ずつ画面の幅、PC は 3 枚ずつ）。
// TOP の「演奏のご依頼」のカードも同じ写真を使うので、この値を使って同じ大きさの写真を選ばせる
export const GALLERY_SIZES = "(min-width: 640px) 34vw, 100vw";

export const responsive = (file, originalUrl, sizes) => {
  const item = config[file];
  if (!item) throw new Error(`${file} が src/resources/img/responsive.json にありません`);
  const srcSet = [...item.variants.map((w) => `/img/sized/${variantName(file, w)} ${w}w`), `${originalUrl} ${item.width}w`].join(", ");
  return { srcSet, sizes, width: item.width, height: item.height };
};
