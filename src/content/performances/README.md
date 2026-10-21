# その他の出演実績

NEWS に載せていない出演（結婚式・企業のパーティーなど）を、INTRODUCTION の「出演実績」に載せるためのフォルダ。
管理画面（/admin/）の「その他の出演実績」から追加する。1 件 1 ファイル（例: `2025-06-01.json`）。

```json
{
  "ja": { "workTitle": "都内企業の創立記念パーティー", "date": "2025-06-01", "scene": "party" },
  "en": { "workTitle": "Company anniversary party in Tokyo" },
  "zh-Hant": { "workTitle": "東京都內企業創立紀念派對" },
  "zh-Hans": { "workTitle": "东京都内企业创立纪念派对" }
}
```

- `workTitle`: 実績に載せる名前。同じ名前は 1 行にまとめ、年を並べる（NEWS の記事の `workTitle` とも同じ規則）
- `date`: 出演した日。年だけを表示する
- `scene`: 場面。`festival`（祭り・地域イベント）／`school`（学校）／`concert`（コンサート・ホール・サロン）／`ceremony`（式典・公的イベント）／`party`（パーティー・企業イベント）／`wedding`（結婚式）／`other`（その他）
- 訳が空欄の言語は日本語で表示する
