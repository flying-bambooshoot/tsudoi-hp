import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
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
  window.history.replaceState(null, "", redirectPath);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
