import React from "react";

// 訳文の中の改行（\n）を <br /> に変換して表示する
const Lines = ({ text }) =>
  text.split("\n").map((line, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </React.Fragment>
  ));

export default Lines;
