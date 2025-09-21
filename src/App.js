import { BrowserRouter, Routes, Route } from "react-router-dom";
// ページ追加手順
import Home from "./pages/home.jsx";
import News from "./pages/news.jsx";
import Intro from "./pages/introduction.jsx";
import Gallery from "./pages/gallery.jsx";
import Contact from "./pages/contact.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path='tsudoi-hp/' element={<Home />} />
      <Route path='tsudoi-hp/news' element={<News />} />
      <Route path='tsudoi-hp/introduction' element={<Intro />} />
      <Route path='tsudoi-hp/gallery' element={<Gallery />} />
      <Route path='tsudoi-hp/contact' element={<Contact />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;