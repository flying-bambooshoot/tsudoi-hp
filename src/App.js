import { BrowserRouter, Routes, Route } from "react-router-dom";
// ページ追加手順
import Home from "./pages/home.jsx";
import News from "./pages/news.jsx";
import NewsArticle from "./pages/newsArticle.jsx";
import Intro from "./pages/introduction.jsx";
import Contact from "./pages/contact.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { LANGUAGES } from "./i18n/languages";
import { LanguageProvider } from "./i18n";

// ページの一覧。言語ごとに "/news"、"/en/news" … のように同じページが割り当てられる
const pages = [
  { path: "/", element: <Home /> },
  { path: "/news", element: <News /> },
  // NEWS の記事 1 件のページ（例: /news/2026-10-06）。slug は src/content/news/ のファイル名
  { path: "/news/:slug", element: <NewsArticle /> },
  { path: "/introduction", element: <Intro /> },
  { path: "/contact", element: <Contact /> },
];

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      {LANGUAGES.map((language) =>
        pages.map((page) => (
          <Route
            key={language.code + page.path}
            path={page.path === "/" ? language.prefix || "/" : language.prefix + page.path}
            element={<LanguageProvider language={language}>{page.element}</LanguageProvider>}
          />
        ))
      )}
    </Routes>
  </BrowserRouter>
  );
};

export default App;
