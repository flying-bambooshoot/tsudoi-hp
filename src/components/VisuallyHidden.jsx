import { useI18n } from "../i18n";

// 画面には出さず、読み上げソフトにだけ伝える文字
const hidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

export const VisuallyHidden = ({ children }) => <span style={hidden}>{children}</span>;

// 新しいタブで開くリンク（target="_blank"）の中に置き、そのことを読み上げで伝える
export const NewTabNote = () => {
  const { t } = useI18n();
  return <VisuallyHidden>{t("common.newTab")}</VisuallyHidden>;
};
