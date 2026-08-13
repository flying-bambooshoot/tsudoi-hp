import React, { useEffect } from "react";
import App from "./App";

const AppWrapper = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <App />;
};

export default AppWrapper;
