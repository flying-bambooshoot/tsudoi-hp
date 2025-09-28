import React, { useEffect } from "react";
import App from "./App";

const AppWrapper = () => {
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      window.history.replaceState(null, null, redirectPath);
    }
    window.scrollTo(0,0);
  }, []);

  return <App />;
};

export default AppWrapper;