// npm run build の直前に自動で実行される（package.json の "prebuild"）。
//
// NEWS の記事（src/content/news/）と、その他の出演実績（src/content/performances/）のデータを検査し、
// 問題があればビルドを止める（壊れたデータのまま公開しないため）。
// 例えば記事の日付が無いと、TOP と NEWS 一覧の画面が表示できなくなり、サイト全体が真っ白になる。
// 管理画面で保存した記事もこの検査を通るので、止まったときは GitHub Actions のログに理由が出る。

const fs = require("fs");
const path = require("path");

const contentDir = path.join(__dirname, "..", "src", "content");
const publicDir = path.join(__dirname, "..", "public");

// 値の一覧は src/i18n/index.js（WORK_SCENES）と public/admin/config.yml の選択肢と同じ
const CATEGORIES = ["performance", "award", "info"];
const SCENES = ["festival", "school", "concert", "ceremony", "party", "wedding", "other"];
const LANGUAGES = ["ja", "en", "zh-Hant", "zh-Hans"];

const errors = [];
const warnings = [];

// 2026-10-06 の形で、実在する日付か（2026-02-30 などを弾く）
const isDate = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};
const isFilled = (value) => typeof value === "string" && value.trim() !== "";

const readEntries = (folder) =>
  fs
    .readdirSync(path.join(contentDir, folder))
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const where = `src/content/${folder}/${file}`;
      try {
        return { file, where, entry: JSON.parse(fs.readFileSync(path.join(contentDir, folder, file), "utf8")) };
      } catch (error) {
        errors.push(`${where}: JSON の形が壊れています（${error.message}）`);
        return null;
      }
    })
    .filter(Boolean);

const checkCommon = ({ where, entry }) => {
  if (!entry.ja || typeof entry.ja !== "object") {
    errors.push(`${where}: 日本語（ja）の内容がありません`);
    return false;
  }
  for (const code of Object.keys(entry)) {
    if (!LANGUAGES.includes(code)) errors.push(`${where}: 言語「${code}」は使えません（${LANGUAGES.join(" / ")}）`);
  }
  return true;
};

// NEWS の記事
for (const item of readEntries("news")) {
  const { file, where, entry } = item;
  if (!checkCommon(item)) continue;
  const ja = entry.ja;

  // ファイル名は記事の URL（/news/2026-10-06）になる。同じ日の 2 件目は 2026-10-06-1.json
  if (!/^\d{4}-\d{2}-\d{2}(-\d+)?\.json$/.test(file)) {
    errors.push(`${where}: ファイル名は「2026-10-06.json」か「2026-10-06-1.json」の形にしてください`);
  }
  if (!isFilled(ja.title)) errors.push(`${where}: 日本語のタイトル（title）がありません`);
  if (!isFilled(ja.contents)) errors.push(`${where}: 日本語の本文（contents）がありません`);
  if (!isDate(ja.date)) errors.push(`${where}: 日付（date）は 2026-10-06 の形で書いてください（今: ${JSON.stringify(ja.date)}）`);
  if (isFilled(ja.performanceDate) && !isDate(ja.performanceDate)) {
    errors.push(`${where}: 出演日（performanceDate）は 2026-10-06 の形で書いてください（今: ${JSON.stringify(ja.performanceDate)}）`);
  }
  if (!CATEGORIES.includes(ja.category)) {
    errors.push(`${where}: 記事の種類（category）は ${CATEGORIES.join(" / ")} のどれかにしてください（今: ${JSON.stringify(ja.category)}）`);
  }
  if (isFilled(ja.scene) && !SCENES.includes(ja.scene)) {
    errors.push(`${where}: 出演の場面（scene）は ${SCENES.join(" / ")} のどれかにしてください（今: ${JSON.stringify(ja.scene)}）`);
  }
  // 出演の記事は INTRODUCTION の「出演実績」に載せるので、場面と名前が要る（無くても表示は壊れないので警告だけ）
  if (ja.category === "performance") {
    if (!isFilled(ja.scene)) warnings.push(`${where}: 出演の記事ですが、出演の場面（scene）がありません（出演実績では「その他」になります）`);
    if (!isFilled(ja.workTitle)) warnings.push(`${where}: 出演の記事ですが、出演実績に載せる名前（workTitle）がありません（出演実績に載りません）`);
  }
  for (const key of ["link", "map_link"]) {
    if (isFilled(ja[key]) && !/^https:\/\/\S+$/.test(ja[key])) {
      errors.push(`${where}: ${key} は https:// で始まる URL にしてください（今: ${JSON.stringify(ja[key])}）`);
    }
  }
  if (isFilled(ja.img)) {
    if (!/^\/img\/[^/]+$/.test(ja.img)) {
      errors.push(`${where}: 写真（img）は /img/ファイル名 の形にしてください（今: ${JSON.stringify(ja.img)}）`);
    } else if (!fs.existsSync(path.join(publicDir, ja.img))) {
      errors.push(`${where}: 写真のファイル public${ja.img} がありません`);
    }
  }
}

// その他の出演実績
for (const item of readEntries("performances")) {
  const { where, entry } = item;
  if (!checkCommon(item)) continue;
  const ja = entry.ja;
  if (!isFilled(ja.workTitle)) errors.push(`${where}: 日本語の名前（workTitle）がありません`);
  if (!isDate(ja.date)) errors.push(`${where}: 出演した日（date）は 2026-10-06 の形で書いてください（今: ${JSON.stringify(ja.date)}）`);
  if (!SCENES.includes(ja.scene)) {
    errors.push(`${where}: 出演の場面（scene）は ${SCENES.join(" / ")} のどれかにしてください（今: ${JSON.stringify(ja.scene)}）`);
  }
}

for (const message of warnings) console.warn(`注意: ${message}`);
if (errors.length > 0) {
  console.error(`記事のデータに ${errors.length} 件の問題があるため、ビルドを止めました。`);
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}
console.log("checked: NEWS の記事と出演実績のデータ（問題なし）");
