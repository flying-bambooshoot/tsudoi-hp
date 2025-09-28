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
      <Route path='/' element={<Home />} />
      <Route path='/news' element={<News />} />
      <Route path='/introduction' element={<Intro />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;