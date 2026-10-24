import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';
import "normalize.css";

// GitHub Pages は SPA のルーティングに対応していないため、
// "/news" などへの直接アクセスは一度 404.html を経由してトップに戻される。
// 404.html が sessionStorage に保存したパスを、ここで復元する。
//
// BrowserRouter はマウント時の location を読むため、
// この処理は必ず root.render() より前に実行する必要がある。
const redirectPath = sessionStorage.getItem("path");
if (redirectPath) {
  sessionStorage.removeItem("path");
  // "//evil.example.com/x" のように先頭に / が続くパスは、別のサイトの URL として解釈され、
  // replaceState が例外になって画面が真っ白になっていた。先頭の / と \ を 1 つの / にまとめ、
  // それでも戻せない場合はトップのまま表示する（どのページにも当てはまらなければ「ページが見つかりません」になる）
  const safePath = redirectPath.replace(/^[/\\]+/, "/");
  try {
    window.history.replaceState(null, "", safePath);
  } catch {
    // 戻せないパスは無視する
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
