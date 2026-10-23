// npm run build / npm start の直前に自動で実行される（package.json の "prebuild" / "prestart"）。
//
// 画面の写真（src/resources/img/）の縮小版（幅 640px・1024px）を public/img/sized/ に作る。
// 画面側は src/responsiveImage.js で <img srcset> を組み立て、ブラウザが表示の大きさと画面の細かさに合う写真を選ぶ。
// 例えば INTRODUCTION のメンバー写真は、元の 1567px（約 85KB）を PC では 640px（約 16KB）で読み込む（2026-10-23）。
//
// 対象と大きさは src/resources/img/responsive.json に書く。写真を差し替えて元の大きさが変わったときは、
// この JSON の width / height も直す（違っているとビルドを止める）。
// 作った縮小版は Git に入れない（.gitignore）。元の写真より新しければ作り直さない。

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const imgDir = path.join(__dirname, "..", "src", "resources", "img");
const outDir = path.join(__dirname, "..", "public", "img", "sized");
const config = require(path.join(imgDir, "responsive.json"));
const QUALITY = 80;

// 縮小版のファイル名（例: member/member_uji.webp の 640px → member_member_uji-640.webp）。
// 同じ規則を src/responsiveImage.js でも使う
const variantName = (file, width) => `${file.replace(/\.[^.]+$/, "").replace(/\//g, "_")}-${width}.webp`;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  let made = 0;
  for (const [file, { width, height, variants }] of Object.entries(config)) {
    const source = path.join(imgDir, file);
    const meta = await sharp(source).metadata();
    if (meta.width !== width || meta.height !== height) {
      throw new Error(
        `${file} の大きさが ${meta.width}×${meta.height} に変わっています。src/resources/img/responsive.json の width / height を直してください（今: ${width}×${height}）`
      );
    }
    for (const w of variants) {
      const target = path.join(outDir, variantName(file, w));
      if (fs.existsSync(target) && fs.statSync(target).mtimeMs >= fs.statSync(source).mtimeMs) continue;
      await sharp(source).resize(w).webp({ quality: QUALITY }).toFile(target);
      made += 1;
    }
  }
  console.log(`checked: 写真の縮小版（public/img/sized/、新しく作ったもの ${made} 枚）`);
})().catch((error) => {
  console.error("写真の縮小版の作成に失敗しました:", error.message);
  process.exit(1);
});
