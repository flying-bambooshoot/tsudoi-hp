import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// 画面遷移時に画面上部にスクロールするためのメソッド
const ScrollToTop = () => {
    const { pathname } = useLocation()
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname])
  
    return null
}

export default ScrollToTop;