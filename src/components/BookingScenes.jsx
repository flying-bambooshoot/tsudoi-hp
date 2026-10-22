import { useI18n } from "../i18n";
import { school, narita2, orympic, ajisai } from "../resources/img/homeGallery";
import { responsive, GALLERY_SIZES } from "../responsiveImage";

// TOP の「演奏のご依頼」に置く、利用シーン別の紹介。
// 場面ごとに写真・場面名・一言・写真の説明を出す。写真は TOP のギャラリーと同じもの（読み込みはほぼ増えない）。
// 写真の説明は、ギャラリーと同じ訳（locales の photos）を使う
// パーティー・企業イベントは写真がまだないため「写真（準備中）」の枠を出している（オーナーに依頼中）。
// 写真が届いたら、src/resources/img/homeGallery に置いて img・file・caption（locales の photos のキー）を入れ、
// src/resources/img/responsive.json にも足す（縮小版が作られる）

const SCENES = [
  { key: "festival", img: narita2, file: "homeGallery/narita_stage.webp", caption: "naritaStage" },
  { key: "school", img: school, file: "homeGallery/school.webp", caption: "school" },
  { key: "concert", img: ajisai, file: "homeGallery/ajisai.webp", caption: "ajisai" },
  { key: "ceremony", img: orympic, file: "homeGallery/orympic.webp", caption: "tokyo2020" },
  { key: "party", img: null, caption: null },
];

const grid = {
    display: "grid",
    // PC は 5 枚が 1 列に、スマホ（幅 390px）は 2 列に並ぶ幅
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: "12px",
    margin: "24px 0 8px",
    padding: 0,
    listStyle: "none",
}

const card = {
    border: "solid #e0e0e0 1px",
    backgroundColor: "#ffffff",
}

const photo = {
    display: "block",
    width: "100%",
    // img の height 属性より優先して 4:3 にする
    height: "auto",
    aspectRatio: "4 / 3",
    objectFit: "cover",
}

const noPhoto = {
    ...photo,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(22,22,22)",
    color: "#bbbbbb",
    fontSize: "12px",
}

const body = {
    padding: "10px 12px 14px",
}

const name = {
    margin: "0 0 6px",
    fontSize: "15px",
}

const text = {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.7,
}

const caption = {
    margin: "8px 0 0",
    fontSize: "12px",
    color: "#555555",
    lineHeight: 1.6,
}

const BookingScenes = () => {
    const { t } = useI18n();
    return (
        <ul style={grid}>
            {SCENES.map(({ key, img, file, caption: photoKey }) => (
                <li key={key} style={card}>
                    {/* カードの写真は TOP のギャラリーと同じ写真なので、ギャラリーと同じ sizes にして同じ大きさの写真を選ばせる
                        （別の大きさを選ぶと、同じ写真を 2 回読み込むことになる） */}
                    {img ? (
                        <img src={img} {...responsive(file, img, GALLERY_SIZES)} alt="" style={photo} loading="lazy" decoding="async" />
                    ) : (
                        <div style={noPhoto} aria-hidden="true">{t("home.booking.scenes.noPhoto")}</div>
                    )}
                    <div style={body}>
                        <h3 style={name}>{t(`works.scenes.${key}`)}</h3>
                        <p style={text}>{t(`home.booking.scenes.${key}`)}</p>
                        {/* 写真に写っている出演（例: 写真：成田弦まつりでの演奏） */}
                        {photoKey && (
                            <p style={caption}>{t("home.booking.scenes.photoCaption", { caption: t(`photos.${photoKey}`) })}</p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BookingScenes;
