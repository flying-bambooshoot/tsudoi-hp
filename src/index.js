import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "normalize.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// 404.html からのリダイレクトを復元
const redirectPath = sessionStorage.getItem("redirectPath");
if (redirectPath) {
  sessionStorage.removeItem("redirectPath");
  window.history.replaceState(null, null, redirectPath);
  // React レンダリング後にスクロール
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0); // 最上部にスクロール
} else {
  // 通常ロードでも念のため最上部
  // React レンダリング後にスクロール
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0); // 最上部にスクロール
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
