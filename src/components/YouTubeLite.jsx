import React, { useState } from "react";
import { trackEvent } from "../analytics";
import { useI18n } from "../i18n";

// TOP の YouTube 動画。最初はサムネイル画像と再生ボタンだけを出し、押したときに動画（iframe）を読み込む。
// 最初から iframe を 3 本置くと、YouTube の部品だけで約 2MB を読み込み、YouTube の Cookie も設定されていた（2026-10-22）。
// 動画は Cookie を減らす youtube-nocookie.com から読み込む

const frame = {
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundColor: "#000",
};

const button = {
  display: "block",
  width: "100%",
  height: "100%",
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
};

const thumbnail = {
  display: "block",
  width: "100%",
  height: "100%",
  // YouTube のサムネイル（4:3）の上下の黒い帯を切り落として 16:9 にする
  objectFit: "cover",
};

// YouTube の再生ボタンに似せた赤い角丸の三角
const playIcon = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "68px",
  height: "48px",
  transform: "translate(-50%, -50%)",
};

const YouTubeLite = ({ id, title }) => {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        // display: block にしないと、文字の行の高さの分だけ枠が縦に伸び、下の段がずれる
        style={{ display: "block", width: "100%", height: "100%", border: 0 }}
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div style={frame}>
      <button
        type="button"
        style={button}
        aria-label={t("home.videoPlay", { title })}
        onClick={() => {
          setPlaying(true);
          trackEvent("video_play", { location: "home", video_id: id });
        }}
      >
        <img style={thumbnail} src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" width="480" height="360" loading="lazy" decoding="async" />
        <svg style={playIcon} viewBox="0 0 68 48" aria-hidden="true">
          <path d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6C4 2.4 2.3 4.8 1.5 7.7.1 13 0 24 0 24s.1 11 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c2.9-.8 4.6-3.3 5.4-6.2C67.9 35 68 24 68 24s-.1-11-1.5-16.3z" fill="#f00" />
          <path d="M45 24 27 14v20" fill="#fff" />
        </svg>
      </button>
    </div>
  );
};

export default YouTubeLite;
